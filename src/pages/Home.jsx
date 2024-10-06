import React from 'react';
import Header from '../components/Header';
import About from '../components/home/About';
import Selection from '../components/home/Selection';
import AdditionalInfo from '../components/home/AdditionalInfo';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { id } = useParams(); // Get the "id" from the route parameter
    const [inv, setInv] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const navigate = useNavigate();

    console.log(inv);
    //http://localhost:3001
    const apiUrl = "https://moms60thera-bff-production.up.railway.app";
    

    const getInv = (invId) => {
        console.log(invId);
        
            axios.get(`${apiUrl}/inv/${invId}`)
            .then((response) => {
                if(response.data.isValid){
                    const newInv = {
                        ...response.data.data,
                        count: parseInt(response.data.data.count)
                    }
                    setInv(newInv);
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

                getInv(id); // Fetch invitation data based on "id"
            } else {
                setIsLoaded(true);
                setInv(null);
            }
        }
    }, [id]); // Run the effect whenever "id" changes

    return (
        <div className='home' style={{position: "relative"}}>
            <Header />
            {
               inv && inv.hasOwnProperty('isAdmin') && inv.isAdmin ?
                <button
                    className='button change-screen-btn'
                    onClick={() => navigate(`/admin/${id}`)}
                >
                    View Planner
                </button>
                :
                null
            }

            {
                isLoaded ?
                    inv ? 
                    (
                        <>
                            <About name={inv.name} count={inv.count === "" ? 0 : parseInt(inv.count)} />
                            <Selection inv={inv} onUpdate={(data) => setInv(data)}/>
                            <AdditionalInfo />
                        </>
                    ) 
                    :
                    id ?
                    <div>
                        <h3>No Invite Found</h3>
                    </div>
                    :
                    null
                :
                <div>
                    <h3>Getting Invite...</h3>
                </div>
                
            }
        </div>
    );
};

export default Home;