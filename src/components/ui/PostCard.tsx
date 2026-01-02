"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, ShowerHead, Heart, ChevronLeft, ChevronRight, BadgeCheck, Share2, Calendar, Sparkles, Building2 } from 'lucide-react';
import { Listing } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: Listing;
}

export const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      const liked = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      return liked.includes(post.id);
    }
    return false;
  });
  
  // Use images array if available, otherwise fallback to single image
  const images = post.images && post.images.length > 0 ? post.images : [post.image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle like state directly without auth check for better UX (or keep auth check if strictly required)
    // User requested "optimize suggestions according to user likes", so we track even if not logged in?
    // The previous code enforced login. Let's keep it but also save to local storage for "unauthenticated suggestions" if we want,
    // OR just enforce login. The plan said "Implement local tracking".
    // Let's implement local tracking regardless of auth for the recommendation engine to work immediately.
    
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    const liked = JSON.parse(localStorage.getItem('liked_posts') || '[]');
    if (newIsLiked) {
      if (!liked.includes(post.id)) liked.push(post.id);
    } else {
      const index = liked.indexOf(post.id);
      if (index > -1) liked.splice(index, 1);
    }
    localStorage.setItem('liked_posts', JSON.stringify(liked));
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this ${post.type} in ${post.location}`,
        url: window.location.origin + `/post/${post.id}`,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/post/${post.id}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Link href={`/post/${post.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1">
        
        {/* Image Section */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <Image 
            src={images[currentImageIndex]} 
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          
          {/* Internal Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-1.5 text-white backdrop-blur-md transition-all hover:bg-white/50 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-1.5 text-white backdrop-blur-md transition-all hover:bg-white/50 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "h-1.5 rounded-full transition-all shadow-sm",
                      idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    )} 
                  />
                ))}
              </div>
            </>
          )}
          

          
          {/* Top Actions */}
          <div className="absolute right-4 top-4 flex gap-2">
            <button 
              onClick={handleShare}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white hover:text-primary-600 hover:scale-110 active:scale-95"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button 
              onClick={handleLike}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95",
                isLiked ? "bg-white text-red-500" : "bg-white/20 text-white hover:bg-white hover:text-red-500"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked ? "fill-current" : "")} />
            </button>
          </div>
          

          
          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 text-white">
             <div className="flex items-baseline gap-1 text-shadow-sm">
               <span className="text-xl font-bold">৳{post.rent.toLocaleString()}</span>
               <span className="text-sm font-medium opacity-90">/month</span>
             </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5">
          {/* Property Category & Availability Bar */}
          <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-50 pb-3">
             <span className={cn(
               "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm",
               post.category === 'Mess' ? "bg-indigo-600" : 
               post.category === 'Sublet' ? "bg-amber-600" : "bg-emerald-600"
             )}>
               {post.category}
             </span>
             <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200 uppercase tracking-tighter">
               {post.type}
             </span>
             {post.availableFrom && (
               <span className="ml-auto flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-primary-600">
                  <Calendar className="h-3 w-3" />
                  {post.availableFrom}
               </span>
             )}
          </div>
          <div className="flex items-start justify-between gap-2">
             <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors">
               {post.title}
             </h3>
            {post.isVerified && (
               <BadgeCheck className="h-5 w-5 shrink-0 text-green-500 fill-green-50" />
            )}
          </div>
          
          <div className="mt-2 flex items-center text-sm text-slate-500">
            <MapPin className="mr-1.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{post.location}</span>
          </div>

          {/* Facilities Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.facilities.slice(0, 4).map((fac) => (
              <span key={fac} className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-tight text-slate-600 border border-slate-100">
                <Sparkles className="h-2.5 w-2.5 text-primary-400" />
                {fac}
              </span>
            ))}
            {post.facilities.length > 4 && (
              <span className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400 border border-slate-100">
                +{post.facilities.length - 4}
              </span>
            )}
          </div>

          {/* Restrictions Section */}
          {post.restrictions && post.restrictions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 font-medium">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Must follow:</span>
              {post.restrictions.map((res) => (
                <span key={res} className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                  {res}
                </span>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-slate-600">
                <BedDouble className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold">{post.beds} Bed</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <ShowerHead className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold">{post.baths} Bath</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold">{post.floor} Floor</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-5">
             <Button className="w-full rounded-xl py-2.5 font-bold shadow-sm transition-all hover:shadow-primary-100">
               View Details & Book
             </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
