import React from 'react';
import Header from '../components/Header';
import About from '../components/home/About';
import Selection from '../components/home/Selection';
import AdditionalInfo from '../components/home/AdditionalInfo';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const { id } = useParams(); // Get the "id" from the route parameter
    const [inv, setInv] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);


    console.log(inv);
    //http://localhost:3001
    const apiUrl = "https://moms60thera-bff-production.up.railway.app";
    

    const getInv = (invId) => {
        console.log(invId);
        
            axios.get(`${apiUrl}/inv/${invId}`)
            .then((response) => {
                if(response.data.isValid){
                    setInv(response.data.data);
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
        <div className='home'>
            <Header />

            {
                isLoaded ?
                    inv ? 
                    (
                        <>
                            <About name={inv.name} count={inv.count} />
                            <Selection inv={inv} />
                            <AdditionalInfo />
                        </>
                    ) 
                    :
                    <div>
                        <h3>No Invite Found</h3>
                    </div>
                :
                <div>
                    <h3>Getting Invite...</h3>
                </div>
                
            }
        </div>
    );
};

export default Home;