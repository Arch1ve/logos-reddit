import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from "./images/logo.png"
import Title from "./images/Title.png"
import "./App.css"
import Linktext from "./Link/Link.tsx"
import "./ButtonText/buttontext.sass"
import ButtonText from './ButtonText/ButtonText.tsx'

const Layout = () => {
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
              <Linktext text="FRIENDS" href="/friends" />
            </div>
            <div className="brand-logo">
              <img className="logo-image" src={logo} alt="logo" />
            </div>
            <div className="auth-section">
              <Linktext text="Login" href="/friends" />
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
          New Post
        </ButtonText>
      </div>

      <div className="content-wrapper">
        <aside className="sidebar-primary">
          <ButtonText 
            className="button button--l"
            as={Link}
            to="/new-post"
          >
            New Post
          </ButtonText>
        </aside>
        <main className="content-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout