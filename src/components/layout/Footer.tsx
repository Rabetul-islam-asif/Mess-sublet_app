import Link from 'next/link';
import { Heart, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-[#EEF0E9] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 leading-none">SubLet</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                The most trusted platform to find mess, sublets, and shared flats in Dhaka city.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Contact Us</h3>
              <div className="flex flex-col gap-2">
                <a 
                  href="mailto:asifrabetul@gmail.com" 
                  className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-primary-600"
                >
                  <Mail className="h-4 w-4" />
                  asifrabetul@gmail.com
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Legal</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-500">
                <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
                <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
            <p className="text-sm text-slate-500">
              © 2024 SubLet. All rights reserved.
            </p>
            
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium tracking-tight">
              <span>Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>in Dhaka</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
