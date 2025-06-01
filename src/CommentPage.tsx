import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Post } from "./Post/Post"
import { Comment } from "./Comment/Comment"
import { Linktext } from "./Link/Link"
import './App.css'

interface CommentData {
  _id: string;
  text: string;
}

interface Author {
  name: string;
}

interface PostData {
  _id: string;
  title: string;
  description: string;
  author: Author;
  comments?: CommentData[];
}

export function CommentPage() {
  const { t } = useTranslation()
  const { postId } = useParams<{ postId: string }>()
  
  const [post, setPost] = useState<PostData | null>(null)
  const [comments, setComments] = useState<CommentData[]>([])
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:3000/post/${postId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: PostData = await response.json()
        setPost(data)
        setComments(data.comments || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [postId])

  const handleAddComment = async () => {
    if (!newComment.trim() || !postId) return

    try {
      const response = await fetch(`http://localhost:3000/comment/create/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newComment })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const createdComment: CommentData = await response.json()
      setComments(prev => [...prev, createdComment])
      setNewComment('')
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error adding comment")
    }
  }

  if (isLoading) {
    return <div className="loading">{t('loading')}</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!post) {
    return <div className="error">{t('postNotFound')}</div>
  }

  return (
    <div className="comment-page-container">
      <div className="comment-form-container">
        <Post 
          title={post.title}
          shortDescription={post.description}
          name={post.author?.name || t('unknownAuthor')}
          postID={post._id}
        />

        <div className="comments-section">
          <div className="comments-header">
            <Linktext text={t('answers')} href="/answers" />
          </div>

          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={t('commentPlaceholder')}
              className="comment-textarea"
              rows={4}
            />
            <button 
              onClick={handleAddComment} 
              className="comment-submit-button"
              disabled={!newComment.trim()}
            >
              {t('addComment')}
            </button>
          </div>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <Comment 
                  key={comment._id} 
                  commentID={comment._id} 
                  text={comment.text} 
                />
              ))
            ) : (
              <p className="no-comments">{t('noComments')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}