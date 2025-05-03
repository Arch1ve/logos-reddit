import { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import Link from "./Link/Link";
import Post from "./Post/Post";
import logo from "./images/logo.png";
import { postsData } from './Post/postsData';
import Comment from "./Comment/Comment";
import ButtonText from './ButtonText/ButtonText';

interface CommentData {
  commentID: number;
  text: string;
}

export function CommentPage() {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const commentIdCounter = useRef(0);

  // Получаем пост по индексу (postId теперь соответствует индексу массива)
  const postIndex = Number(postId);
  const post = postsData[postIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      commentID: commentIdCounter.current++,
      text: newComment
    };

    setComments(prev => [...prev, newCommentObj]);
    setNewComment('');
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="app-container">
      <header className="header-main">
        <div className="header-container">
          <div className="brand-container">
            <a className="brand-link" href="/">NAME</a>
          </div>
          <div className='header-navigation'>
            <div className="nav-item">
              <Link text="FRIENDS" href="/friends" />
            </div>
            <div className="brand-logo">
              <img className="logo-image" src={logo} alt="logo" />
            </div>
            <div className="auth-section">
              <Link text="Login" href="/login" />
            </div>
          </div>
        </div>
      </header>
      
      <div className="content-wrapper">
        <aside className="sidebar-primary"></aside>
        <main className="posts-div">
          <Post 
            text={post.text} 
            name={post.name}
            postID={postIndex} // Используем индекс как ID
          />
          
          <div className="comments-section">
            <Link text="Answers:" href="/answers" />
            
            <form onSubmit={handleSubmit} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
              <ButtonText className='button button--m'>Add Comment</ButtonText>
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
        </main>
      </div>
    </div>
  );
}