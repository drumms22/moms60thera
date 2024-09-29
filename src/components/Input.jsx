import React from 'react'

const Input = ({
    onChange = null,
    value = 1,
    disabled = false,   
    ...rest
}) => {
  return (
    <input 
        disabled={disabled}
        type='number'
        min='0'
        step='1'
        value={value}
        onChange={onChange}
        {...rest}
    /> 
  )
}

export default Input