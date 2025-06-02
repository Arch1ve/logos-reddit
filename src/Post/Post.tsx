import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./post.css"
import { SlArrowUpCircle, SlArrowDownCircle, SlBubble } from "react-icons/sl";

interface PostProps {
  postID: string;
  title: string;
  shortDescription: string;
  name: string;
  totallikes: number; 
}

export const Post: React.FC<PostProps> = ({ 
  title, 
  shortDescription, 
  name, 
  postID,
  totallikes
}) => {
  const [count, setCount] = useState(totallikes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLike = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Требуется авторизация');

      const response = await fetch(`http://localhost:3000/api/post/${postID}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }
      const updatedPost = await response.json();
      setCount(updatedPost.totallikes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Требуется авторизация');

      const response = await fetch(`http://localhost:3000/api/post/${postID}/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка сервера');
      }
      const updatedPost = await response.json();
      setCount(updatedPost.totallikes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <div className="counter-container" style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="counter-btn" 
          onClick={handleLike} 
          disabled={isLoading}
        >
          <SlArrowUpCircle size={30} color='#3bd1ff' />
        </button>

        <span style={{ margin: '0 10px' }}>{count}</span>

        <button
          className="counter-btn"
          onClick={handleDislike}
          disabled={isLoading}
        >
          <SlArrowDownCircle size={30} color='#3bd1ff' />
        </button>

        <div 
          className="link-btn" 
          onClick={handleCommentClick}
          style={{ cursor: 'pointer', marginLeft: '10px' }}
        >
          <SlBubble size={33} color='#3bd1ff'/>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};