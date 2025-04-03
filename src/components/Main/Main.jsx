import './Main.css'
import { useRef } from 'react'
import Button from '../Button/Button'

function InactiveFast() {
    return (
        <main>
            <div className='options'>
                <Button>
                    Start Fasting
                </Button>
            </div>
        </main>
    )
}

function ActiveFast({mode}) {
    return (
        <main>
            <div className='progress-bar'>
                <div className={`text ${mode}`}>0<small>%</small></div>
            </div>
            <div className='progress-timers'>
                <span><small>Started</small><time dateTime=''>Feb. 27, 2025</time></span>
                <span><small>Goal</small><time dateTime=''>Feb. 27, 2025</time></span>
            </div>
            <Button>End Fast</Button>
        </main>
    )
}

export { ActiveFast, InactiveFast }