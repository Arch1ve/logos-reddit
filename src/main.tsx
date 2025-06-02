import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./normalize.css";
import './App.css';
import "./Post/post.css";
import  { App }  from './App';
import { CommentPage } from './CommentPage';
import  { Layout } from './Layout';
import { CreatePost } from './CreatePost';
import { CreateUser } from './CreateUser';
import { Login } from './Login'; // Импортируем новый компонент
import "./i18n";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />} />
          <Route path="/comments/:postId" element={<CommentPage />} />
          <Route path="/new-post" element={<CreatePost />} />
          <Route path="/register" element={<CreateUser />} /> {/* Измененный путь */}
          <Route path="/login" element={<Login />} /> {/* Новый маршрут */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);