"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Filter, Map as MapIcon, List, Search as SearchIcon, MapPin, BedDouble, ShowerHead, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { MOCK_LISTINGS } from "@/lib/data";

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    minRent: '',
    maxRent: '',
    type: [] as string[],
    area: '',
  });

  const toggleType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type]
    }));
  };

  return (
    <div className="container mx-auto min-h-screen p-4 pb-20">
      {/* Search Header */}
      <div className="sticky top-16 z-30 -mx-4 bg-white/80 px-4 py-4 backdrop-blur-md sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
        <div className="flex gap-2">
           <div className="relative flex-1">
             <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
             <Input 
               placeholder="Search area..." 
               className="pl-10"
               value={filters.area}
               onChange={(e) => setFilters({...filters, area: e.target.value})}
             />
           </div>
           <Button variant="outline" onClick={() => setShowFilters(true)}>
             <Filter className="mr-2 h-4 w-4" /> Filters
           </Button>
           <Button variant="ghost" onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}>
             {viewMode === 'list' ? <MapIcon className="h-5 w-5" /> : <List className="h-5 w-5" />}
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        {/* Results */}
        <div className="space-y-4">
          {viewMode === 'map' ? (
             <Card className="flex h-[600px] items-center justify-center bg-gray-100 text-gray-500">
                <div className="text-center">
                  <MapIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
                  <p>Map View Integration Placeholder</p>
                  <p className="text-xs">Google Maps API required</p>
                </div>
             </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {MOCK_LISTINGS.map(item => (
                <Link key={item.id} href={`/post/${item.id}`} className="group">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] hover:-translate-y-1">
                    {/* Image Section */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      
                      {/* Type Badge */}
                      <div className="absolute left-4 top-4 rounded-lg bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                        {item.type}
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
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="rounded-lg bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm">
                          <span className="text-xl font-bold text-slate-900">৳{item.rent}</span>
                          <span className="text-sm text-slate-500">/month</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-5">
                      {/* Title & Location */}
                      <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-slate-500">
                        <MapPin className="mr-1.5 h-4 w-4 text-slate-400" />
                        <span>{item.location}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-slate-600">{item.floor} Floor</span>
                      </div>

                      {/* Amenities Row */}
                      <div className="mt-4 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <BedDouble className="h-4 w-4 text-slate-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{item.beds} Bed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                            <ShowerHead className="h-4 w-4 text-slate-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{item.baths} Bath</span>
                        </div>
                      </div>

                      {/* Facilities Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.facilities.slice(0, 3).map((fac) => (
                          <span 
                            key={fac} 
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {fac}
                          </span>
                        ))}
                        {item.facilities.length > 3 && (
                          <span className="rounded-md bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-400">
                            +{item.facilities.length - 3}
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
          )}
        </div>
      </div>

      {/* Filter Modal (Used for Mobile & Desktop now) */}
      <Modal isOpen={showFilters} onClose={() => setShowFilters(false)} title="Filter Listings">
        <div className="space-y-6">
           <div>
             <label className="mb-2 block text-sm font-medium text-slate-700">Rent Range</label>
             <div className="flex gap-2">
               <Input placeholder="Min" type="number" value={filters.minRent} onChange={e => setFilters({...filters, minRent: e.target.value})} />
               <Input placeholder="Max" type="number" value={filters.maxRent} onChange={e => setFilters({...filters, maxRent: e.target.value})} />
             </div>
           </div>
           <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Tenant Type</label>
              <div className="space-y-2">
                {['Bachelor Male', 'Student Female', 'Small Family'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={filters.type.includes(type)} onChange={() => toggleType(type)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    {type}
                  </label>
                ))}
              </div>
           </div>
           
           <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Facilities</label>
              <div className="grid grid-cols-2 gap-2">
                {['Wifi', 'Gas', 'Lift', 'Generator'].map(fac => (
                   <label key={fac} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                      {fac}
                   </label>
                ))}
              </div>
           </div>

           <Button className="w-full" onClick={() => setShowFilters(false)}>
             Show 25+ Results
           </Button>
        </div>
      </Modal>
    </div>
  );
}
