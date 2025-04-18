import { useState, useContext, useEffect, useRef } from "react"
import { FastWindowContext } from "../../util/FastWindowContext"
import Button from "../Button/Button"
import { ConfirmationModal } from '../Modal/Modal'
import "./Content.css"

function InactiveFast() {
    const { toggleFasting, mode, fast, toggleModal } = useContext(FastWindowContext)
    const lastFast = localStorage.getItem('endedOn')
    const cleanedLastFast = (lastFast) ? new Date(JSON.parse(lastFast)).toLocaleString(navigator.language, {dateStyle: 'medium', timeStyle: 'short'}) : null

    return (
        <main>
            <div className="last-fast">
                {lastFast ? 'Last fast: ' + cleanedLastFast : 'No Previous Fasts'}
            </div>
            <Button size={"wide"} onClick={() => toggleFasting('start')}>
                    Begin Fast
            </Button>
            <div className={`options ${mode}`}>
                <span><small>Current Fast</small>{fast.goalHours} hours</span>
                <Button size={"medium"} onClick={toggleModal}>Fast Options</Button>
            </div>
        </main>
    )
}

function ActiveFast() {
    const { mode, toggleFasting, fast, toggleModal } = useContext(FastWindowContext)
    const { startDateTime, goalHours } = fast
    const [timeElapsedObj, setTimeElapsedObj] = useState({timeElapsed: 0, elapsedPercent: 0})
    const [activeFastModal, setActiveFastModal] = useState(false)

    const goal = new Date()
    goal.setTime(startDateTime.getTime() + goalHours*60*60*1000)

    useEffect(() => {
        const setIntervalVariable = setInterval(() => {
            const currentTime = new Date()
            const timeRemaining = currentTime.getTime() - startDateTime.getTime()
            const goalSeconds = goal.getTime() - startDateTime.getTime();

            let totalSeconds = Math.round(timeRemaining / 1000)
            let hours = Math.floor(totalSeconds / 3600)
            if(hours<10)hours = "0"+hours
            totalSeconds %= 3600
            let minutes = Math.floor(totalSeconds / 60)
            if(minutes<10)minutes = "0"+minutes
            let seconds = totalSeconds % 60
            if(seconds<10)seconds = "0"+seconds

            const differenceInTimeRatio = (timeRemaining / goalSeconds) * 100

            setTimeElapsedObj({timeElapsed: `${hours}:${minutes}:${seconds}`, elapsedPercent: differenceInTimeRatio.toFixed(2)})
        }, 1000)

        return (() => clearInterval(setIntervalVariable))
    }, [fast])

    function toggleModalContent() {
        setActiveFastModal(true)
    }

    return (
        <main>
            <div className="progress-bar" style={ (timeElapsedObj.elapsedPercent <= 99.99) ?
                    {
                        background: `conic-gradient(var(--accent-light-bright) ${timeElapsedObj.elapsedPercent/10}%, 
                        var(--accent-light) ${timeElapsedObj.elapsedPercent}%, 
                        var(--border-${mode}mode) 0%)`
                    } :
                    {
                        background: `conic-gradient(var(--completed)  0%,var(--completed) 100%, var(--border-darkmode) 0%)`
                    }
                }>
                <div className={`text ${mode}`}>
                    <span>{timeElapsedObj.elapsedPercent}<small>%</small></span>
                    <div className="timer">{timeElapsedObj.timeElapsed}</div>  
                </div>
            </div>
            <Button size={'round goal'} onClick={toggleModal}>{goalHours}h</Button>
            <div className={`progress-timers ${mode}`}>
                <span>
                    <small>Started</small>
                    <time dateTime={startDateTime.toLocaleString()}>
                        {startDateTime.toLocaleDateString(navigator.language, {dateStyle: 'medium'})}
                    </time>
                    <time dateTime={startDateTime.toLocaleTimeString(navigator.language, {timeStyle: 'short'})}>
                        {startDateTime.toLocaleTimeString(navigator.language, {timeStyle: 'short'})}
                    </time>
                </span>
                <span>
                    <small>Goal</small>
                    <time dateTime={goal.toLocaleDateString(navigator.language, {dateStyle: 'medium'})}>
                        {goal.toLocaleDateString(navigator.language, {dateStyle: 'medium'})}
                    </time>
                    <time dateTime={goal.toLocaleTimeString(navigator.language, {timeStyle: 'short'})}>
                        {goal.toLocaleTimeString(navigator.language, {timeStyle: 'short'})}
                    </time>
                </span>
            </div>
            {
                (timeElapsedObj.elapsedPercent > 0.00) &&
                <Button 
                    size={`wide ${(timeElapsedObj.elapsedPercent >= 99.99) && 'completed'}`} 
                    onClick={
                        () => timeElapsedObj.elapsedPercent >= 99.99 ? toggleFasting('complete') : toggleModalContent()
                    }
                >
                    {(timeElapsedObj.elapsedPercent >= 99.99) ? 'Complete Fast' : 'End Fast'}
                </Button>
            }
            {
                <ConfirmationModal 
                    isActive={activeFastModal}
                    setActiveFastModal={setActiveFastModal}
                />
            }
        </main>
    )
}

export { ActiveFast, InactiveFast }