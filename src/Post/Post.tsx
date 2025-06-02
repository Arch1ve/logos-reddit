import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./post.css"
import { SlArrowUpCircle, SlArrowDownCircle, SlBubble } from "react-icons/sl";

interface PostProps {
  postID: string;
  title: string;
  shortDescription: string;
  fullDescription: string; 
  name: string;
  totallikes: number; 
  createdAt: string; // Ожидаем строку в формате ISO 8601
}

// Функция для форматирования даты в удобочитаемый вид
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  // Проверка на валидность даты
  if (isNaN(date.getTime())) {
    return dateString; // Возвращаем оригинал если дата невалидна
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
  const [count, setCount] = useState(totallikes);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    if (hasVoted) return;
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
      setHasVoted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    if (hasVoted) return;
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
      setHasVoted(true);
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

  // Определяем цвет для кнопок
  const buttonColor = (isLoading || hasVoted) ? '#ccc' : '#3bd1ff';

  // Форматируем дату создания
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

        <span style={{ margin: '0 10px' }}>{count}</span>

        <button
          className="counter-btn"
          onClick={handleDislike}
          disabled={isLoading || hasVoted}
        >
          <SlArrowDownCircle size={30} color={buttonColor} />
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

      <div 
        style={{
          fontSize: '12px',
          color: 'gray',
          marginTop: '5px',
          marginLeft: "10px",
          textAlign: 'left'
        }}
      >
        {formattedDate}
      </div>
    </div>
  );
};