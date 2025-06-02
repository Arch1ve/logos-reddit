import { useState, useEffect } from 'react'
import { Post } from "./Post/Post.tsx"

interface IPost {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  author: { 
    username: string;
  };
  totallikes: number;
  createdAt: string;
}

export const App = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<'newest' | 'oldest' | 'most_liked' | 'least_liked'>('newest');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/posts");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log(err)
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'most_liked':
        return b.totallikes - a.totallikes;
      case 'least_liked':
        return a.totallikes - b.totallikes;
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className='loading'>Loading posts...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className='content-container'>
      <div className='filter' style={{ 
        margin: '20px',
        display: 'flex',
        justifyContent: 'flex-start'
      }}>

        <select 
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          style={{
            height: "50px", 
            padding: '10px 15px',
            borderRadius: '20px',
            border: '2px solid #3bd1ff',
            backgroundColor: '#f8f8f8',
            fontSize: '16px',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            fontWeight: 'bold'
          }}
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="most_liked">Сначала популярные</option>
          <option value="least_liked">Сначала непопулярные</option>
        </select>
      </div>
      <div className='posts-div'>
        {sortedPosts.map((post) => (
          <Post
            key={post._id}
            postID={post._id}
            title={post.title}
            shortDescription={post.shortDescription}
            fullDescription=""
            name={post.author?.username} 
            totallikes={post.totallikes}
            createdAt = {post.createdAt}
          />
        ))}
      </div>
      <div className='space' ></div>
    </div>
  );
};