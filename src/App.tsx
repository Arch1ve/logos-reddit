import { useState, useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import Post from "./Post/Post.tsx"
import { postsData } from './Post/postsData'

const App = () => {
  const [posts] = useState(postsData)
  const postIDs = useMemo(() => postsData.map((_, i) => i), [])

  return (
    <div className='posts-div'>
      {posts.map((post, index) => (
        <Post
          title={post.title}
          key={postIDs[index]}
          postID={postIDs[index]}
          text={post.text}
          name={post.name}
        />
      ))}
    </div>
  )
}

export default App