use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use tower_http::cors::CorsLayer;
use reqwest::Client;

#[derive(Serialize, Deserialize, Debug)]
struct StatusResponse {
    status: String,
    system: String,
    version: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct ChatMessage {
    role: String,
    text: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct ChatRequest {
    message: String,
    history: Option<Vec<ChatMessage>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ChatResponse {
    text: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct HeistRequest {
    #[serde(rename = "codeName")]
    code_name: String,
    corporation: String,
    email: String,
    channel: String,
    brief: String,
    targets: Vec<String>,
    budget: u32,
    timeline: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct HeistResponse {
    #[serde(rename = "heistCode")]
    heist_code: String,
    status: String,
    blueprint: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct PythonBlueprintResponse {
    blueprint: String,
}

async fn get_status() -> Json<StatusResponse> {
    Json(StatusResponse {
        status: "ONLINE".to_string(),
        system: "GLORYX CORE API".to_string(),
        version: "2.5.0".to_string(),
    })
}

async fn handle_chat(Json(payload): Json<ChatRequest>) -> Result<Json<ChatResponse>, (axum::http::StatusCode, String)> {
    let client = Client::new();
    
    // Call Python FastAPI AI Service running on port 5000
    let python_url = "http://127.0.0.1:5000/ai/chat";
    
    match client.post(python_url).json(&payload).send().await {
        Ok(resp) => {
            if resp.status().is_success() {
                match resp.json::<ChatResponse>().await {
                    Ok(chat_resp) => Ok(Json(chat_resp)),
                    Err(e) => Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed parsing Python AI reply: {}", e))),
                }
            } else {
                let err_text = resp.text().await.unwrap_or_default();
                Err((axum::http::StatusCode::BAD_GATEWAY, format!("Python AI service error: {}", err_text)))
            }
        }
        Err(e) => Err((axum::http::StatusCode::SERVICE_UNAVAILABLE, format!("Python AI service offline: {}", e))),
    }
}

async fn handle_heist(Json(payload): Json<HeistRequest>) -> Result<Json<HeistResponse>, (axum::http::StatusCode, String)> {
    // 1. Generate unique heist code
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_secs() % 10000)
        .unwrap_or(1234);
    let random_chars: String = (0..3)
        .map(|_| {
            let n = rand::random::<u8>() % 26;
            (b'A' + n) as char
        })
        .collect();
    let heist_code = format!("HEIST-{}{:04}", random_chars, timestamp);

    // 2. Save dossier into secure local vault folder
    let vault_dir = Path::new("vault");
    if !vault_dir.exists() {
        if let Err(e) = fs::create_dir_all(vault_dir) {
            return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed creating vault folder: {}", e)));
        }
    }
    
    let file_path = vault_dir.join(format!("{}.json", heist_code));
    let json_data = serde_json::to_string_pretty(&payload)
        .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed serializing payload: {}", e)))?;
        
    if let Err(e) = fs::write(&file_path, json_data) {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed writing to vault: {}", e)));
    }
    println!("[SYSTEM] Heist details committed to vault: {:?}", file_path);

    // 3. Call Python FastAPI AI Service to analyze targets and compile a strategy blueprint
    let client = Client::new();
    let python_url = "http://127.0.0.1:5000/ai/analyze-brief";

    let blueprint = match client.post(python_url).json(&payload).send().await {
        Ok(resp) => {
            if resp.status().is_success() {
                match resp.json::<PythonBlueprintResponse>().await {
                    Ok(py_resp) => py_resp.blueprint,
                    Err(_) => "VAULT INTEGRITY SECURED. AI STRATEGY COMPILER RETURNED FAULTY FORMAT.".to_string(),
                }
            } else {
                "VAULT INTEGRITY SECURED. AI STRATEGY PIPELINE INTRUSION ERROR.".to_string()
            }
        }
        Err(_) => "VAULT INTEGRITY SECURED. AI STRATEGY COMPILER COOLDOWN (OFFLINE).".to_string(),
    };

    Ok(Json(HeistResponse {
        heist_code,
        status: "DISPATCHED".to_string(),
        blueprint,
    }))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/api/status", get(get_status))
        .route("/api/chat", post(handle_chat))
        .route("/api/heist", post(handle_heist))
        .layer(CorsLayer::permissive());

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080").await.unwrap();
    println!("[SYSTEM] GloryX Rust Backend booting online at http://127.0.0.1:8080");
    axum::serve(listener, app).await.unwrap();
}
