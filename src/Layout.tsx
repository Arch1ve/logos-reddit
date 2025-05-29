import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import logo from "./images/logo.png";
import Title from "./images/Title.png";
import "./App.css";
import Linktext from "./Link/Link";
import "./ButtonText/buttontext.sass";
import ButtonText from './ButtonText/ButtonText';

const Layout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleNewPostClick = () => {
    if (!isAuthenticated) {
      alert(t('registerAlert', {
        link1: t('register'),
        link2: t('login')
      }));
      return;
    }
    navigate('/new-post');
  };

  return (
    <div className="app-container">
      <header className="header-main">
        <div className="header-container">
          <div className="brand-container">
            <Link className="brand-link" to="/">
              <img className='title-img' src={Title} alt="title" />
            </Link>
          </div>
          <div className='header-navigation'>
            <div className="nav-item">
              <Linktext text={t('friends')} href="/friends" />
            </div>
            <div className="brand-logo">
              <img className="logo-image" src={logo} alt="logo" />
            </div>
            <div className="auth-section">
              <Linktext text={t('login')} href="/login" />
              <div className="language-switcher">
                <button 
                  onClick={() => changeLanguage('ru')}
                  className={i18n.language === 'ru' ? 'active-lang' : ''}
                >
                  RU
                </button>
                <button 
                  onClick={() => changeLanguage('uk')}
                  className={i18n.language === 'uk' ? 'active-lang' : ''}
                >
                  UA
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-button-container">
        <ButtonText 
          className="button button--l"
          onClick={handleNewPostClick}
        >
          {t('newPost')}
        </ButtonText>
      </div>

      <div className="content-wrapper">
        <aside className="sidebar-primary">
          <ButtonText 
            className="button button--l"
            onClick={handleNewPostClick}
          >
            {t('newPost')}
          </ButtonText>
        </aside>
        <main className="content-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;