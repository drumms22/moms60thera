import React from 'react'

const EventSection = ({
    title = "",
    className = "",
    children
}) => {
  return (
    <div
        className={`event-wrapper ${className}`}
    >
        <div
            className='event-column'
        >
            <p
                className='event-title'
            >
                {title}
            </p>
        </div>
        <div style={{marginTop: "15px"}}></div>
        {children}
    </div>
  )
}

export default EventSection