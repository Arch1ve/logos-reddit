import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Post from "./Post/Post"
import { postsData } from './Post/postsData'
import Comment from "./Comment/Comment"
import ButtonText from './ButtonText/ButtonText'
import Linktext from "./Link/Link" 

interface CommentData {
  commentID: number
  text: string
}

export function CommentPage() {
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
    return <div>Post not found</div>
  }

  return (
    <div className="content-main">
      <div className='posts-div'>
        <Post 
          title={post.title}
          text={post.text} 
          name={post.name}
          postID={postIndex}
        />
        
        <div className="comments-section">
          <Linktext text="Answers:" href="/answers" />
          
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <ButtonText className='button button--l'>Add Comment</ButtonText>
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