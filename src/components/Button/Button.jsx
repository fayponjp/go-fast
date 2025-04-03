import './Button.css'
import clsx from 'clsx'

export default function Button({children, onClick, size}) {
    const classNames = (size);
    return (
        <button className={classNames} onClick={onClick}>{children}</button>
    )
}