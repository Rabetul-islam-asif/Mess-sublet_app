import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    // Mock verification
    if (otp !== '123456') {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // Mock User Database Check
    // In a real app, query database here
    const isNewUser = phone === '+8801234567890'; // Mock logic: specific number is "new"

    const mockUser = {
      id: 'user_123',
      name: isNewUser ? null : 'Asif Rabetul',
      phone: phone,
      isVerified: true
    };

    return NextResponse.json({ 
      success: true, 
      token: 'mock_jwt_token',
      user: mockUser,
      isNewUser: isNewUser || !mockUser.name // If no name, consider incomplete profile
    });

  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
