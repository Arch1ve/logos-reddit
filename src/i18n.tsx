// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      friends: 'FRIENDS',
      login: 'Login',
      newPost: 'New Post',
      answers: 'Answers:',
      commentPlaceholder: 'Write a comment...',
      addComment: 'Add Comment',
      postNotFound: 'Post not found',
      createNewPost: 'Create New Post',
      title: 'Title',
      titlePlaceholder: 'Enter post title...',
      description: 'Description',
      descriptionPlaceholder: 'Write your post content...',
      createPost: 'Publish Post',
      currentUser: 'Current User',
      welcome: 'Welcome!',
      createAccount: 'Create Account',
      email: 'Email',
      password: 'Password',
      username: 'Name',
      emailPlaceholder: 'Enter your email...',
      passwordPlaceholder: 'Enter password...',
      usernamePlaceholder: 'Choose username...',
      register: 'Register'
    }
  },
  uk: {
    translation: {
      friends: 'ДРУЗІ',
      login: 'Увійти',
      newPost: 'Новий пост',
      answers: 'Відповіді:',
      commentPlaceholder: 'Написати коментар...',
      addComment: 'Додати коментар',
      postNotFound: 'Пост не знайдено',
      createNewPost: 'Створити новий пост',
      title: 'Заголовок',
      titlePlaceholder: 'Введіть заголовок...',
      description: 'Опис',
      descriptionPlaceholder: 'Напишіть зміст поста...',
      createPost: 'Опублікувати',
      currentUser: 'Поточний користувач',
      welcome: 'Ласкаво просимо!',
      createAccount: 'Створити акаунт',
      email: 'Емейл',
      password: 'Пароль',
      username: "Ім'я",
      emailPlaceholder: 'Введіть емейл...',
      passwordPlaceholder: 'Введіть пароль...',
      usernamePlaceholder: 'Оберіть імʼя...',
      register: 'Зареєструватися'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;