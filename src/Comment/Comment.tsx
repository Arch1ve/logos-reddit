import "./comment.css";
import React, { useState, useEffect } from 'react';
import { SlArrowUpCircle, SlArrowDownCircle } from "react-icons/sl";

interface PostProps {
  text: string;
  commentID: string;
  author: string;
  totallikes: number;
}

export const Comment: React.FC<PostProps> = ({ text, commentID, author, totallikes }) => {
  const [count, setCount] = useState(totallikes);
  const [isLoading, setIsLoading] = useState({ like: false, dislike: false });
  const [hasVoted, setHasVoted] = useState(false); // Состояние для отслеживания голоса

  useEffect(() => {
    setCount(totallikes);
  }, [totallikes]);

  const getAuthToken = () => {
    return localStorage.getItem('token') || '';
  };

  const handleVote = async (type: 'like' | 'dislike') => {
    if (hasVoted) return; // Блокировка при наличии голоса
    
    setIsLoading(prev => ({ ...prev, [type]: true }));
    
    try {
      const token = getAuthToken();
      const endpoint = type === 'like' ? 'like' : 'dislike';
      
      const response = await fetch(`http://localhost:3000/api/comment/${commentID}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Ошибка запроса');
      
      const data = await response.json();
      setCount(data.totallikes ?? (type === 'like' ? totallikes + 1 : totallikes - 1));
      setHasVoted(true); // Блокируем дальнейшие голоса
    } catch (error) {
      console.error(`Ошибка ${type === 'like' ? 'лайка' : 'дизлайка'}:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleLike = () => handleVote('like');
  const handleDislike = () => handleVote('dislike');

  return (
    <div className='comment'>
      <div className='comment-name-div'> 
        <p className='comment-name'>{author}</p>
      </div>
      <div className='comment-text-div'> 
        <p className='comment-text'>{text}</p>
      </div>
      <div className="counter-container">
        <button 
          className="counter-btn" 
          onClick={handleLike}
          disabled={isLoading.like || hasVoted} // Блокировка при голосе
          aria-label="Лайк"
        >
          <SlArrowUpCircle 
            size={30}
            color={isLoading.like || hasVoted ? '#ccc' : '#3bd1ff'}
          />
        </button>
        
        <span className='count' id="counter">{count}</span>
        
        <button 
          className="counter-btn" 
          onClick={handleDislike}
          disabled={isLoading.dislike || hasVoted} // Блокировка при голосе
          aria-label="Дизлайк"
        >
          <SlArrowDownCircle 
            size={30}
            color={isLoading.dislike || hasVoted ? '#ccc' : '#3bd1ff'}
          />
        </button>
      </div>
    </div>
  );
};