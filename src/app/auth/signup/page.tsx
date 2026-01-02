"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Lock, User, Phone, CheckCircle, Timer } from 'lucide-react';
import { OTPInput } from '@/components/auth/OTPInput';
import Link from 'next/link';

type SignupStep = 'details' | 'phone' | 'verify';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>('details');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    phone: '',
    otp: ''
  });

  // Timer logic for OTP
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verify' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.password) return;
    setStep('phone');
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Basic formatting for BD number
      const formattedPhone = formData.phone.startsWith('0') 
        ? `+88${formData.phone}` 
        : formData.phone.startsWith('+88') 
          ? formData.phone 
          : `+880${formData.phone}`;
      
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formattedPhone }),
      });

      if (res.ok) {
        setFormData(prev => ({ ...prev, phone: formattedPhone }));
        setStep('verify');
        setTimer(30);
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (otpValue: string) => {
    setLoading(true);
    try {
      // 1. Verify OTP
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone, otp: otpValue }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        // Save token
        localStorage.setItem('token', verifyData.token);
        localStorage.setItem('user', JSON.stringify(verifyData.user));

        // 2. Complete Profile (Save Name/Password)
        // Note: verifyData.token should be used for authorization
        await fetch('/api/auth/complete-profile', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            // If backend needs token in header for this endpoint (likely)
            // 'Authorization': `Bearer ${verifyData.token}`  <-- usually browser handles cookies or we might need this
          },
          body: JSON.stringify({
             name: formData.name,
             // Assuming backend might take password, or we just store name for now.
             // Given user request, we send password.
             password: formData.password
          }),
        });
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        alert(verifyData.error || 'Verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('Verification error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone }),
      });
      setTimer(30);
      alert('OTP Resent!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            {step === 'details' ? 'Create Account' : step === 'phone' ? 'Authentication' : 'Verify Number'}
          </h1>
          <p className="mt-2 text-slate-500">
            {step === 'details' ? 'Enter your details to get started' 
             : step === 'phone' ? 'We need to verify your phone number' 
             : `Enter code sent to ${formData.phone}`}
          </p>
        </div>

        {/* Step 1: Name & Password */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-6">
            <Input
              label="Full Name"
              placeholder="e.g. Asif Rabetul"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              icon={<User className="text-slate-400" />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              icon={<Lock className="text-slate-400" />}
              required
            />
            
            <Button type="submit" className="w-full rounded-xl py-3 text-lg">
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-center text-sm text-slate-500">
               Already have an account? <Link href="/auth/login" className="font-semibold text-primary-600 hover:text-primary-500">Log In</Link>
            </div>
          </form>
        )}

        {/* Step 2: Phone Auth */}
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
             <div>
              <label className="block text-sm font-medium text-slate-700">Mobile Number</label>
              <div className="mt-1 flex rounded-xl border border-slate-300 shadow-sm">
                <span className="inline-flex items-center rounded-l-xl border-r border-slate-300 bg-slate-50 px-3 text-slate-500 sm:text-sm">
                  🇧🇩 +880
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full flex-1 rounded-none rounded-r-xl border-0 p-3 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                  placeholder="1XXXXXXXXX"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl py-3 text-lg" disabled={loading}>
              {loading ? 'Sending...' : 'Get OTP'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <button 
              type="button" 
              onClick={() => setStep('details')}
              className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Back
            </button>
          </form>
        )}

        {/* Step 3: Verify OTP */}
        {step === 'verify' && (
          <div className="space-y-6">
             <div className="py-2">
               <OTPInput length={6} onComplete={handleVerify} />
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

                <button 
                  type="button" 
                  onClick={() => setStep('phone')}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  Change Number
                </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
