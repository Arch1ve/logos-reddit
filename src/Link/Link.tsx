import React from 'react';
import "./link.css"

interface LinkProps {
  text: string;
  href: string;
}

export const Linktext: React.FC<LinkProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className='Link-header'
    >
      {text}
    </a>
  );
};
