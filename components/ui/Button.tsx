
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const variants = {
  default: 'bg-gradient-to-r from-primary to-primary-hover text-primary-foreground hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-md',
  destructive: 'bg-gradient-to-r from-destructive to-destructive-hover text-destructive-foreground hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-md',
  outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-sm',
  ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline hover:text-primary-hover',
};

const sizes = {
  default: 'h-10 px-5 py-2',
  sm: 'h-9 rounded-md px-3 text-xs',
  lg: 'h-12 rounded-lg px-8 text-base',
  icon: 'h-10 w-10',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
