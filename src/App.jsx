import { useState } from 'react'
import './App.css'
import './variables.css'
import { ActiveFast, InactiveFast } from './components/Main/Main'
import clsx from 'clsx'

function App() {
  const [isFasting, setIsFasting] = useState(true)
  const [mode, setMode] = useState('dark')
  const classNames = clsx('container', mode)
  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)
  return (
    <div className={classNames}>
      <header>
        <h1>Start a fast</h1>
      </header>
      {isFasting ? <ActiveFast mode={mode}/> : <InactiveFast mode={mode}/>}
    </div>
  )
}

export default App
