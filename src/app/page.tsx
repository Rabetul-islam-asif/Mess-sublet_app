"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, MapPin, BedDouble, ShowerHead, Wifi, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MOCK_LISTINGS } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-900 py-16 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Find Your Perfect <span className="text-secondary-400">Mess or Sublet</span> in Dhaka
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              Verified listings for bachelors and families. Zero hassle.
            </p>
            
            <div className="mt-8 flex w-full max-w-lg items-center rounded-2xl bg-white p-2 text-gray-900 shadow-xl">
              <MapPin className="ml-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by area (e.g. Mirpur)"
                className="flex-1 bg-transparent px-4 py-2 font-medium focus:outline-none placeholder:text-gray-400"
              />
              <Button size="md" className="rounded-xl">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-800/50 blur-3xl" />
        <div className="absolute -bottom-20 right-20 h-72 w-72 rounded-full bg-secondary-900/50 blur-3xl" />
      </section>

      {/* Featured Listings */}
      <section className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Featured Listings</h2>
          <Link href="/search">
            <Button variant="ghost" size="sm" className="text-primary-600">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_LISTINGS.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/post/${post.id}`} className="group">
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1">
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  
                  {/* Type Badge - Professional slate color */}
                  <div className="absolute left-4 top-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    {post.type}
                  </div>
                  
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add to favorites logic here
                    }}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-md backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 hover:scale-110 active:scale-95"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  
                  {/* Price Badge - Clean white design */}
                  <div className="absolute bottom-4 left-4">
                    <div className="rounded-lg bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                      <span className="text-xl font-bold text-slate-900">৳{post.rent}</span>
                      <span className="text-sm text-slate-500">/month</span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-5">
                  {/* Title & Location */}
                  <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="mt-2 flex items-center text-sm text-slate-500">
                    <MapPin className="mr-1.5 h-4 w-4 text-slate-400" />
                    <span>{post.location}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-slate-600">{post.floor} Floor</span>
                  </div>

                  {/* Amenities Row */}
                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                        <BedDouble className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{post.beds} Bed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                        <ShowerHead className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{post.baths} Bath</span>
                    </div>
                  </div>

                  {/* Facilities Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.facilities.slice(0, 3).map((fac) => (
                      <span 
                        key={fac} 
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {fac}
                      </span>
                    ))}
                    {post.facilities.length > 3 && (
                      <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-400">
                        +{post.facilities.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
