import React from 'react'
import EventSection from './EventSection';
import axios from 'axios';
import checkmark from '../../assets/images/checkmark.png'
import close from '../../assets/images/close.png'
import edit from '../../assets/images/edit.png'
import deleteImg from '../../assets/images/delete.png'
import { useParams } from 'react-router-dom';
import Alert from '../Alert'

const EventNeeds = ({
    event = null,
    onUpdate = () => null
}) => {

    const { id } = useParams();
    const key = id;
    const [eventNeeds, setEventNeeds] = React.useState(event.eventNeeds);
    const [isUpdating, setisUpdating] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const [newEntry, setNewEntry] = React.useState("");
    const [showAlert, setShowAlert] = React.useState(false);
    const [alert, setAlert] = React.useState({
        message: "Testing",
        type: "success",
        delay: 1000
    })

    React.useEffect(() => {
        if(event && event.hasOwnProperty("eventNeeds")){
            setEventNeeds(event.eventNeeds)
        }
    }, [event])


    //http://localhost:3001
    //https://moms60thera-bff-production.up.railway.app
    const apiUrl = "https://moms60thera-bff-production.up.railway.app";

    const handleUpdates = (prop, data) => {

        setisUpdating(true);
        
        let updatedEvent = {...event};
        updatedEvent[prop] = data;
        
        axios.post(`${apiUrl}/event/update`, {
            event: updatedEvent,
            key: key
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            console.log(response);
            
            if(response.data.isValid){
                console.log(response.data.data);
                onUpdate(updatedEvent);
                setEventNeeds(updatedEvent.eventNeeds);
                handleAlert("List Updated!");
            }else{
                console.log(response);
                handleAlert(response.data.message, "error");
            }

            setisUpdating(false);
        })
        .catch((err) => {
            console.log(err);
            setisUpdating(false);
            handleAlert("A server error has occurred.", "error");
        })
    }
    
    const handleAlert = (message, type = "success", delay = 1000) => {
        setAlert({
            type: type,
            message: message,
            delay: delay
        });
        setShowAlert(true);
    }

    const handleDelete = (index) => {

        setIsDeleting(true);
        let updatedNeeds = [...eventNeeds]
        let updatedEvent = {...event};
        updatedNeeds.splice(index, 1);
        updatedEvent.eventNeeds = updatedNeeds;
    

        axios.post(`${apiUrl}/event/update`, {
            event: updatedEvent,
            key: key
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if(response.data.isValid){
                console.log(response.data.data);
                onUpdate(updatedEvent);
                setEventNeeds(updatedEvent);
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


    const EventItem = ({
        data = "",
        index = 0,
        onUpdate = () => null
    }) => {

        console.log(data);
        

        const [isEditting, setIsEditting] = React.useState(false);
        const [newData, setNewData] = React.useState(data);

        return (
            <div
            className='selection-row'
            >
                <div
                    className='event-column-80'
                >
                <li
                    className='selection-p'
                    style={{width: "100%"}}
                >
                    {
                        isEditting ?
                            <>
                
                                <textarea
                                    defaultValue={newData}
                                    className='event-textarea'
                                    onChange={(e) => setNewData(e.target.value)}
                                >
                                </textarea>
                            </>
                        :
                        <span>
                            {data}
                        </span>

                    }
                </li>

                </div>
                <div
                    className='event-column-20'
                >
                    <div
                        className='section-row'
                    >
                    {
                        isEditting ?
                        <>
                            <img 
                                onClick={() => setIsEditting(isEditting ? false : true)}
                                src={close} 
                                alt="Info Icon" 
                                className='event-icon'
                            />
                            <img 
                                onClick={(e) => {
                                    console.log(newData);
                                    
                                    if(newEntry.trim() === ""){
                                        handleAlert("Enter a value please!", "error")
                                        return;
                                    }
                                    let updatedNeeds = [...eventNeeds];
                                    updatedNeeds[index] = newData;
                                    
                                    console.log(updatedNeeds);
                                    
                                    handleUpdates("eventNeeds", updatedNeeds);
                                    setIsEditting(isEditting ? false : true);
                                    
                                }}
                                src={checkmark} 
                                alt="Info Icon" 
                                className='event-icon'
                            />
                        </>
                        :
                        <>
                        
                            <img 
                                onClick={() => setIsEditting(isEditting ? false : true)}
                                src={edit} 
                                alt="Info Icon" 
                                className='event-icon'
                            />
                            <img 
                                onClick={() => handleDelete(index)}
                                src={deleteImg} 
                                alt="Info Icon" 
                                className='event-icon'
                            />
                        </>
                    }
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <EventSection
        title={"Event Needs"}
        className={'slide-bottom'}
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
            <>
                {
                    eventNeeds.length > 0 ?
                    eventNeeds.map((f, i) => (
                        <EventItem
                            data={f}
                            index={i}
                        />
                    ))
                    :
                    <p
                        className='selection-p'
                    >
                        Add first entry!
                    </p>
                }

                    
            </>
            {
                isAdd ? 
                <>
                
                    <textarea
                        defaultValue={newEntry}
                        className='event-textarea'
                        onChange={(e) => setNewEntry(e.target.value)}
                    >
                    </textarea>
                    <button
                        className='event-close-btn'
                        onClick={(e) => {
                            console.log(newEntry);
                            
                            if(newEntry.trim() === ""){
                                handleAlert("Enter a value please!", "error")
                                return;
                            }
                            let updatedNeeds = [...eventNeeds];
                            updatedNeeds.push(newEntry);
                            console.log(updatedNeeds);
                            
                            handleUpdates("eventNeeds", updatedNeeds);
                            
                        }}
                    >
                        Submit
                    </button>
                </>
                :
                null
            }
            {
                isAdd ?
                <>
                <button
                    className='event-close-btn'
                    onClick={() => setIsAdd(false)}
                >
                    Close
                </button>
                </>
                :
                <button
                    className='event-add-btn'
                    onClick={() => setIsAdd(true)}
                >
                    Add
                </button>
            }
            
        </EventSection>
    )
}

export default EventNeeds