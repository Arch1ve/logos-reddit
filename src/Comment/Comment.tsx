import "./comment.css"
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const name = "student"

interface PostProps {
  text: string;
  name?: string;
  commentID: number;
}

const Comment: React.FC<PostProps> = ({ text, name, commentID }) => {
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
          <img className='img-up' src="https://cdn-icons-png.flaticon.com/512/25/25366.png" alt="up"/>
        </button>
        <span className='count' id="counter">{count}</span>
        <button 
          className="counter-btn" 
          onClick={handleIncrement}
        >
          <img className='img-down' src="https://cdn-icons-png.flaticon.com/512/25/25366.png" alt="down"/> 
        </button>
      </div>
    </div>
  );
};

export default Comment;