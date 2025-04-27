import React from 'react';

interface ButtonTextProps {
  children: React.ReactNode;
  className?: string;  
}

const ButtonText: React.FC<ButtonTextProps> = ({ children, className }) => {
  return (
    <button className={className}>
      {children}
    </button>
  );
};

export default ButtonText;