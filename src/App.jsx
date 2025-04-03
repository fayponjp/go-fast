import { useState, useEffect, useRef } from 'react'
import { ActiveFast, InactiveFast } from './components/Main/Main'
import { FastWindowContext } from './util/FastWindowContext'
import clsx from 'clsx'
import './variables.css'
import './App.css'

function App() {
  const [isFasting, setIsFasting] = useState(true)
  const [mode, setMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = firstRenderRef.current + 1
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      })
    }
  }, [mode])

  const classNames = clsx('container', mode)
  function toggleFasting() {
    setIsFasting(prevFastingState => !prevFastingState)
  }

  return (
    <FastWindowContext.Provider value={{isFasting, toggleFasting, mode}}>
      <div className={classNames}>
        <header>
          <h1>{isFasting ? 'Currently fasting!' : 'Start a fast'}</h1>
        </header>
        {isFasting ? <ActiveFast/> : <InactiveFast/>}
      </div>
    </FastWindowContext.Provider>
  )
}

export default App
