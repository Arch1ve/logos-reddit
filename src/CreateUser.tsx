import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linktext } from "./Link/Link";
import "./App.css";
import { ButtonText } from './ButtonText/ButtonText';

export function CreateUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Регистрация пользователя
      const registerResponse = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || t('registrationFailed'));
      }

      // Автоматический вход после успешной регистрации
      const loginResponse = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!loginResponse.ok) {
        throw new Error(t('autoLoginFailed'));
      }

      const { token } = await loginResponse.json();
      localStorage.setItem('token', token);
      navigate('/'); 

    } catch (err: any) {
      setError(err.message || t('registrationError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2 className="form-title">{t('createAccount')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('email')}:`} href="#" />
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('emailPlaceholder')}
              required
              disabled={isSubmitting}
              autoComplete="email"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('password')}:`} href="#" />
            <input
              className="form-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('passwordPlaceholder')}
              required
              disabled={isSubmitting}
              autoComplete="new-password"
              minLength={6}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={`${t('username')}:`} href="#" />
            <input
              className="form-input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('usernamePlaceholder')}
              required
              disabled={isSubmitting}
              autoComplete="username"
            />
          </label>
        </div>

        <div className="form-actions">
          <ButtonText 
            className="button button--l button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('registering') : t('register')}
          </ButtonText>
        </div>
      </form>
    </div>
  );
}