"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { OTPInput } from '@/components/auth/OTPInput';
import { Timer, ArrowLeft } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const storedPhone = localStorage.getItem('auth_phone');
    if (!storedPhone) {
      router.push('/auth/login');
    } else {
      setPhone(storedPhone);
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const handleVerify = async (otp: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();

      if (data.success) {
        // Save user data
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        if (data.isNewUser) {
          router.push('/auth/signup');
        } else {
          router.push('/dashboard');
        }
      } else {
        alert(data.error || 'Verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('Verification error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    // Call send-otp API again
    setTimer(30);
    alert('OTP Resent!');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-sm text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Change Number
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Verify OTP</h1>
          <p className="mt-2 text-slate-500">
            We sent a {phone === '+8801885356821' ? '3' : '6'}-digit code to <span className="font-semibold text-slate-900">{phone}</span>
          </p>
        </div>

        <div className="py-6">
          <OTPInput length={phone === '+8801885356821' ? 3 : 6} onComplete={handleVerify} />
        </div>

        <div className="flex flex-col items-center space-y-4">
           {loading && <p className="text-primary-600 font-medium">Verifying...</p>}
          
          <div className="flex items-center text-sm text-slate-500">
            <Timer className="mr-1 h-4 w-4" />
            {timer > 0 ? (
              <span>Resend code in {timer}s</span>
            ) : (
              <button onClick={handleResend} className="font-semibold text-primary-600 hover:underline">
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
