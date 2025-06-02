import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ButtonText } from './ButtonText/ButtonText';
import { Linktext } from "./Link/Link";
import "./App.css";
import "./ButtonText/buttontext.sass";

export function CreatePost() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error(t('authTokenMissing'));
      }

      const response = await fetch("http://localhost:3000/api/post/create", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('postCreateError'));
      }

      const post = await response.json();
      console.log(t('postCreated'), post);
      navigate('/');
    } catch (err: any) {
      setError(err.message || t('unknownError'));
      console.error(t('postCreateFailed'), err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2 className="form-title">{t('createNewPost')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('title')}:`} href="#" />
            <input
              className="form-input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={t('titlePlaceholder')}
              required
              disabled={isSubmitting}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('Краткое описание')}:`} href="#" />
            <textarea
              className="form-textarea short-description"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder={t('Добавьте краткое описание...')}
              required
              rows={3}
              maxLength={200}
              disabled={isSubmitting}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('description')}:`} href="#" />
            <textarea
              className="form-textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('descriptionPlaceholder')}
              required
              rows={6}
              disabled={isSubmitting}
            />
          </label>
        </div>

        <div className="form-actions">
          <ButtonText 
            className="button button--l button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('creating') : t('createPost')}
          </ButtonText>
        </div>
      </form>
    </div>
  );
}