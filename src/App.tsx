function App() {

  const testFunc = () => {
    const randInt = Math.random().toFixed(2)
    return <div>Random content {randInt}</div>
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="name">NAME</h1>
      </header>
      <div className="app-content">
        <aside className="sidebar"></aside>
        <main className="main">{testFunc()}</main>
      </div>
    </div>
  )
}

export default App
