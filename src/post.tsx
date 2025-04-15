import React from 'react';

interface PostProps {
  text: string;
  name: string;
}

const Post: React.FC<PostProps> = ({ text, name }) => {
  return (
    <div className='post'>
        <div className='post-name-div'> 
           <p className='post-name'>{name}</p>
        </div>
        <div className='post-text-div'> 
           <p className='post-text'>{text}</p>
        </div>
    </div>
  );
};

export default Post;