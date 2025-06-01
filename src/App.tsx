import { useState, useEffect } from 'react'
import { Post } from "./Post/Post.tsx"

interface IPost {
  postID: string;
  title: string;
  shortDescription: string;
  author: string;
}

export const App = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className='loading'>Loading posts...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='posts-div'>
      {posts.map((post) => (
        <Post
          title={post.title}
          key={post.postID}
          postID={post.postID}
          shortDescription={post.shortDescription}
          name={post.author} 
        />
      ))}
    </div>
  );
};