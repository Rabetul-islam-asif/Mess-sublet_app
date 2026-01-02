"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Store, PlusCircle, Search, Menu, MessageCircle, User, ArrowRight, MoreVertical, Phone, Moon, HelpCircle, Trash2, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { useEffect, useState, useRef } from 'react';

export const Header = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth state
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Store, label: 'Marketplace', href: '/search' },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-200 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20",
          !isScrolled && pathname === '/' && "border-transparent shadow-none"
        )}
      >
      <div className="flex h-[64px] items-center justify-between px-4 container mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
             <Logo className="h-9 w-9" />
             <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent hidden sm:block">
               SubLet
             </span>
          </Link>
          
          {/* Desktop Search */}
          <div className="hidden lg:flex h-10 w-[280px] items-center rounded-full bg-slate-100/80 px-4 text-slate-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 transition-all border border-transparent focus-within:border-primary-200">
            <Search className="h-4 w-4 mr-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search area..." 
              className="bg-transparent text-sm outline-none placeholder:text-slate-400 w-full font-medium"
            />
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex h-full items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  isActive 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-4 w-4 mr-2", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3">
           <Link href="/post">
             <Button className="hidden sm:flex h-10 rounded-full px-5 font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all">
               <PlusCircle className="mr-2 h-4 w-4" />
               Post Ad
             </Button>
             <Button size="icon" className="sm:hidden h-9 w-9 rounded-full shadow-lg">
               <PlusCircle className="h-5 w-5" />
             </Button>
           </Link>
           
           <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

           {user ? (
             <Link href="/dashboard">
               <div className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 hidden lg:block max-w-[80px] truncate">
                    Dashboard
                  </span>
               </div>
             </Link>
           ) : (
             <div className="flex items-center gap-2">
               <Link href="/auth/login">
                 <Button variant="ghost" className="hidden sm:flex rounded-full text-slate-600 font-semibold hover:text-slate-900">
                   Log In
                 </Button>
               </Link>
               <Link href="/auth/signup">
                 <Button variant="secondary" className="hidden sm:flex rounded-full px-5 font-semibold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200">
                   Sign Up
                 </Button>
               </Link>
               {/* Mobile User Icon if not logged in */}
               <Link href="/auth/login" className="sm:hidden">
                 <div className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-600">
                   <User className="h-5 w-5" />
                 </div>
               </Link>
             </div>
           )}

           {/* 3-Dot Menu */}
           <div className="relative" ref={menuRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-slate-600 hover:bg-slate-100 overflow-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {user?.image ? (
                   <div className="relative h-8 w-8">
                      <img src={user.image} alt="Profile" className="h-full w-full object-cover" />
                   </div>
                ) : (
                   <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5" />
                   </div>
                )}
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-200/50 z-[999] animate-in fade-in zoom-in-95 duration-200">
                  <div className="mb-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Menu
                  </div>

                  {user ? (
                      <>
                        {user.role === 'admin' && (
                          <Link href="/admin" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-primary-600 transition-colors hover:bg-primary-50">
                            <ShieldCheck className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        )}
                        <Link href="/dashboard?tab=profile" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                          <User className="h-4 w-4" />
                          Profile
                        </Link>
                      </>
                  ) : (
                      <button 
                         onClick={() => {
                            if(confirm("You must log in to access account settings.")) {
                                window.location.href = '/auth/login';
                            }
                         }}
                         className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                      >
                         <User className="h-4 w-4" />
                         Profile
                      </button>
                  )}

                   <div className="my-1.5 h-px bg-slate-100" />
                    
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                      <Phone className="h-4 w-4" />
                      Contact Us
                    </button>
                    
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                      <Moon className="h-4 w-4" />
                      Dark Mode
                    </button>
                    
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900">
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </button>
                    
                    {user && (
                        <>
                           <div className="my-1.5 h-px bg-slate-100" />
                           <button 
                              onClick={() => {
                                localStorage.clear();
                                window.location.href = '/';
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                           >
                              <LogOut className="h-4 w-4" />
                              Log Out
                           </button>
                        </>
                    )}
                  </div>
              )}
           </div>
        </div>
      </div>
    </header>
    {pathname !== '/' && <div className="h-[64px]" />}
    </>
  );
};
