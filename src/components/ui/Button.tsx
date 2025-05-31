import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          
          // Variant styles
          variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'outline' && 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
          variant === 'ghost' && 'hover:bg-gray-100 text-gray-700',
          variant === 'link' && 'text-blue-600 hover:underline p-0 h-auto',
          
          // Size styles
          size === 'sm' && 'text-sm h-8 px-3',
          size === 'md' && 'text-sm h-10 px-4',
          size === 'lg' && 'text-base h-12 px-6',
          
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;