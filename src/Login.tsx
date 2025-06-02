import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Linktext } from "./Link/Link";
import "./App.css";
import { ButtonText } from './ButtonText/ButtonText';

export function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t('loginFailed'));
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');

    } catch (err: any) {
      setError(err.message || t('loginError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2 className="form-title">{t('login')}</h2>
        
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
              autoComplete="current-password"
            />
          </label>
        </div>

        <div className="form-actions">
          <ButtonText 
            className="button button--l button-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('loggingIn') : t('loginButton')}
          </ButtonText>
        </div>

        <div className="login-link">
          <span>{t('dontHaveAccount')} </span>
          <Link to="/register">{t('register')}</Link>
        </div>
      </form>
    </div>
  );
}