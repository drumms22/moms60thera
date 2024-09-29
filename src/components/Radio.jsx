import React from 'react'

const Radio = ({
    value = null,    // Value of the radio input
    checked = false, // Checked state of the radio input
    onChange = () => {}, // Event handler for change
    name = '',       // Name to group radio buttons
    disabled = false // Optional: disable the input
}) => {
    return (
        <input
            className='radio'
            type="radio"          // Radio input type
            value={value}         // Set the value
            checked={checked}     // Control whether it's checked or not
            onChange={onChange}   // Handle change events
            name={name}           // Grouping by name
            disabled={disabled}   // Optionally disable the input
        />
    )
}

export default Radio;