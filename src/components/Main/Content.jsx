import { useState, useContext, useEffect, useRef } from "react"
import { FastWindowContext } from "../../util/FastWindowContext"
import Button from "../Button/Button"
import "./Content.css"


function InactiveFast() {
    const { toggleFasting, localTimer } = useContext(FastWindowContext)
    return (
        <main>
            <div className="last-fast">
                {localTimer ? 'Time since last fast:' : 'No Previous Fasts'}
            </div>
            <Button size={"wide"} onClick={() => toggleFasting('start')}>
                    Begin Fast
            </Button>
            <div className="options">
                <span><small>Current Fast</small>16 hours</span>
                <Button size={"medium"}>Fast Options</Button>
            </div>
        </main>
    )
}

// {isFasting: false, startDateTime: null, goalHours: null}
function ActiveFast() {
    const { mode, toggleFasting, fast } = useContext(FastWindowContext)
    const [timeElapsed, setTimeElapsed] = useState('')
    const [goalDateTime, setGoalDateTime] = useState(() => {
        const goal = new Date()
        goal.setTime(fast.startDateTime.getTime() + fast.goalHours*60*60*1000)
        return goal
    })

    useEffect(() => {
        const setIntervalVariable = setInterval(() => {
            const currentTime = new Date()
            const timeRemaining = currentTime.getTime() - fast.startDateTime.getTime()

            let totalSeconds = Math.round(timeRemaining / 1000)
            let hours = Math.floor(totalSeconds / 3600)
            if(hours<10)hours = "0"+hours;
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            if(minutes<10)minutes = "0"+minutes;
            let seconds = totalSeconds % 60;
            if(seconds<10)seconds = "0"+seconds;
            setTimeElapsed(`${hours}:${minutes}:${seconds}`)
        }, 1000)

        return (() => clearInterval(setIntervalVariable))
    }, [fast])

    return (
        <main>
            <div className="progress-bar">
                <div className={`text ${mode}`}>
                        <span>65<small>%</small></span>
                        <div className="timer">{timeElapsed}</div>  
                    </div>
            </div>
            <div className="progress-timers">
                <span>
                    <small>Started</small>
                    <time dateTime={fast.startDateTime.toLocaleString()}>
                        {fast.startDateTime.toLocaleString(navigator.language, {dateStyle: 'short', timeStyle: 'short'})}
                    </time>
                </span>
                <span>
                    <small>Goal</small><time dateTime="">{goalDateTime.toLocaleString(navigator.language, {dateStyle: 'short', timeStyle: 'short'})}</time>
                </span>
            </div>
            <Button size={"wide"} onClick={() => toggleFasting('end')}>End Fast</Button>
        </main>
    )
}

export { ActiveFast, InactiveFast }