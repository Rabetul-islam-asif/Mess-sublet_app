"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Filter, Map as MapIcon, List, Search as SearchIcon, MapPin, BedDouble, ShowerHead, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PostCard } from '@/components/ui/PostCard';

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {MOCK_LISTINGS.filter(item => item.isActive !== false).map(item => (
                <PostCard key={item.id} post={item} />
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
