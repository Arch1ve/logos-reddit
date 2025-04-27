import { Routes, Route } from 'react-router-dom'
import { CommentPage } from './CommentPage'
import React from 'react';
import Link from "./Link/Link.tsx";
import Post from "./Post/Post.tsx";
import logo from "./images/logo.png";
import ButtonText from './ButtonText/ButtonText.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <header className="app-header">
            <div className="header"> 
              <div className="name-div"><a className="name" href="">NAME</a></div>
              <div className='objects-header'>
                <div className="friends-div">
                  <Link text="FRIENDS" href=" " />
                </div>
                <div className="picture-div">
                  <img className="picture" src={logo} alt="logo" />
                </div>
                <div className="log-in-div">
                  <Link text="Login" href=" " />
                </div>
              </div>
            </div>
          </header>
          <div className="app-content">
            <aside className="sidebar">
              <ButtonText text="hello" />
            </aside>
            
            <main className="main">
              <Post text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" name="chilguy" />
              <Post text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" name="chilguy" />
              <Post text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" name="chilguy" />          
            </main>
          </div>
        </div>
      } />

      <Route path='/comments' element={<CommentPage />} />
    </Routes>
  );
}

export default App;