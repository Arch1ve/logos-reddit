import React from 'react';
import Link from "./Link/Link.tsx";
import Post from "./Post/Post.tsx";
import logo from "./images/logo.png";

export function CommentPage() { 
  return (
    <div className="app-container">
      <header className="header-main">
        <div className="header-container">
          <div className="brand-container">
            <a className="brand-link" href="">NAME</a> 
          </div>
          <div className='header-navigation'>
            <div className="nav-item">
              <Link text="FRIENDS" href="" />
            </div>
            <div className="brand-logo">
                <img className="logo-image" src={logo} alt="logo" />
              </div>
            <div className="auth-section">
              <Link text="Login" href="" /> 
            </div>
          </div>
        </div>
      </header>
      <div className="content-wrapper">
        <aside className="sidebar-primary"></aside>
        <main className="content-main">
          <Post 
            text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" 
            name="chilguy" 
          />
          <div className="comments-section">
            <Link text="Answers:" href="#comments" />
          </div>
        </main>
      </div>
    </div>
  );
}