import React from 'react'
import EventSection from './EventSection';

const Invites = ({
    invites = [],
    yesCount = 0,
    noCount = 0,
    maybeCount = 0
}) => {
    console.log("invites: ", invites);

    const EventItem = ({
        data = {
            name: "",
            count: 0,
            message: "",
            status: "Maybe"
        }

    }) => {

        return (
            <div
            className='selection-row-2'
            >
                <div
                    className='event-column-25'
                >
                    <h6>{data.name}</h6>
                </div>
                <div
                    className='event-column-25'
                >
                    <h6>{data.count.toString()}</h6>
                </div>
                <div
                    className='event-column-25'
                >
                    <h6 className={data.status === "Yes" ? 'yes-text' : data.status === "No" ? 'no-text' : ''}>{data.status}</h6>
                </div>
                <div
                    className='event-column-40'
                >
                    <p>
                        {data.message}
                    </p>
                </div>
            </div>
        )
    }
    const totalBodiesYes = (invitations) => 
        invitations.reduce((total, { status, count }) => 
            status === "Yes" ? total + count : total, 0
        );
    const totalBodiesMaybe = (invitations) => 
        invitations.reduce((total, { status, count }) => 
            status === "Maybe" ? total + count : total, 0
        );
    const totalBodiesNo = (invitations) => 
        invitations.reduce((total, { status, count }) => 
            status === "No" ? total + count : total, 0
        );
    const totalBodies = (invitations) => 
        invitations.reduce((total, { status, count }) => 
            total + count, 0
        );
    
    const totalBodyCount = totalBodies(invites);
    const totalYes = totalBodiesYes(invites);
    const totalNo = totalBodiesNo(invites);
    const totalmaybe = totalBodiesMaybe(invites);

    return (
        <EventSection
        title={"Invitations"}
        className={'slide-left'}
        >
            <div
                className='selection-row-2'
                style={{marginTop:"10px", marginRight: "15px"}}
            >
                <div
                    className='selection-column-25-sm'
                >
                    <p
                        className='selection-p-title'
                    >
                        Yes
                    </p>
                    <p
                        className='selection-p'
                    >
                        {yesCount.toString()}/{totalYes}
                    </p>
                </div>
                <div
                    className='selection-column-25-sm'
                    style={{position: "relative"}}
                >
                    <p
                        className='selection-p-title'
                    >
                        Maybe
                    </p>
                
                    <p
                        className='selection-p'
                    >
                        {maybeCount.toString()}/{totalmaybe}
                    </p>
                </div>
                <div
                    className='selection-column-25-sm'
                    style={{position: "relative"}}
                >
                    <p
                        className='selection-p-title'
                    >
                        No
                    </p>
                
                    <p
                        className='selection-p'
                    >
                        {noCount.toString()}/{totalNo}
                    </p>
                </div>
                <div
                    className='selection-column-25-sm'
                    style={{position: "relative"}}
                >
                    <p
                        className='selection-p-title'
                    >
                        Total
                    </p>
                
                    <p
                        className='selection-p'
                    >
                        {invites.length}\{totalBodyCount}
                    </p>
                </div>
            </div>
            <div
                className='selection-row-2'
                style={{marginTop:"10px", marginRight: "15px"}}
            >
                <div
                className='selection-row-2'
                style={{marginRight: "30px"}}
                >
                    <div
                        className='event-column-25'
                    >
                        <h6>Name</h6>
                    </div>
                    <div
                        className='event-column-25'
                    >
                        <h6>Count</h6>
                    </div>
                    <div
                        className='event-column-25'
                    >
                        <h6>Status</h6>
                    </div>
                    <div
                        className='event-column-40'
                    >
                        <h6>Message</h6>
                    </div>
                </div>
            </div>
            <div
                className='invites-container'
            >
                {
                    invites.length > 0 ?
                    invites.map((f) => (
                        <EventItem
                            data={f}
                        />
                    ))
                    :
                    null
                }
            </div>
            
        </EventSection>
    )
}

export default Invites