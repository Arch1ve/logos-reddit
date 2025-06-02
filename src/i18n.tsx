// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      friends: 'Друзья',
      newPost: 'Новый пост',
      answers: 'Ответы:',
      commentPlaceholder: 'Напишите комментарий...',
      addComment: 'Добавить комментарий',
      postNotFound: 'Пост не найден',
      createNewPost: 'Создать пост',
      title: 'Заголовок',
      titlePlaceholder: 'Добавьте заголовок поста...',
      description: 'Полное описание',
      descriptionPlaceholder: 'Добавьте описание поста...',
      createPost: 'Опубликовать пост',
      currentUser: 'Current User',
      welcome: 'Добро пожаловать!',
      createAccount: 'Создание аккаунта',
      email: 'Email',
      password: 'Пороль',
      username: 'Имя',
      emailPlaceholder: 'Добавьте почту...',
      passwordPlaceholder: 'Добавьте пороль...',
      usernamePlaceholder: 'Выберете имя...',
      register: 'Регистрация',
      registerAlert: "Пожалуйста, зарегистрируйтесь или войдите, чтобы создать пост",
      login: "Войти",
      loginButton: "Войти",
      loginFailed: "Ошибка входа",
      loginError: "Ошибка при входе",
      loggingIn: "Вход...",
      alreadyHaveAccount: "Уже есть аккаунт?",
      dontHaveAccount: "Нет аккаунта?",
    }
  },

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