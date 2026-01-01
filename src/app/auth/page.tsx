"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AuthPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (phone.length < 11) {
      setError('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1500);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <Smartphone className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome to SubLet
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {step === 'phone' 
              ? 'Enter your mobile number to get started' 
              : `We sent a code to ${phone}`
            }
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handlePhoneSubmit}
              className="space-y-6"
            >
              <Input
                label="Mobile Number"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={error}
                type="tel"
                required
              />
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                isLoading={isLoading}
              >
                Send Code <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleOtpSubmit}
              className="space-y-6"
            >
              <Input
                label="Verification Code"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={error}
                type="text"
                maxLength={6}
                required
                className="text-center text-2xl tracking-widest"
              />
              <div className="space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  isLoading={isLoading}
                >
                  Verify & Login <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  Change Number
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
