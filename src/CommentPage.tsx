import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Post } from "./Post/Post"
import { Comment } from "./Comment/Comment"
import { Linktext } from "./Link/Link"
import './App.css'

interface Author {
  _id: string;
  username: string;
}

interface CommentData {
  _id: string;
  description: string;
  author: Author;
  createdAt: string;
  totallikes: number;
}

interface PostData {
  _id: string;
  title: string;
  description: string;
  author: Author;
  comments: CommentData[];
  totallikes: number;
  createdAt: string;
}

export function CommentPage() {
  const { t } = useTranslation()
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')

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
        console.log("Fetched post data:", data);
        
        const adaptedComments = data.comments.map((comment: any) => {
          if (typeof comment.author === 'string') {
            return {
              ...comment,
              author: {
                _id: 'unknown-id',
                username: comment.author
              }
            };
          }
          return comment;
        });
        
        setPost({
          ...data,
          comments: adaptedComments
        });
      } catch (err: any) {
        setError(err.message || 'Error loading post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !postId) return

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/comment/create/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ description: newComment }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to create comment');
      }

      const createdComment = await response.json()
      console.log("Created comment:", createdComment); 
      
      let adaptedComment = createdComment;
      if (typeof createdComment.author === 'string') {
        adaptedComment = {
          ...createdComment,
          author: {
            _id: 'unknown-id',
            username: createdComment.author
          }
        };
      }

      if (post) {
        setPost({
          ...post,
          comments: [...post.comments, adaptedComment]
        })
      }
      
      setNewComment('')
    } catch (err: any) {
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
    return <div className="error-container">{t('postNotFound')}</div>
  }

  return (
    <div className="comment-page-container">
      <div className="comment-form-container">
        <Post 
          title={post.title}
          shortDescription=""
          name={post.author.username}
          postID={post._id}
          fullDescription={post.description}
          totallikes={post.totallikes}
          createdAt = {post.createdAt}
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
                required
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
                author={comment.author.username}
                totallikes={comment.totallikes}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}