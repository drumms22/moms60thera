import React from 'react'
import EventSection from './EventSection'
const EventInfo = ({
    event = null,
    onUpdate = () => null,
    totalInvites = 0
}) => {
    console.log(totalInvites);
    
    // maybeCount: 23

    // noCount: 0

    // yesCount: 3
    return (
        <EventSection
            title={'General Info'}
            className={"slide-left"}
        >
            <div
                className='selection-row'
            >
                <div
                    className='selection-column-50'
                    style={{
                        justifyContent: "flex-start"
                    }}
                >
                    <p
                        className='selection-p-title'
                    >
                        When
                    </p>
                    <p
                        className='selection-p'
                    >
                        {event.date}
                    </p>
                    <p
                        className='selection-p'
                    >
                        {event.time} est
                    </p>
                </div>
                <div
                    className='selection-column-50'
                    style={{position: "relative"}}
                >
                    <p
                        className='selection-p-title'
                    >
                        Where
                    </p>
                
                    <p
                        className='selection-p'
                    >
                        {event.venue.address.line1}
                    </p>
                    <p
                        className='selection-p'
                    >
                        {event.venue.address.city}, {event.venue.address.state} {event.venue.address.zip}
                    </p>
                </div>
            </div> 

        </EventSection>
    )
}

export default EventInfo