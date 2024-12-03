import React from 'react';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventInfo from '../components/admin/EventInfo';
import FoodInfo from '../components/admin/FoodInfo';
import ActivityInfo from '../components/admin/ActivityInfo';
import EventNeeds from '../components/admin/EventNeeds';
import Invites from '../components/admin/Invites';

const Admin = () => {
    const { id } = useParams(); // Get the "id" from the route parameter
    const [event, setEvent] = React.useState(null);
    const [inv, setInv] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [key, setKey] = React.useState("");
    const navigate = useNavigate();
    //http://localhost:3001
    //https://moms60thera-bff-production.up.railway.app
    const apiUrl = "htttps://moms60thera-bff-production.up.railway.app";
    

    const getEvent = (invId) => {
        console.log(invId);
        
            axios.get(`${apiUrl}/event/${invId}`)
            .then((response) => {
                console.log(response);
                if(response.data.isValid){
                    const newEvent = {
                        ...response.data.data
                    }
                    console.log("New Even: ", newEvent);
                    setEvent(newEvent.event);
                    setInv(newEvent.invitations)
                }else{
                    console.log(response);
                    
                }

                setIsLoaded(true);
            })
            .catch((err) => {
                console.log(err);
                setIsLoaded(true);
            })
    };

    // Use `useEffect` to handle side effects like fetching data
    React.useEffect(() => {
        console.log("id1: ", id);
        if(!isLoaded){
            console.log("id2: ", id);
            if (id) {
                setKey(id);
                getEvent(id); // Fetch invitation data based on "id"
            } else {
                setIsLoaded(true);
                setEvent(null);
            }
        }
    }, [id]); // Run the effect whenever "id" changes

    return (
        <div className='home' style={{position: "relative"}}>
            <Header />

            <button
                className='button change-screen-btn'
                onClick={() => navigate(`/${id}`)}
            >
                View Invite
            </button>

            {
                isLoaded ?
                    event ? 
                    (
                        <>
                            <h1>Event Planner</h1>
                            <EventInfo 
                            event={event} 
                            onUpdate={(data) => setEvent(data)} 
                            totalInvites={inv.length} />
                            <FoodInfo 
                            event={event} 
                            onUpdate={(data) => setEvent(data)} 
                            />
                            <ActivityInfo 
                            event={event} 
                            onUpdate={(data) => setEvent(data)} 
                            />
                            <EventNeeds 
                                event={event} 
                                onUpdate={(data) => setEvent(data)} 
                                key={key}
                            />
                            <Invites 
                                invites={inv} 
                                yesCount={event.yesCount}
                                noCount={event.noCount}
                                maybeCount={event.maybeCount}
                                onUpdate={(data) => setInv(data)} 
                            />
                        </>
                    ) 
                    :
                    id ?
                    <div>
                        <h3>No Event Found</h3>
                    </div>
                    :
                    null
                :
                <div>
                    <h3>Getting Event...</h3>
                </div>
                
            }
        </div>
    );
};

export default Admin;