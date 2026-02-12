import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
export function Card({
  children,
  className = '',
  onClick,
  padding = 'md'
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  return (
    <div
      className={`bg-white rounded-xl shadow-warm border border-stone-100 ${paddings[padding]} ${onClick ? 'cursor-pointer hover:shadow-warm-lg transition-shadow duration-200' : ''} ${className}`}
      onClick={onClick}>

      {children}
    </div>);

}