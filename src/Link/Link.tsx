import React from 'react';

interface LinkProps {
  text: string;
  href: string;
}

const Link: React.FC<LinkProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className='Link-header'
    >
      {text}
    </a>
  );
};

export default Link;