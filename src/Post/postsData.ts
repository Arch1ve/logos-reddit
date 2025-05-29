export interface PostData {
  postID: number;
  title: string;
  shortDescription: string;
  text: string;
  name: string;
}

const savedPosts = localStorage.getItem('posts');
export let postsData: PostData[] = savedPosts ? JSON.parse(savedPosts) : [
  {
    postID: 1,
    title: "Первый пост",
    shortDescription: "Краткое описание первого поста",
    text: "duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en",
    name: "chilguy"
  },
  {
    postID: 2,
    title: "Второй пост",
    shortDescription: "Краткое описание второго поста",
    text: "Второй пост с интересным контентом",
    name: "user42"
  },
  {
    postID: 3,
    title: "Третий пост",
    shortDescription: "Краткое описание третьего поста",
    text: "Еще один пример текста для поста",
    name: "test_user"
  }
];