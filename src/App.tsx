import { useState, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CommentPage } from './CommentPage';
import Link from "./Link/Link";
import Post from "./Post/Post";
import logo from "./images/logo.png";
import ButtonText from './ButtonText/ButtonText';
import { postsData } from './Post/postsData';

const App = () => {
  const [posts] = useState(postsData);

  // Генерация уникальных ID для постов
  const postIDs = useMemo(() => {
    let id = 0;
    return postsData.map(() => id++);
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container">
          <header className="header-main">
            <div className="header-container">
              <div className="brand-container">
                <a className="brand-link" href="/">NAME</a>
              </div>
              <div className='header-navigation'>
                <div className="nav-item">
                  <Link text="FRIENDS" href="/friends" />
                </div>
                <div className="brand-logo">
                  <img className="logo-image" src={logo} alt="logo" />
                </div>
                <div className="auth-section">
                  <Link text="Login" href="/login" />
                </div>
              </div>
            </div>
          </header>

          <div className="content-wrapper">
            <aside className="sidebar-primary">
              
              <ButtonText className="button button--l">Menu Item 2</ButtonText>
            </aside>

            <main className="content-main">
              <div className='post-button'></div>
              <div className='posts-div'>
                {posts.map((post, index) => (
                <Post
                  key={postIDs[index]}
                  postID={postIDs[index]}
                  text={post.text}
                  name={post.name}
                />
                ))}
              </div>
              <div className='post-button'><ButtonText className='button button--l'>New Post</ButtonText></div>
            </main>
          </div>
        </div>
      }/>
      <Route path='/comments/:postId' element={<CommentPage />} />
    </Routes>
  );
}

export default App;