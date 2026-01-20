import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
