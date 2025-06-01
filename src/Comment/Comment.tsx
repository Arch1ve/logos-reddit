import "./comment.css"
import React, { useState } from 'react';
import { SlArrowUpCircle, SlArrowDownCircle,  } from "react-icons/sl";

interface PostProps {
  text: string;
  name?: string;
  commentID: number;
}

export const Comment: React.FC<PostProps> = ({ text, name }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className='comment'>
      <div className='comment-name-div'> 
        <p className='comment-name'>{name}</p>
      </div>
      <div className='comment-text-div'> 
        <p className='comment-text'>{text}</p>
      </div>
      <div className="counter-container">
        <button 
          className="counter-btn" 
          onClick={handleDecrement}
        >
          <SlArrowUpCircle 
            size = {30}
            color='#3bd1ff'
          />
        </button>
        <span className='count' id="counter">{count}</span>
        <button 
          className="counter-btn" 
          onClick={handleIncrement}
        >
          <SlArrowDownCircle 
            size = {30}
            color='#3bd1ff'
          />
        </button>
      </div>
    </div>
  );
};
