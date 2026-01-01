"use client";

import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/ui/PostCard";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MOCK_LISTINGS } from "@/lib/data";

export default function Home() {
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
            
            <div className="mt-8 flex gap-6 text-sm text-primary-200 font-medium">
               <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2"></span> Verified Listings</span>
               <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2"></span> Direct Contact</span>
               <span className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2"></span> No Hidden Fees</span>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-800/50 blur-3xl mix-blend-overlay" />
        <div className="absolute -bottom-20 right-20 h-72 w-72 rounded-full bg-secondary-900/50 blur-3xl mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
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
          {MOCK_LISTINGS.map((post) => (
             <div key={post.id} className="h-full">
               <PostCard post={post} />
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
