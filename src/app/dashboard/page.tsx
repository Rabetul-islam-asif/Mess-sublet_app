"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlusCircle, Settings, LogOut, Edit2, Trash2, MapPin, Heart, Eye, EyeOff, Upload, BadgeCheck, FileText, Camera } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MOCK_LISTINGS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'saved' | 'profile'>('listings');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth/login?message=Please log in to access your dashboard');
    }
  }, [router]);

  // Temporary mock user data
  const user = {
    name: "John Doe",
    phone: "+880 1712 345678",
    type: "Post Giver", // or "Rent Seeker"
    avatar: null
  };

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    image: user.avatar,
    idCard: null as string | null
  });

  const handleSaveProfile = () => {
    // Mock save logic
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleIdUpload = () => {
    // Mock ID upload
    setProfileData(prev => ({...prev, idCard: "id_uploaded.jpg"}));
    alert("ID Card uploaded successfully!");
  };

  // State for user's listings to allow toggle
  const [myListings, setMyListings] = useState(MOCK_LISTINGS.slice(0, 2));
  
  const toggleActive = (id: number) => {
    setMyListings(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ));
  };
  
  // Mock saved listings
  const savedListings = MOCK_LISTINGS.slice(2, 4);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('auth_phone');
    window.location.href = '/';
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {myListings.map((item) => (
          <div key={item.id} className={cn(
             "overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm transition-all",
             !item.isActive && "opacity-60 grayscale-[0.5]"
          )}>
             <div className="relative h-40 w-full bg-slate-100">
                <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                <div className={cn(
                  "absolute right-2 top-2 rounded-lg px-2 py-1 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider",
                  item.isActive ? "bg-green-500" : "bg-slate-500"
                )}>
                  {item.isActive ? 'Active' : 'Deactivated'}
                </div>
             </div>
             <div className="p-4">
                <h3 className="font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.location}</p>
                <div className="mt-4 flex gap-2">
                   <Button 
                     onClick={() => toggleActive(item.id)}
                     variant={item.isActive ? "outline" : "primary"} 
                     size="sm" 
                     className={cn(
                       "flex-1 h-9 rounded-lg font-bold",
                       item.isActive ? "text-slate-600" : "bg-primary-600 text-white"
                     )}
                   >
                     {item.isActive ? (
                       <><EyeOff className="mr-2 h-4 w-4" /> Deactivate</>
                     ) : (
                       <><Eye className="mr-2 h-4 w-4" /> Activate</>
                     )}
                   </Button>
                   <Link href={`/post/${item.id}/edit`}>
                     <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg border border-slate-200">
                        <Edit2 className="h-4 w-4 text-slate-600" />
                     </Button>
                   </Link>
                   <Button variant="danger" size="sm" className="h-9 w-9 p-0 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
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
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
    <div className="max-w-xl space-y-8">
        <div className="flex items-center justify-between">
           <h2 className="text-xl font-bold text-slate-900">Account Settings</h2>
           {!isEditing && (
             <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
               <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
             </Button>
           )}
        </div>
        
        {/* Profile Card */}
        <div className="flex items-center gap-6 rounded-2xl bg-slate-50 p-6 border border-slate-100">
            <div className="relative group">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-primary-600 shadow-sm border-4 border-white overflow-hidden">
                    {profileData.image ? (
                         <Image src={profileData.image} alt="Profile" fill className="object-cover" unoptimized />
                    ) : (
                         profileData.name.charAt(0)
                    )}
                </div>
                {isEditing && (
                    <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                    </button>
                )}
            </div>
            <div className="flex-1">
                {isEditing ? (
                    <div className="space-y-3">
                        <Input 
                            value={profileData.name} 
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="text-lg font-bold bg-white"
                        />
                        <div className="flex gap-2">
                             <Button size="sm" onClick={handleSaveProfile}>Save Changes</Button>
                             <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-xl font-bold text-slate-900">{profileData.name}</h3>
                        <p className="text-slate-500">{user.phone}</p>
                        <span className="mt-2 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-700">
                            {user.type}
                        </span>
                    </>
                )}
            </div>
        </div>

        {/* Verification Section */}
        <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <BadgeCheck className="h-5 w-5 text-green-500" />
                Identity Verification
            </h3>
            <p className="mt-1 text-sm text-slate-500">
                Upload your National ID or Passport to get the Verified Badge
            </p>

            <div className="mt-4">
                {profileData.idCard ? (
                    <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4 border border-green-100">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-semibold text-green-900">ID Document Uploaded</p>
                            <p className="text-xs text-green-600">Status: Under Review</p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-colors hover:border-primary-300 hover:bg-primary-50 group cursor-pointer" onClick={isEditing ? handleIdUpload : undefined}>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                            <Upload className="h-6 w-6 text-slate-400 group-hover:text-primary-600" />
                        </div>
                        <p className="mt-3 font-semibold text-slate-700">Tap to upload ID Card</p>
                        <p className="text-xs text-slate-500">Supports JPG, PNG (Max 5MB)</p>
                        {!isEditing && <p className="mt-2 text-xs text-red-400">* Enable Edit Mode to upload</p>}
                    </div>
                )}
            </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Danger Zone</h3>
            
            <Button variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:border-red-200 hover:text-red-700 h-12" onClick={handleLogout}>
                <LogOut className="mr-3 h-5 w-5" /> Log Out
            </Button>
            
             <Button variant="ghost" className="w-full justify-start text-slate-400 hover:bg-slate-50 hover:text-red-600 h-10 text-sm">
                <Trash2 className="mr-3 h-4 w-4" /> Delete Account Permanently
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
