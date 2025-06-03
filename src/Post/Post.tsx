import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./post.css"
import { SlArrowUpCircle, SlArrowDownCircle, SlBubble } from "react-icons/sl";
import {API_URL} from "../api-config.ts";

interface PostProps {
  postID: string;
  title: string;
  shortDescription: string;
  fullDescription: string; 
  name: string;
  totallikes: number; 
  createdAt: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
};

export const Post: React.FC<PostProps> = ({ 
  title, 
  shortDescription, 
  fullDescription, 
  name, 
  postID,
  totallikes,
  createdAt
}) => {
  // Гарантируем, что начальное значение не меньше 0
  const [count, setCount] = useState(Math.max(0, totallikes));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  // Общая функция для обработки лайков/дизлайков
  const handleVote = async (type: 'like' | 'dislike') => {
    if (hasVoted) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Требуется авторизация');

      const response = await fetch(`${API_URL}/post/${postID}/${type}`, {
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
      
      // Гарантируем, что новое значение не меньше 0
      const newCount = Math.max(0, updatedPost.totallikes);
      setCount(newCount);
      setHasVoted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = () => handleVote('like');
  const handleDislike = () => handleVote('dislike');

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/comments/${postID}`);
  };

  const buttonColor = (isLoading || hasVoted) ? '#ccc' : '#3bd1ff';
  const formattedDate = formatDate(createdAt);

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
      <div className='post-text-div'> 
        <p className='post-text'>{fullDescription}</p>
      </div>
      
      <div className="counter-container" style={{ display: 'flex', alignItems: 'center' }}>
        <button 
          className="counter-btn" 
          onClick={handleLike} 
          disabled={isLoading || hasVoted}
        >
          <SlArrowUpCircle size={30} color={buttonColor} />
        </button>

        {/* Гарантируем отображение не меньше 0 */}
        <span style={{ margin: '0 10px' }}>{count}</span>

        <button
          className="counter-btn"
          onClick={handleDislike}
          disabled={isLoading || hasVoted}
        >
          <SlArrowDownCircle size={30} color={buttonColor}/>
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

      <div className='Date'>
        {formattedDate}
      </div>
    </div>
  );
};