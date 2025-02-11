import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'icon' | 'default';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'default', children, ...props }) => {
  return (
    <button
      className={`btn ${variant} ${size}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;