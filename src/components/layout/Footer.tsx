import Link from 'next/link';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#EEF0E9] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-500">
              © 2024 SubLet. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-slate-500">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>in Dhaka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
