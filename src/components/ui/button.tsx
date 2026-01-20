import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

function Button({
  children,
  className,
  onClick,
  variant = 'default',
  size = 'default',
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
