import React from 'react'
import EventSection from './EventSection';
import Input from '../Input';
import axios from 'axios';
import Alert from '../Alert'

const Invites = ({
    invites = [],
    yesCount = 0,
    noCount = 0,
    maybeCount = 0,
    onUpdate = () => null
}) => {
    console.log("invites: ", invites);

    const [isAdding, setIsAdding] = React.useState(false);
    const [showAlert, setShowAlert] = React.useState(false);
    const [alert, setAlert] = React.useState({
        message: "Testing",
        type: "success",
        delay: 1000
    })

    const handleAlert = (message, type = "success", delay = 1000) => {
        setAlert({
            type: type,
            message: message,
            delay: delay
        });
        setShowAlert(true);
    }

    const EventItem = ({
        data = {
            name: "",
            count: 0,
            message: "",
            status: "Maybe",
            key: ""
        }

    }) => {
        const [isDeleting, setIsDeleting] = React.useState(false);


        //http://localhost:3001
        //https://moms60thera-bff-production.up.railway.app
        const apiUrl = "https://moms60thera-bff-production.up.railway.app";
    
        const handleDelete = (key) => {
    
            setIsDeleting(true);
        
    
            axios.post(`${apiUrl}/inv/delete`, {
                key: key
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                if(response.data.isValid){
                    console.log(response.data.data);
                    onUpdate(response.data.data);
                    handleAlert("List Updated!");
                }else{
                    console.log(response);
                    handleAlert(response.data.message, "error");
                }
    
                setIsDeleting(false);
            })
            .catch((err) => {
                console.log(err);
                setIsDeleting(false);
                handleAlert("A server error has occurred.", "error");
            })
        }

        return (
            <div
            className='selection-row-2 invite-section'
            >
                {
                    isDeleting ?
                    <button
                        className='delete-invite-btn-2'
                    >
                        -
                    </button>
                    :
                    <button
                        onClick={() => handleDelete(data.key)}
                        className='delete-invite-btn'
                    >
                        -
                    </button>
                }
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

    const handleAdd = (name, count) => {
            
        //setIsDeleting(true);
           //http://localhost:3001
        //https://moms60thera-bff-production.up.railway.app
        const apiUrl = "https://moms60thera-bff-production.up.railway.app";

        axios.post(`${apiUrl}/inv/add`, {
            inv:{
                name: name,
                count: count
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if(response.data.isValid){
                console.log(response.data.data);
                onUpdate(response.data.data);
                handleAlert("List Updated!");
            }else{
                console.log(response);
                handleAlert(response.data.message, "error");
            }

           // setIsDeleting(false);
        })
        .catch((err) => {
            console.log(err);
           // setIsDeleting(false);
            handleAlert("A server error has occurred.", "error");
        })
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

    const AddItem = () => {

        const [isAdding2, setIsAdding2] = React.useState(false);
        const [name, setName] = React.useState("");
        const [count, setCount] = React.useState(1);

        return (
            <div
                className='add-invite'
            >
                <div
                    className='add-invite-row'
                >
                    <p>Name: </p>
                    <input 
                        className='add-invite-input-name'
                        //disabled={userSelections.status === "Yes" ? false : true}
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </div>
                <div
                    className='add-invite-row'
                >
                    <p>How many: </p>
                    <input 
                        className='count-input add-item-input'
                        //disabled={userSelections.status === "Yes" ? false : true}
                        type='number'
                        min='1'
                        step='1'
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                    /> 
                </div>
                <div
                    className='add-invite-row'
                >
                    <button
                        className='add-invite-btn-2'
                        onClick={() => handleAdd(name, count)}
                    >
                        Add
                    </button>
                </div>
            </div>
        )

    } 

    return (
        <EventSection
        title={"Invitations"}
        className={'slide-left'}
        >
             {showAlert && 
                <Alert 
                message={alert.message} 
                type={alert.type} 
                delay={alert.delay} 
                onClose={() => {
                    setAlert({
                        type: "",
                        message: "",
                        delay: 0
                    });
                    setShowAlert(false);
                }}
                />
            }
            {
                isAdding ?
                <AddItem />
                :
                null
            }
            {
                isAdding ? 
                <button
                    className='button add-invite-btn'
                    onClick={() => setIsAdding(false)}
                >
                    -
                </button>
                :
                <button
                    className='button add-invite-btn'
                    onClick={() => setIsAdding(true)}
                >
                    +
                </button>
            }

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