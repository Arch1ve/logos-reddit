import { useTranslation } from 'react-i18next';
import {Outlet, Link} from 'react-router-dom';
import logo from "./images/logo.png";
import Title from "./images/Title.png";
import "./App.css";
import { Linktext } from "./Link";
import "./ButtonText/buttontext.sass";
import { ButtonText } from './ButtonText';
import {useEffect, useState} from "react";
import {API_URL} from "./api-config.ts";
import { SlLogout} from "react-icons/sl";

const getAuthToken = () => {
  return localStorage.getItem('token') || '';
};

export const Layout = () => {
  const { t } = useTranslation();

  const [user, setUser] = useState<{username: string} | null>(null)

  const authToken = getAuthToken();

  useEffect(() => {
    if (authToken) {
      fetch(API_URL + "/user/me", {headers: {Authorization: `Bearer ${authToken}`}})
        .then(res => res.json())
        .then(res => setUser(res))
    }
  }, [])

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
            <div className="nav-item" style={{visibility: 'hidden'}}>
              <Linktext text={t('friends')} href="/friends" />
            </div>
            
            <div className="brand-logo">
              <img className="logo-image" src={logo} alt={t('siteLogo')} />
            </div>
            
            <div className="auth-section">
              {authToken ?
                <div className={"profile-badge"}>
                  <div className={"badge-username"}>{user?.username}</div>
                  <button
                    className="counter-btn"
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.reload();
                    }}
                  >
                    <SlLogout size={30} color={'white'}/>
                  </button>
                </div> : <Linktext text={t('login')} href="/login"/>
              }
            </div>
          </nav>
        </div>
      </header>

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