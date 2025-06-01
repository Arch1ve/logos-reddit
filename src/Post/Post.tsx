import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./post.css"
import { SlArrowUpCircle, SlArrowDownCircle, SlBubble } from "react-icons/sl";
import { useTranslation } from 'react-i18next';

interface PostProps {
  postID: String;
  title: string;
  shortDescription: string;
  name: string;
}

export const Post: React.FC<PostProps> = ({ title, shortDescription, name, postID }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => Math.max(0, prev - 1));
  
  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/comments/${postID}`);
  };

  return (
    <div className='post'>
      <div className='post-name-div'> 
        <p className='post-name'>{name}</p>
      </div>
      <div className='post-title-div'>
        <h3 className='post-title'>{title}</h3>
      </div>
      <div className='post-text-div'> 
        <p className='post-text'>{shortDescription}</p>
      </div>
      <div className="counter-container">
        <button className="counter-btn" onClick={handleIncrement}>
          <SlArrowUpCircle size={30} color='#3bd1ff' />
        </button>
        <span className='count'>{count}</span>
        <button className="counter-btn" onClick={handleDecrement}>
          <SlArrowDownCircle size={30} color='#3bd1ff'/>
        </button>
        <div 
          className="link-btn" 
          onClick={handleCommentClick}
          style={{ cursor: 'pointer' }}
        >
          <SlBubble size={33}  color='#3bd1ff'/>
        </div>
      </div>
    </div>
  );
};