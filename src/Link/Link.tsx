import React from 'react';
import "./link.css"

interface LinkProps {
  text: string;
  href: string;
}

const Linktext: React.FC<LinkProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className='Link-header'
    >
      {text}
    </a>
  );
};

export default Linktext;