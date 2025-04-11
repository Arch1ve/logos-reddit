function App() {

  const testFunc = () => {
    const randInt = Math.random().toFixed(2)
    return <div>Random content {randInt}</div>
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header"> 
          <div className="name-div"><a className="name" href="https://developer.mozilla.org/ru/"> NAME </a></div>
          <div className="home-div"><a className="home" href="https://developer.mozilla.org/ru/"> HOME </a></div>
          <div className="friends-div"><a className="friends" href="https://developer.mozilla.org/ru/"> FRIENDS </a></div>
          <div className="picture-div"><img className="picture" src="https://breeland.wordpress.com/wp-content/uploads/2021/05/wp7163696-1.png?w=1024" alt="sova"></img></div>
          <div className="log-in-div"><a className="log-in" href="https://developer.mozilla.org/ru/"> Login </a></div>
        </div>
        
      </header>
      <div className="app-content">
        <aside className="sidebar"></aside>
        <main className="main">{testFunc()}</main>
      </div>
    </div>
  )
}

export default App
