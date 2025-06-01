import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Linktext from "./Link/Link";
import "./App.css";
import ButtonText from './ButtonText/ButtonText';

export function CreateUser() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Здесь логика регистрации
    console.log({ email, password, username });
    navigate('/');
  };

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2 className="form-title">{t('createAccount')}</h2>
        
        <div className="form-group">
          <label className="input-label">
            <Linktext text={t('email') + ":"} href="/friends" />
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={t('password') + ":"} href="/friends" />
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('passwordPlaceholder')}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label className="input-label">
            <Linktext text={t('username') + ":"} href="/friends" />
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('usernamePlaceholder')}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <ButtonText 
            className="button button--l button-primary"
            type="submit"
          >
            {t('register')}
          </ButtonText>
        </div>
      </form>
    </div>
  );
};