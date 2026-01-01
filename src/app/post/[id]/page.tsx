"use client";

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, BedDouble, ShowerHead, Wifi, Phone, MessageCircle, Share2, Heart, ShieldCheck, User, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_LISTINGS, Listing } from '@/lib/data';
import { cn } from '@/lib/utils';
import { notFound, useRouter } from 'next/navigation';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using use() hook as per Next.js 15+ guidance or async component pattern
  const resolvedParams = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Listing | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const foundPost = MOCK_LISTINGS.find(p => p.id === parseInt(resolvedParams.id));
    if (foundPost) {
      setPost(foundPost);
    }
  }, [resolvedParams.id]);

  const handleAuthAction = (action: string) => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert(`Please login to ${action}.`);
      router.push('/auth/login');
      return;
    }
    alert(`${action} functionality coming soon!`);
  };

  if (!post) {
    return <div className="flex h-screen items-center justify-center text-slate-600">Loading...</div>;
  }

  const images = post.images || [post.image];

  return (
    <div className="min-h-screen bg-[#EEF0E9] pb-24">
      {/* Mobile Header */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white/95 px-4 py-3 backdrop-blur-md shadow-sm md:hidden">
        <Link href="/">
          <Button variant="ghost" size="sm" className="-ml-2 text-slate-700">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-slate-100">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full text-slate-600 hover:bg-slate-100" onClick={() => handleAuthAction('like')}>
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl md:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div className="overflow-hidden bg-slate-200 md:rounded-2xl shadow-sm">
              <div className="relative aspect-[4/3] w-full md:aspect-video">
                <Image
                  src={images[activeImage]}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-white">
                    {images.map((img, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={cn(
                                "relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                                activeImage === idx ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image src={img} alt="thumbnail" fill className="object-cover" unoptimized />
                        </button>
                    ))}
                </div>
              )}
            </div>

            {/* Title & Key Info */}
            <div className="px-4 md:px-0 bg-white md:bg-transparent py-4 md:py-0 rounded-xl md:rounded-none">
               <div className="flex items-start justify-between">
                 <div>
                    <div className="mb-2 inline-flex items-center rounded-lg bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {post.type}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{post.title}</h1>
                    <div className="mt-2 flex items-center text-slate-500">
                        <MapPin className="mr-1.5 h-4 w-4 text-slate-400" />
                        {post.location} {post.floor && <><span className="mx-2 text-slate-300">|</span>{post.floor} Floor</>}
                    </div>
                 </div>
               </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-0">
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <BedDouble className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Bedrooms</p>
                        <p className="font-semibold text-slate-800">{post.beds} Bed</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <ShowerHead className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Bathrooms</p>
                        <p className="font-semibold text-slate-800">{post.baths} Bath</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Roommate</p>
                        <p className="font-semibold text-slate-800">{post.type.includes('Family') ? 'Family' : 'Shared'}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500">Status</p>
                        <p className="font-semibold text-green-600">Verified</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="px-4 md:px-0 bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] md:shadow-none md:p-0 md:bg-transparent">
                <h3 className="mb-3 text-lg font-bold text-slate-900">About this place</h3>
                <p className="leading-relaxed text-slate-600">
                    {post.description || "No description provided for this listing."}
                </p>
            </div>

            {/* Facilities */}
            <div className="px-4 md:px-0 bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] md:shadow-none md:p-0 md:bg-transparent">
                <h3 className="mb-3 text-lg font-bold text-slate-900">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                    {post.facilities.map(fac => (
                        <span key={fac} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                            {fac}
                        </span>
                    ))}
                </div>
            </div>

            {/* Restrictions / Preferences */}
            {post.restrictions && post.restrictions.length > 0 && (
              <div className="px-4 md:px-0 bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] md:shadow-none md:p-0 md:bg-transparent">
                  <h3 className="mb-3 text-lg font-bold text-amber-600">Restrictions & Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                      {post.restrictions.map(res => (
                          <span key={res} className="flex items-center rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              {res}
                          </span>
                      ))}
                  </div>
              </div>
            )}
          </div>

          {/* Sidebar / Floating Action */}
          <div className="relative">
             <div className="sticky top-24 space-y-4">
                <div className="hidden rounded-2xl bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.12)] md:block">
                    <div className="mb-6 flex items-baseline justify-between">
                        <span className="text-3xl font-bold text-slate-900">৳{post.rent}</span>
                        <span className="text-slate-500">/month</span>
                    </div>
                    
                    <div className="mb-5 space-y-3">
                         <div className="rounded-xl border border-slate-200 p-4">
                             <div className="flex items-center gap-3">
                               <Calendar className="h-5 w-5 text-slate-400" />
                               <div>
                                 <p className="text-xs text-slate-500">Available From</p>
                                 <p className="font-semibold text-slate-800">{post.availableFrom}</p>
                               </div>
                             </div>
                         </div>
                    </div>

                    <div className="space-y-3">
                        <button onClick={() => handleAuthAction('book')} className="w-full rounded-xl bg-slate-900 py-4 text-base font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
                            Request Booking
                        </button>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => handleAuthAction('call')} className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]">
                                <span className="flex items-center justify-center">
                                    <Phone className="mr-2 h-5 w-5" /> Call Owner
                                </span>
                            </button>
                            <button onClick={() => handleAuthAction('message')} className="w-full rounded-xl border-2 border-slate-200 bg-white py-4 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]">
                                <span className="flex items-center justify-center">
                                    <MessageCircle className="mr-2 h-5 w-5" /> Send Message
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-center text-sm text-slate-400">
                        You won't be charged yet
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] md:hidden">
          <div className="flex items-center gap-4">
              <div className="flex-1">
                  <p className="text-xl font-bold text-slate-900">৳{post.rent}</p>
                  <p className="text-xs text-slate-500">/month</p>
              </div>
              <button onClick={() => handleAuthAction('book')} className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
                  Request Booking
              </button>
          </div>
      </div>
    </div>
  );
}
