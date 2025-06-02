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
  // Гарантируем начальное значение не меньше 0
  const [count, setCount] = useState(Math.max(0, totallikes));
  const [isLoading, setIsLoading] = useState({ like: false, dislike: false });
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Обновляем состояние с защитой от отрицательных значений
    setCount(prev => Math.max(0, totallikes));
  }, [totallikes]);

  const getAuthToken = () => {
    return localStorage.getItem('token') || '';
  };

  const handleVote = async (type: 'like' | 'dislike') => {
    if (hasVoted) return;
    
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
      
      // Гарантируем новое значение не меньше 0
      const newLikes = data.totallikes ?? (type === 'like' ? count + 1 : count - 1);
      setCount(Math.max(0, newLikes));
      setHasVoted(true);
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
          disabled={isLoading.like || hasVoted}
          aria-label="Лайк"
        >
          <SlArrowUpCircle 
            size={30}
            color={isLoading.like || hasVoted ? '#ccc' : '#3bd1ff'}
          />
        </button>
        
        {/* Отображаем счетчик, гарантированно не меньше 0 */}
        <span className='count' id="counter">{count}</span>
        
        <button 
          className="counter-btn" 
          onClick={handleDislike}
          disabled={isLoading.dislike || hasVoted}
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