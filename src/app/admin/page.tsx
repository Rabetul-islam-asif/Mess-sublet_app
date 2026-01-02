"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, LayoutDashboard, FileText, Users, 
  Trash2, PauseCircle, PlayCircle, Eye, 
  CheckCircle2, XCircle, Search, Filter,
  ArrowRight, ShieldAlert, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_LISTINGS, Listing } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Mock Verification Requests
const MOCK_VERIFICATIONS = [
  { id: 1, name: "Tanvir Ahmed", phone: "01711223344", idImage: "https://i.ibb.co/5GzXhqB/room1.jpg", date: "2025-01-02", status: "pending" },
  { id: 2, name: "Sabbir Hossain", phone: "01888776655", idImage: "https://i.ibb.co/5GzXhqB/room1.jpg", date: "2025-01-01", status: "pending" },
];

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'moderation' | 'verifications' | 'users' | 'stats'>('moderation');
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [verifications, setVerifications] = useState(MOCK_VERIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'active' | 'paused' | 'restricted'>('all');

  // Mock Users Data
  const [users, setUsers] = useState([
    { id: 'u1', name: 'Rabetul Islam', phone: '01885356821', role: 'admin', status: 'active', isFlagged: false },
    { id: 'u2', name: 'John Doe', phone: '01712345678', role: 'user', status: 'active', isFlagged: true },
    { id: 'u3', name: 'Jane Smith', phone: '01900112233', role: 'user', status: 'active', isFlagged: false },
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || user.role !== 'admin') {
      alert("Access Denied: Admin only.");
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const toggleListingStatus = (id: number) => {
    setListings(prev => prev.map(l => 
      l.id === id ? { ...l, isActive: !l.isActive } : l
    ));
  };

  const markAsRestricted = (id: number) => {
    setListings(prev => prev.map(l => 
      l.id === id ? { ...l, isUnderReview: true, isActive: false } : l
    ));
    alert("Post marked as Restricted.");
  };

  const deleteListing = (id: number) => {
    if (confirm("Are you sure you want to delete this listing permanently?")) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleApprove = (id: number) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
    alert("User verified successfully!");
  };

  const pauseVerification = (id: number) => {
    setVerifications(prev => prev.map(v => v.id === id ? { ...v, status: 'paused' } : v));
    alert("Verification request paused.");
  };

  const toggleUserFlag = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isFlagged: !u.isFlagged } : u));
  };

  const filteredListings = listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.toString().includes(searchQuery);
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'active' && l.isActive !== false) ||
                         (filterType === 'paused' && l.isActive === false && !(l as any).isUnderReview) ||
                         (filterType === 'restricted' && (l as any).isUnderReview);
    return matchesSearch && matchesFilter;
  });

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Admin Header */}
      <div className="bg-slate-900 text-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary-400 font-bold mb-1">
                <ShieldCheck className="h-5 w-5" />
                ADMIN CONTROL CENTER
              </div>
              <h1 className="text-3xl font-bold">Manage SubLet Dhaka</h1>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-xl bg-white/10 backdrop-blur-md px-6 py-3 border border-white/10">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Total Listings</p>
                <p className="text-2xl font-bold">{listings.length}</p>
              </div>
              <div className="rounded-xl bg-white/10 backdrop-blur-md px-6 py-3 border border-white/10 text-amber-400">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Restricted</p>
                <p className="text-2xl font-bold">{listings.filter(l => (l as any).isUnderReview).length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="space-y-2">
            <nav className="rounded-2xl bg-white p-2 shadow-sm border border-slate-200 sticky top-24">
              <button 
                onClick={() => setActiveTab('moderation')}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                  activeTab === 'moderation' ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Moderation
              </button>
              <button 
                onClick={() => setActiveTab('verifications')}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all mt-1",
                  activeTab === 'verifications' ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <FileText className="h-4 w-4" />
                Verifications
                {verifications.filter(v => v.status === 'pending').length > 0 && <span className="ml-auto h-5 w-5 rounded-full bg-red-500 text-[10px] flex items-center justify-center text-white">{verifications.filter(v => v.status === 'pending').length}</span>}
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all mt-1",
                  activeTab === 'users' ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Users className="h-4 w-4" />
                Account Control
              </button>
              <button 
                onClick={() => setActiveTab('stats')}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all mt-1",
                  activeTab === 'stats' ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <Eye className="h-4 w-4" />
                Insights
              </button>
            </nav>
          </div>

          {/* Main Area */}
          <div className="space-y-6">
            {activeTab === 'moderation' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                   <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                     Listing Moderation
                   </h2>
                   <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Search Title or ID..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full sm:w-64 rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white" 
                        />
                      </div>
                      <select 
                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all bg-slate-50/50 hover:bg-white cursor-pointer appearance-none min-w-[140px]"
                        value={filterType}
                        onChange={(e: any) => setFilterType(e.target.value)}
                      >
                        <option value="all">All Content</option>
                        <option value="active">Active Only</option>
                        <option value="paused">Paused Only</option>
                        <option value="restricted">Restricted / Flagged</option>
                      </select>
                   </div>
                </div>

                <div className="grid gap-4">
                  {filteredListings.map(item => (
                    <div key={item.id} className={cn(
                        "group bg-white rounded-2xl border border-slate-200 p-4 flex flex-col md:flex-row gap-4 transition-all hover:shadow-md",
                        item.isActive === false && "bg-slate-50 border-slate-200 opacity-80"
                    )}>
                      <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                              <span>#{item.id}</span>
                              <span>•</span>
                              <span className={item.isActive === false ? "text-amber-500 font-bold" : "text-green-500 font-bold"}>
                                {item.isActive === false ? "PAUSED" : "LIVE"}
                              </span>
                              {(item as any).isUnderReview && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 text-white bg-red-600 px-1.5 py-0.5 rounded text-[10px] animate-pulse">
                                     RESTRICTED
                                  </span>
                                </>
                              )}
                            </div>
                            <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                            <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-black text-slate-900">৳{item.rent.toLocaleString()}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BDT / month</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                           <div className="flex gap-4">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type: <span className="text-slate-900">{item.type}</span></span>
                           </div>
                           <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => markAsRestricted(item.id)}
                                className="rounded-lg text-amber-600 hover:bg-amber-50 text-xs font-bold"
                              >
                                <ShieldAlert className="h-4 w-4 mr-1.5" /> Restrict
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleListingStatus(item.id)}
                                className={cn(
                                  "rounded-lg text-xs font-bold",
                                  item.isActive === false ? "text-green-600 hover:bg-green-50" : "text-slate-600 hover:bg-slate-100"
                                )}
                              >
                                {item.isActive === false ? <PlayCircle className="h-4 w-4 mr-1.5" /> : <PauseCircle className="h-4 w-4 mr-1.5" />}
                                {item.isActive === false ? "Activate" : "Pause"}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => deleteListing(item.id)}
                                className="rounded-lg text-red-600 hover:bg-red-50 text-xs font-bold"
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                              </Button>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'verifications' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">ID Investigations</h2>
                <div className="grid gap-6">
                  {verifications.map(req => (
                    <div key={req.id} className={cn(
                      "bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm transition-opacity",
                      req.status === 'paused' && "opacity-75 grayscale-[0.5]"
                    )}>
                       <div className="p-6">
                         <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                               <div className="flex items-center gap-3 mb-4">
                                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                                    {req.name.charAt(0)}
                                  </div>
                                  <div>
                                     <h3 className="text-lg font-bold text-slate-900">{req.name}</h3>
                                     <p className="text-sm text-slate-500 font-medium">{req.phone}</p>
                                     <div className="mt-1 flex gap-2">
                                        <span className={cn(
                                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                          req.status === 'approved' ? "bg-green-100 text-green-700" : 
                                          req.status === 'paused' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                                        )}>
                                          {req.status}
                                        </span>
                                     </div>
                                  </div>
                               </div>
                               <div className="space-y-4 pt-4 border-t border-slate-100">
                                  <div className="flex justify-between items-center">
                                     <p className="text-xs font-bold text-slate-400 uppercase">Investigate ID:</p>
                                     <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold" onClick={() => pauseVerification(req.id)}>
                                        <PauseCircle className="h-3 w-3 mr-1" /> Pause Verification
                                     </Button>
                                  </div>
                                  <div className="flex gap-3">
                                     <Button 
                                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-wider text-xs h-12"
                                      onClick={() => handleApprove(req.id)}
                                     >
                                       <CheckCircle2 className="h-5 w-5 mr-2" /> Approve & Verify
                                     </Button>
                                     <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 font-black uppercase tracking-wider text-xs h-12">
                                       <Trash2 className="h-5 w-5 mr-2" /> Reject
                                     </Button>
                                  </div>
                               </div>
                            </div>
                            <div className="md:w-1/2">
                               <div className="relative aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 group ring-4 ring-slate-100">
                                  <Image src={req.idImage} alt="ID card" fill className="object-cover transition-transform group-hover:scale-105" unoptimized />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                     <Button variant="secondary" size="sm" className="font-bold">
                                        OPEN HD PREVIEW
                                     </Button>
                                  </div>
                               </div>
                            </div>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Account Management</h2>
                <div className="grid gap-4">
                   {users.map(u => (
                      <div key={u.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between group hover:border-primary-200 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className={cn(
                              "h-12 w-12 rounded-full flex items-center justify-center font-bold text-white",
                              u.role === 'admin' ? "bg-slate-900" : "bg-primary-500"
                            )}>
                               {u.name.charAt(0)}
                            </div>
                            <div>
                               <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-slate-900">{u.name}</h3>
                                  {u.isFlagged && <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold">FLAGGED</span>}
                               </div>
                               <p className="text-sm text-slate-500">{u.phone}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <Button variant="outline" size="sm" className={cn(
                              "rounded-xl font-bold text-xs",
                              u.isFlagged ? "bg-amber-100 border-amber-200 text-amber-700" : ""
                            )} onClick={() => toggleUserFlag(u.id)}>
                               {u.isFlagged ? "Remove Flag" : "Mark Account"}
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs text-red-600 border-red-100 hover:bg-red-50">
                               Ban User
                            </Button>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Quick Insight Cards */}
                 <div className="rounded-3xl bg-white p-8 border border-slate-200 shadow-sm col-span-full py-20 text-center">
                    <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-primary-600" />
                    <h2 className="text-3xl font-black text-slate-900 mb-2">Platform Health</h2>
                    <p className="text-slate-500">Security monitoring active. Analyzing trends for 2025.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
