import { useState, useEffect, useRef } from 'react'
import { ActiveFast, InactiveFast } from './components/Main/Main'
import { FastWindowContext } from './util/FastWindowContext'
import clsx from 'clsx'
import './variables.css'
import './App.css'

function App() {
  const [isFasting, setIsFasting] = useState(true)
  const [mode, setMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const renderRef = useRef(0)

  useEffect(() => {
    if (renderRef.current === 0) {
      renderRef.current = renderRef.current+1
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      })
    }
  }, [mode])
  const classNames = clsx('container', mode)

  return (
    <FastWindowContext.Provider value={{isFasting, mode}}>
      <div className={classNames}>
        <header>
          <h1>Start a fast</h1>
        </header>
        {isFasting ? <ActiveFast/> : <InactiveFast/>}
      </div>
    </FastWindowContext.Provider>
  )
}

export default App
