import { useState, useEffect, useRef } from "react"
import { ActiveFast, InactiveFast } from "./components/Main/Content"
import Modal from "./components/Modal/Modal"

import { FastWindowContext } from "./util/FastWindowContext"
import clsx from "clsx"
import "./variables.css"
import "./App.css"

function App() {
  const [mode, setMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  const classNames = clsx("container", mode)
  const [localTimer, setLocalTimer] = useState(null)
  const [fast, setFast] = useState({isFasting: false, startDateTime: null, goalHours: 16})
  const [open, setIsOpen] = useState(false)

  const firstRenderRef = useRef(true)

  useEffect(() => {
    function schemeHandler() {
      setMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = firstRenderRef.current + 1
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", schemeHandler)
    }
    return (() => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", schemeHandler))
  }, [mode])

  useEffect(() => {
    const localFast = localStorage.getItem('currentFastStart')
    if (localFast) {
      const localFastDate = new Date(JSON.parse(localFast))
      const localGoalHours = localStorage.getItem('currentFastGoalHours')

      setFast({isFasting: true, startDateTime: localFastDate, goalHours: localGoalHours})
      setLocalTimer(localFastDate)
    }
  }, [])

  function toggleFasting(toggle) {
    const currentTime = new Date();
    if (toggle === 'start') {
      setFast((prevFast) => {
        const currentFastObj = {...prevFast, isFasting: true, startDateTime: currentTime}        
        localStorage.setItem('currentFastStart', JSON.stringify(currentTime))
        localStorage.setItem('currentFastGoalHours', currentFastObj.goalHours)
        return currentFastObj
      })
    } else if (toggle === 'complete' || toggle === 'end') {
      let historyArr = localStorage.getItem('fastHistory') ? JSON.parse(localStorage.getItem('fastHistory')) : []
      historyArr = [{...fast, completed: (toggle === 'end') ? false : true, endedOn: currentTime}, ...historyArr]

      localStorage.setItem('endedOn', JSON.stringify(currentTime))
      localStorage.removeItem('currentFastStart')
      localStorage.removeItem('currentFastGoalHours')        
      localStorage.setItem('fastHistory', JSON.stringify(historyArr))

      setFast({ isFasting: false, startDateTime: null, goalHours: 16 })
    } else if (toggle === 'cancel') {
      localStorage.removeItem('currentFastStart')
      localStorage.removeItem('currentFastGoalHours')
      setFast({ isFasting: false, startDateTime: null, goalHours: 16 })
    }
  }

  function toggleModal() {
    setIsOpen(prevToggle => !prevToggle)
  }

  function updateTimer(newGoal) {
    setFast(prevFastObject => ({...prevFastObject, goalHours: newGoal}))
    localStorage.setItem('currentFastGoalHours', newGoal)
    toggleModal()
  }

  return (
    <FastWindowContext.Provider 
      value={
        {
          fast, 
          toggleFasting, 
          open,
          mode,
          toggleModal,
          updateTimer
        }
      }>
      <div className={classNames}>
        <header>
          <h1>{fast.isFasting ? "Currently fasting!" : "Start a fast"}</h1>
        </header>
        {fast.isFasting ? <ActiveFast/> : <InactiveFast/>}
      </div>
      <Modal/>
    </FastWindowContext.Provider>
  )
}

export default App
