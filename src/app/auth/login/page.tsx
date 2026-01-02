"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Phone, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
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

        {message && (
          <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 text-sm font-medium text-amber-700 border border-amber-100 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {message}
          </div>
        )}

        <form onSubmit={handleSendOTP} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-semibold mb-1">Mobile Number</label>
            <div className="mt-1 flex rounded-xl border border-slate-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-all">
              <span className="inline-flex items-center bg-slate-50 px-3 text-slate-500 text-sm font-bold border-r border-slate-200">
                🇧🇩 +880
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full flex-1 border-0 p-3 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm font-medium"
                placeholder="1XXXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              type="submit" 
              className="w-full rounded-xl py-3.5 text-lg font-bold shadow-lg shadow-primary-500/20 active:scale-[0.98] transition-all" 
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Get OTP'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-center">
              <span className="text-sm text-slate-500">Don't have an account? </span>
              <Link href="/auth/signup" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                Sign Up Now
              </Link>
            </div>
          </div>
        </form>

        <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
          By continuing, you agree to our <Link href="/terms" className="font-semibold text-slate-500 hover:text-slate-900 underline decoration-slate-200 underline-offset-4">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
