import "./Modal.css"
import Button from '../Button/Button'

export default function Modal({open, toggleModal}) {
    return (
        <div className={`modal ${open && 'open'}`}>
            <div className='fast-options'>
                <Button size='medium'>13 Hours</Button>
                <Button size='medium'>16 Hours</Button>
                <Button size='medium'>18 Hours</Button>
                <Button size='medium'>20 Hours</Button>
            </div>
            <Button size={'round'} onClick={toggleModal}>{'x'}</Button>
        </div>
    )
}