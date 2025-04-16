import { useState, useContext, useEffect, useRef } from "react"
import { FastWindowContext } from "../../util/FastWindowContext"
import Button from "../Button/Button"
import "./Content.css"
// import '../../variables.css'

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
// background: conic-gradient(var(--accent-light-bright) 5%, var(--accent-light) 50%, var(--border-darkmode) 0%);
function ActiveFast() {
    const { mode, toggleFasting, fast } = useContext(FastWindowContext)
    const { startDateTime, goalHours } = fast
    const [timeElapsedObj, setTimeElapsedObj] = useState({timeElapsed: 0, elementWidth: 0})

    const goal = new Date()
    goal.setTime(startDateTime.getTime() + goalHours*60*60*1000)

    useEffect(() => {
        const setIntervalVariable = setInterval(() => {
            const currentTime = new Date()
            const timeRemaining = currentTime.getTime() - startDateTime.getTime()
            const goalSeconds = goal.getTime() - startDateTime.getTime();

            let totalSeconds = Math.round(timeRemaining / 1000)
            let hours = Math.floor(totalSeconds / 3600)
            if(hours<10)hours = "0"+hours;
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            if(minutes<10)minutes = "0"+minutes;
            let seconds = totalSeconds % 60;
            if(seconds<10)seconds = "0"+seconds;

            const differenceInTimeRatio = (timeRemaining / goalSeconds) * 100;

            setTimeElapsedObj({timeElapsed: `${hours}:${minutes}:${seconds}`, elementWidth: differenceInTimeRatio.toFixed(2)})
        }, 1000)

        return (() => clearInterval(setIntervalVariable))
    }, [fast])

    return (
        <main>
            <div className="progress-bar" style={
                    {
                        background: `conic-gradient(var(--accent-light-bright) ${timeElapsedObj.elementWidth/10}%, var(--accent-light) ${timeElapsedObj.elementWidth}%, var(--border-darkmode) 0%)`,
                        color: 'black'
                    }
                }>
                <div className={`text ${mode}`}>
                        <span>{timeElapsedObj.elementWidth}<small>%</small></span>
                        <div className="timer">{timeElapsedObj.timeElapsed}</div>  
                    </div>
            </div>
            <div className="progress-timers">
                <span>
                    <small>Started</small>
                    <time dateTime={startDateTime.toLocaleString()}>
                        {startDateTime.toLocaleString(navigator.language, {dateStyle: 'short', timeStyle: 'short'})}
                    </time>
                </span>
                <span>
                    <small>Goal</small><time dateTime="">{goal.toLocaleString(navigator.language, {dateStyle: 'short', timeStyle: 'short'})}</time>
                </span>
            </div>
            <Button size={"wide"} onClick={() => toggleFasting('end')}>End Fast</Button>
        </main>
    )
}

export { ActiveFast, InactiveFast }