import React from 'react'

const About = ({
    count = 1,
    name = ""
}) => {
  return (
    <div
        className='about slide-left'
    >
        <h4>Welcome {name}{count > 3 ? " and family!" : count === 2 ? " and guest!" : "!"}</h4>
        <p>
            Lori's 60th era is a 60th birthday party for Lori Tillman. We would love to have you. Please let us know your status below so we can keep an accurate count.
        </p>
        <h4 className='warning-text'>Please do not tell her, post on social media, ect. This is a suprise party!!!</h4>
        <h4>
            Thank you so much!
        </h4>
    </div>
  )
}

export default About