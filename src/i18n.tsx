// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      friends: 'Друзья',
      login: 'Регистрация',
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
      register: 'Зареєструватися',
      registerAlert: "Будь ласка, зареєструйтесь або увійдіть, щоб створити пост",
      shortDescriptionPlaceholder: "Введите краткое описание"
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