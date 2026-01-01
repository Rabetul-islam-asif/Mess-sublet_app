"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, PlusCircle, Search, Menu, Bell, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

export const Header = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Store, label: 'Marketplace', href: '/search' },
    { icon: PlusCircle, label: 'Create', href: '/post' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-[#EEF0E9] shadow-sm">
      <div className="flex h-[56px] items-center justify-between px-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/" className="flex items-center">
             <Logo className="h-10 w-10" />
          </Link>
          <div className="hidden lg:flex h-10 w-[240px] items-center rounded-full bg-slate-100 px-3 text-slate-500">
            <Search className="h-5 w-5 mr-2" />
            <input 
              type="text" 
              placeholder="Search SubLet" 
              className="bg-transparent text-[15px] outline-none placeholder:text-slate-400 w-full"
            />
          </div>
          <Button variant="secondary" size="sm" className="lg:hidden rounded-full h-10 w-10 p-0 bg-slate-100 hover:bg-slate-200">
             <Search className="h-5 w-5 text-slate-600" />
          </Button>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex h-full flex-1 justify-center max-w-[600px] mx-auto">
          <div className="flex w-full justify-between px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="flex flex-1 items-center justify-center"
                >
                  <div className={cn(
                    "flex h-full w-full max-w-[110px] items-center justify-center border-b-[3px] transition-all relative group",
                    isActive 
                      ? "border-primary-600 text-primary-600" 
                      : "border-transparent text-slate-500 hover:bg-slate-100 rounded-lg my-1"
                  )}>
                    <item.icon className={cn("h-7 w-7", isActive ? "fill-current" : "")} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Profile & Menus */}
        <div className="flex items-center justify-end gap-2 lg:gap-3">
           <Button variant="secondary" size="sm" className="hidden lg:flex rounded-full h-10 w-10 p-0 bg-slate-100 hover:bg-slate-200 text-slate-600" onClick={() => alert("Menu feature coming soon!")}>
             <Menu className="h-5 w-5" />
           </Button>
           <Button variant="secondary" size="sm" className="rounded-full h-10 w-10 p-0 bg-slate-100 hover:bg-slate-200 text-slate-600" onClick={() => alert("Inbox feature coming soon!")}>
             <MessageCircle className="h-5 w-5" />
           </Button>
           <Button variant="secondary" size="sm" className="rounded-full h-10 w-10 p-0 bg-slate-100 hover:bg-slate-200 text-slate-600" onClick={() => alert("Notifications feature coming soon!")}>
             <Bell className="h-5 w-5" />
           </Button>
           <Link href="/dashboard">
             <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
               <User className="h-full w-full p-2 text-slate-500" />
             </div>
           </Link>
        </div>
      </div>
    </header>
  );
};
