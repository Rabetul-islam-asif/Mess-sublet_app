"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, Settings, LogOut, Edit2, Trash2, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_LISTINGS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'saved' | 'profile'>('listings');
  const router = useRouter();

  // Temporary mock user data
  const user = {
    name: "John Doe",
    phone: "+880 1712 345678",
    type: "Post Giver", // or "Rent Seeker"
    avatar: null
  };

  // Filter listings for "My Listings" (mocked by picking first 2)
  const myListings = MOCK_LISTINGS.slice(0, 2);
  
  // Mock saved listings
  const savedListings = MOCK_LISTINGS.slice(2, 4);

  const handleLogout = () => {
    // Implement logout logic here
    router.push('/auth');
  };

  const renderListingsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">My Active Posts</h2>
        <Link href="/post">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myListings.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm">
             <div className="relative h-40 w-full bg-slate-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                <div className="absolute right-2 top-2 rounded-lg bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-sm">
                  Active
                </div>
             </div>
             <div className="p-4">
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.location}</p>
                <div className="mt-4 flex gap-2">
                   <Link href={`/post/${item.id}/edit`} className="flex-1">
                     <Button variant="outline" size="sm" className="w-full">
                        <Edit2 className="mr-2 h-3 w-3" /> Edit
                     </Button>
                   </Link>
                   <Button variant="danger" size="sm" className="bg-red-50 text-red-600 hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSavedTab = () => (
    <div className="space-y-6">
       <h2 className="text-xl font-bold text-slate-900">Saved Places</h2>
       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {savedListings.map((item) => (
           <Link key={item.id} href={`/post/${item.id}`}>
             <div className="overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-40 w-full bg-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    <button className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-red-500 shadow-sm transition-transform hover:scale-110">
                        <Heart className="h-4 w-4 fill-current" />
                    </button>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-slate-500">
                        <MapPin className="mr-1 h-3 w-3" />
                         {item.location}
                    </div>
                     <div className="mt-2 text-primary-600 font-bold">
                        ৳{item.rent}
                     </div>
                </div>
             </div>
           </Link>
        ))}
        {savedListings.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500">
                You haven't saved any listings yet.
            </div>
        )}
       </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="max-w-xl space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
        
        <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-600">
                {user.name.charAt(0)}
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
                <p className="text-slate-500">{user.phone}</p>
                <span className="mt-1 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                    {user.type}
                </span>
            </div>
        </div>

        <div className="space-y-4 pt-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 bg-slate-50">
                    {user.name}
                </div>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                 <div className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 bg-slate-50">
                    {user.phone}
                </div>
            </div>
        </div>

        <div className="pt-6">
            <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:border-red-200" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">Dashboard</h1>
      
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
         {/* Sidebar Navigation */}
         <nav className="flex flex-col gap-1 lg:h-[calc(100vh-200px)]">
            <button 
                onClick={() => setActiveTab('listings')}
                className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === 'listings' 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-slate-600 hover:bg-slate-100"
                )}
            >
                <Edit2 className="mr-3 h-4 w-4" /> My Listings
            </button>
            <button 
                onClick={() => setActiveTab('saved')}
                className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === 'saved' 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-slate-600 hover:bg-slate-100"
                )}
            >
                <Heart className="mr-3 h-4 w-4" /> Saved Posts
            </button>
             <button 
                onClick={() => setActiveTab('profile')}
                className={cn(
                    "flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === 'profile' 
                        ? "bg-primary-50 text-primary-700" 
                        : "text-slate-600 hover:bg-slate-100"
                )}
            >
                <Settings className="mr-3 h-4 w-4" /> Profile
            </button>
            
            <div className="mt-auto hidden lg:block">
                 <button onClick={handleLogout} className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                    <LogOut className="mr-3 h-4 w-4" /> Log Out
                </button>
            </div>
         </nav>

         {/* Main Content Area */}
         <div className="min-h-[500px] rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
            {activeTab === 'listings' && renderListingsTab()}
            {activeTab === 'saved' && renderSavedTab()}
            {activeTab === 'profile' && renderProfileTab()}
         </div>
      </div>
    </div>
  );
}
