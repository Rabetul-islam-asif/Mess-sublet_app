import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // In a real app, update user in database
    console.log('Profile update:', data);

    return NextResponse.json({ 
      success: true, 
      user: { ...data, id: 'user_123', isVerified: true } 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
