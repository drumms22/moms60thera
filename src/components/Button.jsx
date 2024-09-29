import React from 'react'

const Button = ({
    onClick = null,
    children, 
    style = {},
    ...rest
}) => {
  return (
    <button
        onClick={onClick}
        className='button'
        style={style}
        {...rest}
    >
        {children}
    </button>
  )
}

export default Button