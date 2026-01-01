import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-slate-200 bg-white shadow-sm transition-all',
          hover && 'hover:border-slate-300 hover:shadow-md',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
