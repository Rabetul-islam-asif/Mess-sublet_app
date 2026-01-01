"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic validation for BD number
      const formattedPhone = phone.startsWith('0') ? `+88${phone}` : phone.startsWith('+88') ? phone : `+880${phone}`;
      
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (res.ok) {
        // Save phone to local storage to pass to verify page
        localStorage.setItem('auth_phone', formattedPhone);
        router.push('/auth/verify');
      } else {
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-slate-500">Enter your mobile number to continue</p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Mobile Number</label>
            <div className="mt-1 flex rounded-xl border border-slate-300 shadow-sm">
              <span className="inline-flex items-center rounded-l-xl border-r border-slate-300 bg-slate-50 px-3 text-slate-500 sm:text-sm">
                🇧🇩 +880
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full flex-1 rounded-none rounded-r-xl border-0 p-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                placeholder="1XXXXXXXXX"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full rounded-xl py-3 text-lg" 
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Get OTP'} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <div className="text-center text-sm text-slate-500">
          By continuing, you agree to our <Link href="/terms" className="font-semibold text-primary-600 hover:text-primary-500">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
