import React from 'react'; 
import Link from './Link';
import Post from './Post';

export function CommentPage() { 
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header">
          <div className="name-div">
            <a className="name" href="">NAME</a> 
          </div>
          <div className='objects-header'>
            <div className="friends-div">
              <Link text="FRIENDS" href="" />
            </div>
            <div className="picture-div">
              <img 
                className="picture" 
                src="https://sun9-21.userapi.com/s/v1/ig2/zSx-VG34YWZVNGjOtMIiKgpISGSWsWKazGblqgA_PsO8oQTSIFkZ4oGl6CJeu7lvfHnfJa4PWvcr1f0m4NRCaoXy.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1024x1024&from=bu&u=NFUR0_qJPBI4HxKLaoo3Ria_2MjxUgfHxL_m4yOiFU4&cs=807x807" 
                alt="sova"
              />
            </div>
            <div className="log-in-div">
              <Link text="Login" href="" /> 
            </div>
          </div>
        </div>
      </header>
      <div className="app-content">
        <aside className="sidebar"></aside>
        <main className="main">
          <Post 
            text="duhfeboaenrdzfbzdbfdzfbzbfzdbdzfbdzfbdzfbdzfbdfbbo;aebnonbo;en" 
            name="chilguy" 
          />
          <div className="comments-div">
            <Link text="Answers:" href="#comments" /> {/* Якорная ссылка */}
          </div>
        </main>
      </div>
    </div>
  );
}