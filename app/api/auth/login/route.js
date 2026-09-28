import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Example authentication response
    return NextResponse.json({
      success: true,
      user: {
        id: 'usr_123',
        name: 'Alex Johnson',
        email: email
      },
      token: 'jwt_mock_token_simplytek_2026'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
