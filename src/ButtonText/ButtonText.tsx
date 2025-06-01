import React from 'react';
import { Link } from 'react-router-dom';
import './buttontext.sass';

interface ButtonTextProps extends React.ComponentPropsWithoutRef<'button'> {
  as?: React.ElementType;
  to?: string;
  className?: string;
  children: React.ReactNode;
}

const ButtonText: React.FC<ButtonTextProps> = ({ 
  as: Component = 'button',
  to,
  className = '',
  children,
  ...props
}) => {
  const combinedClasses = `button ${className}`.trim();
  
  const additionalProps = Component === Link ? { to } : {};

  return (
    <Component 
      className={combinedClasses}
      {...additionalProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ButtonText;