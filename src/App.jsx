import { useState } from 'react'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>16-hour Fast</h1>
      </header>
      <main>
        <div className='progress-bar'>
          <div className="text">0%</div>
        </div>
      </main>
    </>
  )
}

export default App
