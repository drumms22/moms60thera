import React from 'react'
import Radio from '../Radio'
import Text from '../Text'
import Button from '../Button'
import Input from '../Input'
import axios from 'axios';
import Alert from '../Alert'

const Selection = ({
    inv = {
        id: 1,
        name: "Mom",
        status: "Yes",
        count: 1,
        message: "" 
    },
    onUpdate = () => null
}) => {

    console.log(inv);
    //http://localhost:3001
    const apiUrl = "https://moms60thera-bff-production.up.railway.app";
    

    const [userSelections, setUserSelections] = React.useState(inv) ;
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false);
    const [alert, setAlert] = React.useState({
        message: "Testing",
        type: "success",
        delay: 1000
    })

    const handleOnInput = (prop, value) => {
        setUserSelections(prev => {
            return {
                ...prev,
                [prop]: value,
            }
        })
    }

    const handleOnChange = (prop, value) => {
        
        const updatedSelection = {
            ...userSelections,
            [prop]: value
        };

        setUserSelections(updatedSelection);

    }

    const handleAlert = (message, type = "success", delay = 1000) => {
        setAlert({
            type: type,
            message: message,
            delay: delay
        });
        setShowAlert(true);
    }

    const updateInv = () => {
        setIsUpdating(true);
        axios.post(`${apiUrl}/inv/update`, {
            inv: userSelections
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if(response.data.isValid){
                console.log(response.data.data);
                onUpdate(response.data.data);
                handleAlert("Invintation Updated!");
            }else{
                console.log(response);
                handleAlert(response.data.message, "error");
            }

            setIsUpdating(false);
        })
        .catch((err) => {
            console.log(err);
            setIsUpdating(false);
            handleAlert("A server error has occurred.", "error");
        })
    };

    return (
        <div
            className='selection slide-right' 
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
                        Jan 18, 2025 4:00 p.m.
                    </p>
                </div>
                <div
                    className='selection-column-50'
                >
                    <p
                        className='selection-p-title'
                    >
                        Where
                    </p>
                    <p
                        className='selection-p'
                    >
                        1234 Telegraph rd, Monroe, MI 48161
                    </p>
                </div>
            </div>
            <div
                className='selection-row'
            >
                <div
                    className='selection-column-50'
                > 
                    <div
                        className='radio-group'
                    >
                        <Text>
                            Yes
                        </Text>
                        <input
                            className='radio'
                            type="radio"  
                            checked={userSelections.status === "Yes" ? true : false}
                            onChange={(e) => handleOnChange("status", "Yes")}
                        />
                    </div>
                    </div>
                <div
                    className='selection-column-50'
                >
                    <input 
                        className='count-input'
                        disabled={userSelections.status === "Yes" ? false : true}
                        type='number'
                        min='1'
                        step='1'
                        value={userSelections.count}
                        onChange={(e) => handleOnInput("count", e.target.value)}
                    /> 
                    <p
                        className='selection-p'
                    >
                        How many?
                    </p>
                </div>
            </div>
            <div
            className='selection-row'
            >
                <div
                    className='selection-column-50'
                > 
                    <div
                        className='radio-group'
                    >
                        <div
                            className='selection-column-50'
                        > 
                            <Text>
                                Maybe
                            </Text>
                        </div>
                        <div
                            className='selection-column-50'
                        > 
                            <input
                                className='radio'
                                type="radio"  
                                checked={userSelections.status === "Maybe" ? true : false}
                                onChange={(e) => handleOnChange("status", "Maybe")}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className='selection-column-50'
                > 
                </div>
            </div>
            <div
            className='selection-row'
            >
                <div
                    className='selection-column-50'
                > 
                    <div
                        className='radio-group'
                    >
                        <Text>
                            No
                        </Text>
                        <input
                            type="radio"  
                            className='radio'
                            checked={userSelections.status === "No"}
                            onChange={(e) => handleOnChange("status", "No")}
                        />
                    </div>
                </div>
                <div
                    className='selection-column-50'
                > 
                </div>
            </div>
            {
                userSelections.status === "Yes" ?
                <div
                className='selection-column'
                >
                    <Text
                        className={"optional-text"}
                    >
                        (Optional) only here for if you want to bring a dish or have any comments!
                    </Text>
                    <textarea
                        defaultValue={userSelections.message || ""}
                        className='textarea'
                        onChange={(e) => handleOnChange("message", e.target.value)}
                    >
                                
                    </textarea>
                </div>
                :
                null
            }


            <Button
                disabled={isUpdating ? true : false}
                onClick={updateInv}
            >
                Submit
            </Button>
            
        </div>
    )
}

export default Selection