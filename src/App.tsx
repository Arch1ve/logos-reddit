import { useState } from 'react'
import {Post} from "./Post"
import { postsData } from './Post/postsData'

const App = () => {
  const [posts] = useState(postsData)

  return (
    <div className='posts-div'>
      {posts.map((post) => (
        <Post
          title={post.title}
          key={post.postID}
          postID={post.postID}
          shortDescription={post.shortDescription}
          name={post.name}
        />
      ))}
    </div>
  )
}

export default App