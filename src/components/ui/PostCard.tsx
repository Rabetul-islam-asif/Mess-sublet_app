"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, BedDouble, ShowerHead, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isLiked, setIsLiked] = useState(false);
  
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
    
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please login to like this post.");
      router.push('/auth/login');
      return;
    }
    
    setIsLiked(!isLiked);
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
          
          {/* Type Badge */}
          <div className="absolute left-4 top-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-lg border border-white/10">
            {post.type}
          </div>
          
          {/* Favorite Button */}
          <button 
            onClick={handleLike}
            className={cn(
              "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all hover:scale-110 active:scale-95",
              isLiked ? "bg-white text-red-500" : "bg-white/20 text-white hover:bg-white hover:text-red-500"
            )}
          >
            <Heart className={cn("h-5 w-5", isLiked ? "fill-current" : "")} />
          </button>
          
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
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {post.title}
          </h3>
          
          <div className="mt-2 flex items-center text-sm text-slate-500">
            <MapPin className="mr-1.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{post.location}</span>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <BedDouble className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{post.beds} Bed</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-1.5 text-slate-600">
              <ShowerHead className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{post.baths} Bath</span>
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
             <div className="flex items-center gap-1.5 text-slate-600">
              <span className="text-sm font-medium">{post.floor} Floor</span>
            </div>
          </div>

          <div className="mt-auto pt-5">
             <Button className="w-full rounded-xl py-2.5 font-semibold shadow-none">
               View Details
             </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
