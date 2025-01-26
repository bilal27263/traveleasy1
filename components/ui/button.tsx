import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'solid';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'solid' }) => {
  const baseClass = 'px-4 py-2 font-semibold rounded-md';
  const variantClass = variant === 'outline' ? 'border border-orange-500 text-orange-500' : 'bg-orange-500 text-white';

  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass}`}>
      {children}
    </button>
  );
};