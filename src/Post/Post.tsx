import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { CommentPage } from '../CommentPage';

interface PostProps {
  text: string;
  name: string;
}
const Post: React.FC<PostProps> = ({ text, name }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleDecrement = () => {
    setCount((prevCount => prevCount + 1));
  };

  return (
    <div className='post'>
      <div className='post-name-div'> 
        <p className='post-name'>{name}</p>
      </div>
      <div className='post-text-div'> 
        <p className='post-text'>{text}</p>
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
        <Link 
          to="/comments"
          className="link-btn"
        >
          <img 
            className='img-up' 
            src="https://w7.pngwing.com/pngs/351/950/png-transparent-byggekort-business-no-entrepreneur-%C3%85s-comment-icon-face-head-black.png" 
            alt="comments"
          />  
        </Link>
      </div>
    </div>
  );
};

export default Post;
