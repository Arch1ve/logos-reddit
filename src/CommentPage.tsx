import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Post from "./Post/Post"
import { postsData } from './Post/postsData'
import Comment from "./Comment/Comment"
import Linktext from "./Link/Link"
import './App.css'

interface CommentData {
  commentID: number
  text: string
}

export function CommentPage() {
  const { t } = useTranslation()
  const { postId } = useParams<{ postId: string }>()
  const [comments, setComments] = useState<CommentData[]>([])
  const [newComment, setNewComment] = useState('')
  const commentIdCounter = useRef(0)

  const postIndex = Number(postId)
  const post = postsData[postIndex]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      commentID: commentIdCounter.current++,
      text: newComment
    }

    setComments(prev => [...prev, newCommentObj])
    setNewComment('')
  }

  if (!post) {
    return <div>{t('postNotFound')}</div>
  }

  //TODO: не понятно зачем обводка у контейнера, но если хочешь - оставь
  return (
    <div className="comment-page-container">
      <div className="comment-form-container">
        <Post 
          title={post.title}
          text={post.text} 
          name={post.name}
          postID={postIndex}
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
            {comments.map(comment => (
              <Comment
                key={comment.commentID}
                commentID={comment.commentID}
                text={comment.text}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}