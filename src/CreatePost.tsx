import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postsData, PostData } from "./Post/postsData"
import Linktext from "./Link/Link.tsx"
import "./App.css"
import "./ButtonText/buttontext.sass"
import ButtonText from './ButtonText/ButtonText.tsx'


export function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newPost: PostData = {
        postID: Date.now(),
        title,
        text: description,
        name: "Current User"
      };
      postsData.unshift(newPost);
      localStorage.setItem('posts', JSON.stringify(postsData));
      navigate('/');
    };
  
    return (
      <div className="new-post-container">
        <form onSubmit={handleSubmit} className="post-form">
          <h2>Create New Post</h2>
          <div className="form-group">
            <Linktext text="Title:" href="/friends" />
            <input
              className="comment-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <Linktext text="Deser:" href="/friends" />
            <textarea
              className="comment-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
          <ButtonText className="button button--l">Create Post</ButtonText>
        </form>
      </div>
    );
  };
