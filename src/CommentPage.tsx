// CommentPage.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Post } from "./Post/Post"
import { Comment } from "./Comment/Comment"
import { Linktext } from "./Link/Link"
import './App.css'

interface CommentData {
  _id: string;
  text: string;
}

interface PostData {
  _id: string;
  title: string;
  text: string;
  name: string;
  comments: CommentData[];
}

export function CommentPage() {
  const { t } = useTranslation()
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')

  // Загрузка поста и комментариев
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/post/${postId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/not-found');
          }
          throw new Error('Failed to fetch post');
        }
        
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message || 'Error loading post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  // Создание нового комментария
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !postId) return

    try {
      // Получаем токен из localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/comment/create/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Добавляем токен в заголовок Authorization
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description: newComment }),
      })

      if (!response.ok) {
        // Обработка ошибки 401 (Unauthorized)
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to create comment');
      }

      const createdComment = await response.json()
      
      // Обновляем состояние, добавляя новый комментарий
      if (post) {
        setPost({
          ...post,
          comments: [...post.comments, createdComment]
        })
      }
      
      setNewComment('')
    } catch (err) {
      console.error('Error creating comment:', err)
    }
  }

  if (loading) {
    return <div className="loading-container">{t('loading')}</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  if (!post) {
    return <div>{t('postNotFound')}</div>
  }

  return (
    <div className="comment-page-container">
      <div className="comment-form-container">
        <Post 
          title={post.title}
          shortDescription={post.text}
          name={post.name}
          postID={post._id}
        />
        
        <div className="comments-section">
          <div className="comments-header">
            <Linktext text={t('answers')} href="/answers" />
          </div>
          
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="form-group">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={t('commentPlaceholder')}
                className="comment-textarea"
                rows={4}
              />
              <button type="submit" className="comment-submit-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </div>
          </form>

          <div className="comments-list">
            {post.comments.map(comment => (
              <Comment
                key={comment._id}
                commentID={comment._id}
                text={comment.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}