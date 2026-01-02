"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/ui/PostCard";
import { Search, MapPin, ArrowRight, Building2, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MOCK_LISTINGS, Listing } from "@/lib/data";
import { getRecommendedPosts } from "@/lib/recommendations";

export default function Home() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);

  useEffect(() => {
    // Load liked posts from local storage and get personal recommendations
    const liked = JSON.parse(localStorage.getItem('liked_posts') || '[]');
    if (liked.length > 0) {
      const sorted = getRecommendedPosts(MOCK_LISTINGS, liked);
      setListings(sorted);
    }
  }, []);

  // Calculate Stats
  const totalAds = MOCK_LISTINGS.length;
  // Get unique locations (simplified for mock)
  const locations = Array.from(new Set(MOCK_LISTINGS.map(item => item.location.split(',')[0].trim())));

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-900 pt-24 pb-20 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Find Your Perfect <br />
              <span className="text-secondary-400">Mess or Sublet</span> in Dhaka
            </h1>
            <p className="mt-6 text-lg text-primary-100 max-w-lg leading-relaxed">
              Discover verified bachelor seats, family sublets, and shared flats. 
              Zero hassle, direct booking.
            </p>
            
            <div className="mt-8 flex w-full max-w-lg items-center rounded-full bg-white p-1.5 pl-5 text-gray-900 shadow-xl transition-transform hover:scale-[1.01]">
              <MapPin className="mr-3 h-5 w-5 text-primary-500" />
              <input
                type="text"
                placeholder="Search by area (e.g. Mirpur, Dhanmondi)"
                className="flex-1 bg-transparent py-3 font-medium focus:outline-none placeholder:text-gray-400"
              />
              <Button size="lg" className="rounded-full px-8 shadow-md">
                Search
              </Button>
            </div>
            
            {/* Stats Row */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-800 pt-8">
               <div>
                  <div className="text-3xl font-bold text-white">{totalAds}+</div>
                  <div className="text-sm text-primary-200">Active Ads</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-primary-200">Areas</div>
               </div>
               <div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-sm text-primary-200">Verified</div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-800/50 blur-3xl mix-blend-overlay" />
        <div className="absolute -bottom-20 right-20 h-72 w-72 rounded-full bg-secondary-900/50 blur-3xl mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </section>

      {/* Popular Locations */}
      <section className="container mx-auto px-4">
         <h2 className="mb-6 text-xl font-bold text-slate-900">Popular Locations</h2>
         <div className="flex flex-wrap gap-3">
            {locations.map((loc) => (
               <Link key={loc} href={`/search?location=${loc}`}>
                 <div className="group flex items-center rounded-full border border-slate-200 bg-white px-5 py-2.5 transition-all hover:border-primary-500 hover:shadow-md cursor-pointer">
                    <MapPin className="mr-2 h-4 w-4 text-slate-400 group-hover:text-primary-500" />
                    <span className="font-medium text-slate-700 group-hover:text-primary-700">{loc}</span>
                 </div>
               </Link>
            ))}
            <Link href="/search">
               <div className="flex items-center rounded-full border border-dashed border-slate-300 bg-slate-50 px-5 py-2.5 transition-all hover:bg-slate-100 cursor-pointer">
                  <span className="font-medium text-slate-500">View All Locations</span>
               </div>
            </Link>
         </div>
      </section>

      {/* Featured Listings - Single Section */}
      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Listings</h2>
            <p className="mt-1 text-slate-500">Handpicked properties for you</p>
          </div>
          <Link href="/search">
            <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.slice(0, 8).map((post) => (
             <div key={post.id} className="h-full">
               <PostCard post={post} />
             </div>
          ))}
        </div>
        
        {/* See More Button */}
        <div className="mt-12 flex justify-center">
            <Link href="/search">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300">
                 See More Ads
                 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
