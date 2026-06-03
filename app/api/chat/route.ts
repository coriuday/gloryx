import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Proxy request to the Rust API backend gateway running on port 8080
    const rustUrl = 'http://127.0.0.1:8080/api/chat';

    const response = await fetch(rustUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Rust Backend API error: ${errText}`);
      return NextResponse.json({
        text: 'VAULT SECURED. SYSTEM ENCOUNTERED AN ERROR COMMUNICATING WITH CORE ROUTER.'
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat Proxy API Error:', error);
    return NextResponse.json({
      text: 'ERROR: LINK TEMPORARILY INTERRUPTED. SYSTEM RUNNING IN SAFE MODE.'
    });
  }
}
