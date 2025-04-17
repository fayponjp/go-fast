import "./Modal.css"
import Button from '../Button/Button'
import { FastWindowContext } from '../../util/FastWindowContext'
import { useContext } from 'react'

export default function Modal() {
    const { mode, open, toggleModal, updateTimer } = useContext(FastWindowContext)
    return (
        <div className={`modal ${open && 'open'} ${mode}`}>
            <h3>Set fast goal:</h3>
            <div className='fast-options'>
                <Button size='medium fast' onClick={() => updateTimer(13)}>
                    <p>13 Hours</p>
                    <p>Circadian Rhythm Reset</p>
                </Button>
                <Button size='medium fast' onClick={() => updateTimer(16)}>
                    <p>16 Hours</p>
                    <p>16:8 Daily</p>
                </Button>
                <Button size='medium fast' onClick={() => updateTimer(18)}>
                    <p>18 Hours</p>
                    <p>18:6 Daily</p>
                </Button>
                <Button size='medium fast' onClick={() => updateTimer(20)}>
                    <p>20 Hours</p>
                    <p>One Meal a Day</p>
                </Button>
            </div>
            <div className="history">

            </div>
            <Button size={'round'} onClick={toggleModal}>{'x'}</Button>
        </div>
    )
}