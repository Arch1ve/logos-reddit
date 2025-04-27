import React from 'react';
import Link from "./Link/Link.tsx";
import Post from "./Post/Post.tsx";
import logo from "./images/logo.png";

export function CommentPage() { 
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header">
          <div className="name-div">
            <a className="name" href="">NAME</a> 
          </div>
          <div className='objects-header'>
            <div className="friends-div">
              <Link text="FRIENDS" href="" />
            </div>
            <div className="picture-div">
                <img className="picture" src={logo} alt="logo" />
              </div>
            <div className="log-in-div">
              <Link text="Login" href="" /> 
            </div>
          </div>
        </div>
      </header>
      <div className="app-content">
        <aside className="sidebar"></aside>
        <main className="main">
          <Post 
            text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" 
            name="chilguy" 
          />
          <div className="comments-div">
            <Link text="Answers:" href="#comments" /> {/* Якорная ссылка */}
          </div>
        </main>
      </div>
    </div>
  );
}