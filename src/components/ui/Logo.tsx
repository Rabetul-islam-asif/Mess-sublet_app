import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, withText = true, ...props }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("h-10 w-10", className)}
        {...props}
      >
        {/* Background Circle */}
        <circle cx="20" cy="20" r="20" className="fill-primary-600" />
        
        {/* Abstract House/M Shape */}
        <path
          d="M10 20L20 12L30 20V28C30 29.1 29.1 30 28 30H12C10.9 30 10 29.1 10 28V20Z"
          className="fill-white"
        />
        <path
          d="M20 14L28 20.4V28H23V22H17V28H12V20.4L20 14Z"
          className="fill-primary-600"
        />
        {/* Roof overhang */}
        <path
          d="M8 20L20 10L32 20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withText && (
        <span className="hidden text-2xl font-bold tracking-tight text-primary-700 lg:block">
          Sub<span className="text-slate-900">Let</span>
        </span>
      )}
    </div>
  );
};
