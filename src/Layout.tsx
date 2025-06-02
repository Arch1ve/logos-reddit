import { useTranslation } from 'react-i18next';
import { Outlet, Link } from 'react-router-dom';
import logo from "./images/logo.png";
import Title from "./images/Title.png";
import "./App.css";
import { Linktext } from "./Link/Link";
import "./ButtonText/buttontext.sass";
import { ButtonText } from './ButtonText/ButtonText';

export const Layout = () => {
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <header className="header-main">
        <div className="header-container">
          <div className="brand-container">
            <Link className="brand-link" to="/" aria-label={t('homePage')}>
              <img className='title-img' src={Title} alt={t('siteTitle')} />
            </Link>
          </div>
          
          <nav className='header-navigation' aria-label={t('mainNavigation')}>
            <div className="nav-item">
              <Linktext text={t('friends')} href="/friends" />
            </div>
            
            <div className="brand-logo">
              <img className="logo-image" src={logo} alt={t('siteLogo')} />
            </div>
            
            <div className="auth-section">
              <Linktext text={t('login')} href="/login" />
            </div>
          </nav>
        </div>
      </header>

      <div className="mobile-button-container">
        <ButtonText 
          className="button button--l button-primary"
          as={Link}
          to="/new-post"
          aria-label={t('createNewPost')}
        >
          {t('newPost')}
        </ButtonText>
      </div>

      <div className="content-wrapper">
        <aside className="sidebar-primary">
          <ButtonText 
            className="button button--l button-primary"
            as={Link}
            to="/new-post"
            aria-label={t('createNewPost')}
          >
            {t('newPost')}
          </ButtonText>
        </aside>
        
        <main className="content-main" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}