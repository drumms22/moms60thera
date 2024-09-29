import React from 'react'

const Text = ({
    style = {},
    children = null,
    className = "",
    ...rest
}) => {
  return (
    <p
        className={`text ${className}`}
        style={{color: "#000", ...style}}
        {...rest}
    >
        {children}
    </p>
  )
}

export default Text