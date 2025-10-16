
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={`flex h-11 w-full items-center justify-between rounded-lg border-2 border-input bg-white px-4 py-2 text-sm text-foreground shadow-inner-sm ring-offset-background transition-all duration-200 placeholder:text-muted-foreground/60 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = 'Select';
