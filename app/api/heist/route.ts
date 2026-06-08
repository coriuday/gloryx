import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Forward to Rust API Gateway on port 8081
    const rustUrl = 'http://127.0.0.1:8081/api/heist';

    const response = await fetch(rustUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Rust API Gateway error:', errorText);
      return NextResponse.json(
        { error: 'Rust Gateway Error', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Heist Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error proxying heist brief' },
      { status: 500 }
    );
  }
}
