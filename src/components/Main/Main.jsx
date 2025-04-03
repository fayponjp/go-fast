import { useRef, useContext } from 'react'
import { FastWindowContext } from '../../util/FastWindowContext'
import Button from '../Button/Button'
import './Main.css'


function InactiveFast() {
    const { toggleFasting } = useContext(FastWindowContext)
    return (
        <main>
            <div className="last-fast">
                Time since last fast:
            </div>
            <div className='options'>
                <Button onClick={toggleFasting}>
                    Start Fasting
                </Button>
            </div>
        </main>
    )
}

function ActiveFast() {
    const { mode, toggleFasting } = useContext(FastWindowContext)
    return (
        <main>
            <div className='progress-bar'>
                <div className={`text ${mode}`}>0<small>%</small></div>
            </div>
            <div className='progress-timers'>
                <span><small>Started</small><time dateTime=''>Feb. 27, 2025</time></span>
                <span><small>Goal</small><time dateTime=''>Feb. 27, 2025</time></span>
            </div>
            <Button size={'wide'} onClick={toggleFasting}>End Fast</Button>
        </main>
    )
}

export { ActiveFast, InactiveFast }