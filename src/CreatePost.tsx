import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { postsData, PostData } from "./Post/postsData";
import Linktext from "./Link/Link";
import "./App.css";
import "./ButtonText/buttontext.sass";
import ButtonText from './ButtonText/ButtonText';

export function CreatePost() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: PostData = {
      postID: Date.now(),
      title,
      text: description,
      name: t('currentUser')
    };
    postsData.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(postsData));
    navigate('/');
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2 className="form-title">{t('createNewPost')}</h2>
        
        <div className="form-group">
          <label className="input-label">
            <Linktext text={t('title') + ":"} href="/friends" />
            <input
              className="form-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={t('description') + ":"} href="/friends" />
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('descriptionPlaceholder')}
              required
              rows={6}
            />
          </label>
        </div>

        <div className="form-actions">
          <ButtonText 
            className="button button--l button-primary"
            type="submit"
          >
            {t('createPost')}
          </ButtonText>
        </div>
      </form>
    </div>
  );
};