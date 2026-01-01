"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Camera, User } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'Male',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/auth/login');
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('Failed to update profile');
      }
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
          <h1 className="text-3xl font-bold text-slate-900">Complete Profile</h1>
          <p className="mt-2 text-slate-500">Tell us a bit about yourself</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-slate-100 ring-4 ring-white shadow-lg">
              <div className="flex h-full w-full items-center justify-center text-slate-300">
                <User className="h-12 w-12" />
              </div>
              <button 
                type="button"
                className="absolute bottom-0 w-full bg-black/40 py-1 text-[10px] text-white backdrop-blur-sm"
              >
                <Camera className="mx-auto h-3 w-3" />
              </button>
            </div>
          </div>

          <Input
            label="Full Name"
            placeholder="e.g. Asif Rabetul"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address (Optional)"
            type="email"
            placeholder="asif@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <div>
             <label className="mb-1.5 block text-sm font-medium text-slate-700">Gender</label>
             <div className="flex gap-4">
               {['Male', 'Female'].map((g) => (
                 <label key={g} className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 hover:bg-slate-50">
                   <input
                     type="radio"
                     name="gender"
                     value={g}
                     checked={formData.gender === g}
                     onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                     className="text-primary-600 focus:ring-primary-500"
                   />
                   <span className="text-sm font-medium text-slate-700">{g}</span>
                 </label>
               ))}
             </div>
          </div>

          <Button type="submit" className="w-full rounded-xl py-3" disabled={loading}>
            {loading ? 'Saving...' : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </div>
  );
}
