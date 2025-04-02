import { useState } from 'react'
import './App.css'
import './variables.css'
import { ActiveFast, InactiveFast } from './components/Main/Main'

function App() {
  const [isFasting, setIsFasting] = useState(true)

  return (
    <>
      <header>
        <h1>Start a fast</h1>
      </header>
      {isFasting ? <ActiveFast /> : <InactiveFast />}
    </>
  )
}

export default App
