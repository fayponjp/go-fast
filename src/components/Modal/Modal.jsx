import "./Modal.css"
import Button from '../Button/Button'
import { FastWindowContext } from '../../util/FastWindowContext'
import { useContext } from 'react'
import clsx from 'clsx'

export default function Modal() {
    const { mode, open, toggleModal, updateTimer } = useContext(FastWindowContext)
    const classNames = clsx('modal', open && 'open', mode)

    const localHistory = localStorage.getItem('fastHistory')
    const cleanedLocalHistory = JSON.parse(localHistory)

    const localHistoryElements = (cleanedLocalHistory) ? cleanedLocalHistory.map((fastRecord, index) => <li key={`list-item-${index}`}>
        <span>
            {new Date(fastRecord.startDateTime).toLocaleString()}
        </span>
        | 
        <span>
        {fastRecord.completed ? ' Yes' : ' No'}
        </span> 
        | 
        <span>
        { fastRecord.goalHours}
        </span>
    </li>) : null

    return (
        <div className={classNames}>
            <div className='fast-options'>
                <h3>Set fast goal:</h3>
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
                <h3>Fast history</h3>
                <ul>
                    <li><span>Date</span> | <span>Completed</span> | <span>Goal</span></li>
                    {localHistoryElements}
                </ul>
            </div>
            <Button size={'round'} onClick={toggleModal}>{'x'}</Button>
        </div>
    )
}

function ConfirmationModal({isActive, setActiveFastModal}) {
    const { mode, toggleFasting } = useContext(FastWindowContext)
    const classNames = clsx('modal confirmation', isActive && 'open', mode)
    return (
        <div className={classNames}>
            <h3>End Fast?</h3>
            <div className="confirmation-buttons">
                <Button onClick={() => {
                    toggleFasting('end')
                    setActiveFastModal(false)
                }}>Yes</Button>
                <Button onClick={() => {
                    setActiveFastModal(false)
                }}>No</Button>
            </div>
                <Button onClick={() => {
                        toggleFasting('cancel')
                        setActiveFastModal(false)
                    }}>Cancel Ongoing Fast</Button>
        </div>
    )
}

export { ConfirmationModal }