import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from "./images/logo.png";
import Title from "./images/Title.png";
import "./App.css";
import Linktext from "./Link/Link";
import "./ButtonText/buttontext.sass";
import ButtonText from './ButtonText/ButtonText';

const Layout = () => {
  const { t, i18n } = useTranslation();

  //TODO: зачем вообще делать 2 языка если пользователи используют только русский
  //TODO: и даже если так, то почему русского нет?)
  // в общем рекомендую от переключения языков избавиться
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  //TODO: если  уж написано логин, то должна окрываться страница с логином, а не с регистрацией
  // из этого исходит что тебе ещё и страничку с логином надо сделать
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
                  onClick={() => changeLanguage('en')}
                  className={i18n.language === 'en' ? 'active-lang' : ''}
                >
                  EN
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
          as={Link}
          to="/new-post"
        >
          {t('newPost')}
        </ButtonText>
      </div>

      <div className="content-wrapper">
        <aside className="sidebar-primary">
          <ButtonText 
            className="button button--l"
            as={Link}
            to="/new-post"
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