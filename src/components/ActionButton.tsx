import React from 'react';
import { cn } from "@/lib/utils";

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
  secondary: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  outline: "border border-gray-300 bg-white hover:bg-gray-50 focus:ring-blue-500",
  destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
};

const sizeStyles = {
  sm: "text-xs px-3 py-1.5 h-8",
  md: "text-sm px-4 py-2 h-10",
  lg: "text-base px-5 py-2.5 h-12"
};

const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "transform active:scale-95 transition-transform duration-100",
        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
      <span className="absolute inset-0 rounded-lg overflow-hidden">
        <span className="absolute inset-0 transform translate-y-[calc(100%+1px)] bg-black/5 transition-transform will-change-transform hover:translate-y-[calc(100%-5px)]"></span>
      </span>
    </button>
  );
};

export default ActionButton;
