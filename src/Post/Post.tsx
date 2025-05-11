import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./post.css"
import { SlArrowUpCircle, SlArrowDownCircle, SlBubble } from "react-icons/sl";

interface PostProps {
  postID: number;
  title: string;
  text: string;
  name: string;
}

const Post: React.FC<PostProps> = ({ title, text, name, postID }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(prev => Math.max(0, prev - 1));
  const handleDecrement = () => setCount(prev => prev + 1);

  return (
    <div className='post'>
      <div className='post-name-div'> 
        <p className='post-name'>{name}</p>
      </div>
      <div className='post-title-div'>
        <h3 className='post-title'>{title}</h3>
      </div>
      <div className='post-text-div'> 
        <p className='post-text'>{text}</p>
      </div>
      <div className="counter-container">
        <button className="counter-btn" onClick={handleDecrement}>
          <SlArrowUpCircle size={30} color='#3bd1ff' />
        </button>
        <span className='count'>{count}</span>
        <button className="counter-btn" onClick={handleIncrement}>
          <SlArrowDownCircle size={30} color='#3bd1ff'/>
        </button>
        <Link to={`/comments/${postID}`} className="link-btn">
          <SlBubble size={33}  color='#3bd1ff'/>
        </Link>
      </div>
    </div>
  );
};

export default Post;