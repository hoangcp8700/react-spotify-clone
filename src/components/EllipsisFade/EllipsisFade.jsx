import React from 'react'
import './EllipsisFade.scss'

const EllipsisFade = ({children, className}) => {
    return (
        <div className={`ellipsis ellipsis_fade ${className ? className : '' }`}>
            {children}
        </div>
    )
}

export default EllipsisFade
