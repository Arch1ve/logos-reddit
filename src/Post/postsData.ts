export interface PostData {
  postID: number;
  title: string;
  text: string;
  name: string;
}

const savedPosts = localStorage.getItem('posts');
export let postsData: PostData[] = savedPosts ? JSON.parse(savedPosts) : [
  {
    title: "Первый пост",
    text: "duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en",
    name: "chilguy"
  },
  {
    title: "Второй пост",
    text: "Второй пост с интересным контентом",
    name: "user42"
  },
  {
    text: "duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en",
    name: "chilguy"
  },
  {
    text: "Второй пост с интересным контентом",
    name: "user42"
  },
  {
    text: "Еще один пример текста для поста",
    name: "test_user"
  }

];