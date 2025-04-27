import React from 'react';

interface LinkProps {
  text: string;

}

const ButtonText: React.FC<LinkProps> = ({ text }) => {
  return (
    <button 
          className="button"
        >
            {text}
        </button>
  );
};

export default ButtonText;