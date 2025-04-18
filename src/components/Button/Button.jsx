import { useContext } from 'react'
import "./Button.css"
import clsx from "clsx"
import { FastWindowContext } from '../../util/FastWindowContext'

export default function Button({children, onClick, size}) {
    const { mode } = useContext(FastWindowContext)
    const classNames = clsx(size, mode)
    return (
        <button className={classNames} onClick={onClick}>{children}</button>
    )
}