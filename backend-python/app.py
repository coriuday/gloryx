import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import requests
from dotenv import load_dotenv

# Load env variables from root .env.local
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(root_dir, '.env.local')
if os.path.exists(env_path):
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

app = FastAPI(title="BinaryScouts AI Python Microservice")

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = None

class HeistRequest(BaseModel):
    codeName: str
    corporation: Optional[str] = ""
    email: str
    channel: Optional[str] = ""
    brief: Optional[str] = ""
    targets: List[str]
    budget: int
    timeline: str

SYSTEM_INSTRUCTION = (
    "You are B.I.N.A.R.Y. AI, a hyper-competent, elite hacker AI operating the terminal interface "
    "for BinaryScouts Digital Agency. Your tone is technical, edgy, cyber-styled, confident, and professional. "
    "You help potential clients realize how they can 'rewrite the code of the market' and 'dominate the matrix'. "
    "Do NOT talk like a generic friendly assistant; speak like a system operator who cuts through the noise. "
    "Keep responses concise (under 120 words) and formatted for a monospace CRT screen (using uppercase headers, lists, code snippets). "
    "Mention agency services: Digital Marketing, Business CRM Automation, SEO Conquest, Video and Motion. "
    "If the user asks about starting a project, instruct them to type 'heist' or use the Heist Planner."
)

def get_gemini_key():
    key = os.getenv("GEMINI_API_KEY")
    if not key or key == "PLACEHOLDER_API_KEY" or "PLACEHOLDER" in key:
        return None
    return key

@app.get("/health")
def health():
    return {"status": "healthy", "key_configured": get_gemini_key() is not None}

@app.post("/ai/chat")
def ai_chat(req: ChatRequest):
    api_key = get_gemini_key()
    if not api_key:
        return {"text": get_offline_chat_response(req.message)}
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    # Format contents for Gemini API
    contents = []
    if req.history:
        for msg in req.history:
            contents.append({
                "role": "user" if msg.role == "user" else "model",
                "parts": [{"text": msg.text}]
            })
            
    contents.append({
        "role": "user",
        "parts": [{"text": req.message}]
    })

    payload = {
        "contents": contents,
        "systemInstruction": {
            "parts": [{"text": SYSTEM_INSTRUCTION}]
        },
        "generationConfig": {
            "maxOutputTokens": 250,
            "temperature": 0.7
        }
    }

    try:
        r = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=10)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail=f"Gemini API returned code {r.status_code}")
        
        data = r.json()
        text = data['candidates'][0]['content']['parts'][0]['text']
        return {"text": text}
    except Exception as e:
        print(f"[WARN] Gemini failure: {e}, falling back to offline dialogue.")
        return {"text": get_offline_chat_response(req.message)}

@app.post("/ai/analyze-brief")
def ai_analyze_brief(req: HeistRequest):
    api_key = get_gemini_key()
    
    targets_str = ", ".join(req.targets)
    prompt = (
        f"You are B.I.N.A.R.Y. AI, the elite strategist for BinaryScouts Digital Agency. "
        f"Write an aggressive, tactical, high-octane operations brief for a heist of the following targets: {targets_str}.\n"
        f"Details:\n"
        f"- Client Code Name: {req.codeName}\n"
        f"- Client Corporation: {req.corporation}\n"
        f"- Budget Pool: ${req.budget:,}\n"
        f"- Timeline Constraints: {req.timeline}\n"
        f"- Special Operator Intel: '{req.brief}'\n\n"
        f"Provide a structured report containing exactly these sections:\n"
        f"1. TARGET OVERVIEW (analyze client's corporation and selected targets)\n"
        f"2. MISSION TIMELINE (break down step-by-step milestones to execute this within {req.timeline})\n"
        f"3. CREW EQUIPMENT (recommend tools, automation scripts, SEO indexers, or video configurations to run)\n"
        f"4. EXPECTED LOOT (describe expected outcomes, ROI, and pipeline efficiency metrics)\n\n"
        f"Write in a professional, direct, military/cyber cyberpunk style (uppercase headers, monospace listings, bullet lists)."
    )

    if not api_key:
        return {"blueprint": get_offline_blueprint(req)}

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "maxOutputTokens": 800,
            "temperature": 0.5
        }
    }

    try:
        r = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=15)
        if r.status_code != 200:
            return {"blueprint": get_offline_blueprint(req)}
        
        data = r.json()
        blueprint = data['candidates'][0]['content']['parts'][0]['text']
        return {"blueprint": blueprint}
    except Exception as e:
        print(f"[WARN] Gemini failure during brief: {e}")
        return {"blueprint": get_offline_blueprint(req)}

def get_offline_chat_response(message: str) -> str:
    msg = message.lower()
    if "help" in msg or "command" in msg:
        return (
            "BINARYSCOUTS OFFLINE OPERATIONAL MODULE:\n"
            "[SERVICES] - List our digital weapons\n"
            "[HEIST]    - Open cost planner\n"
            "[ABOUT]    - View agency manifesto\n"
            "[CONTACT]  - Establish comm channel\n"
            "[CLEAR]    - Wipe console screen"
        )
    return "ENCRYPTED SIGNAL SECURED. LOCAL LINK ESTABLISHED. For offline operations, type 'help' or describe your target."

def get_offline_blueprint(req: HeistRequest) -> str:
    targets_str = ", ".join(req.targets).upper()
    return f"""CLASSIFIED STRATEGY BLUEPRINT (OFFLINE BACKUP MODEL ACTIVE)

1. TARGET OVERVIEW
Client corporation '{req.corporation or "UNKNOWN"}' is requesting a deployment of digital weapons: {targets_str}.
Operational scope fits the budget threshold of ${req.budget:,} and is cleared for tactical implementation.

2. MISSION TIMELINE
- PHASE I (INTELLIGENCE AUDIT): Deep scan of targets and deployment setup (Days 1-7).
- PHASE II (DRAFT CODE): Script CRM webhooks and construct marketing campaigns (Days 8-20).
- PHASE III (DEPLOY SHARDS): Launch landing sites, PPC bid automation, and SEO indexers (Days 21-45).
- PHASE IV (SECURE LOOT): Calibrate final client conversion paths (Remaining period of {req.timeline}).

3. CREW EQUIPMENT
- Automation: Node.js API bridges and WhatsApp notifications webhooks.
- SEO: Schema microcode templates and indexing cron listeners.
- Marketing: Multi-channel PPC custom scripts and audience trackers.

4. EXPECTED LOOT
- Estimated Lead Processing Time: Reduced from hours to under 120 seconds.
- Traffic scaling threshold: Target minimum +300% organic lift.
- Ad budget optimization target: Secure -30% average cost-per-lead reduction.
"""
