import React from 'react'
import Radio from '../Radio'
import Text from '../Text'
import Button from '../Button'
import Input from '../Input'
import axios from 'axios';
import Alert from '../Alert'
import MapLink from './MapLink'
import iconImage from '../../assets/images/infoIcon.png'

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
    const [isInfoOpen, setIsInfoOpen] = React.useState(false)
    const [showAlert, setShowAlert] = React.useState(false);
    const [isValidMessage, setIsValidMessage] = React.useState(true);
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
                const newInv = {
                    ...response.data.data,
                    count: parseInt(response.data.data.count)
                }
                onUpdate(newInv);
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
                        Jan 18, 2025
                    </p>
                    <p
                        className='selection-p'
                    >
                        4:00 p.m. est
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
                    {
                        isInfoOpen ? 
                        <div
                            className='info-box'
                        >
                            <p>
                                Click address for directions
                            </p>
                        </div>
                        :
                        null
                    }

                    <img 
                        onClick={() => setIsInfoOpen(isInfoOpen ? false : true)}
                        src={iconImage} 
                        alt="Info Icon" 
                        className='info-icon'
                    />
                    <MapLink>
                        <>
                        <p
                            className='selection-p'
                        >
                            1250 Strandwyck Dr
                        </p>
                        <p
                            className='selection-p'
                        >
                            Monroe, MI  48161
                        </p>
                        </>
                    </MapLink>
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
                        {/* <div
                            className='selection-column-50 padding-left-10'
                        > 
                            <Text>
                                Yes
                            </Text>
                        </div>
                        <div
                            className='selection-column-50 padding-left-10'
                        > 
                            <input
                                className='radio radio-custom'
                                type="radio"  
                                checked={userSelections.status === "Yes" ? true : false}
                                onChange={(e) => handleOnChange("status", "Yes")}
                            />
                        </div> */}
                            <label className="radio">
                                <span className="radio-label">Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input
                                type="radio"
                                value="Yes"
                                checked={userSelections.status === "Yes" ? true : false}
                                onChange={() => handleOnChange("status", "Yes")}
                                />
                                <span className="radio-custom"></span>
                                
                            </label>
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
                        {/* <div
                            className='selection-column-50 padding-left'
                        > 
                            <Text>
                                Maybe
                            </Text>
                        </div>
                        <div
                            className='selection-column-50 padding-left'
                        > 
                            <input
                                className='radio radio-custom'
                                type="radio"  
                                checked={userSelections.status === "Maybe" ? true : false}
                                onChange={(e) => handleOnChange("status", "Maybe")}
                            />
                        </div> */}
                        <label className="radio">
                            <span className="radio-label">Maybe</span>
                            <input
                            type="radio"
                            value="Maybe"
                            checked={userSelections.status === "Maybe" ? true : false}
                            onChange={() => handleOnChange("status", "Maybe")}
                            />
                            <span className="radio-custom"></span>
                            
                        </label>
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
                        {/* <div
                            className='selection-column-50 padding-left-10'
                        > 
                            <Text>
                                No
                            </Text>
                        </div>
                        <div
                            className='selection-column-50 padding-left-10'
                        > 
                            <input
                                type="radio"  
                                className='radio radio-custom'
                                checked={userSelections.status === "No"}
                                onChange={(e) => handleOnChange("status", "No")}
                            />
                        </div> */}
                        <label className="radio">
                            <span className="radio-label">No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <input
                            type="radio"
                            value="No"
                            checked={userSelections.status === "No" ? true : false}
                            onChange={() => handleOnChange("status", "No")}
                            />
                            <span className="radio-custom"></span>
                            
                        </label>
                    </div>
                </div>
                <div
                    className='selection-column-50'
                > 
                </div>
            </div>
            
            <div
            className='selection-column'
            >
                <Text
                    className={"optional-text"}
                >
                    (Optional) If you have any comments, questions, or want to bring a dish!
                </Text>
                <textarea
                    defaultValue={userSelections.message || ""}
                    className='textarea'
                    maxLength={100}  // Set the maximum length to 100
                    style={{
                        border: isValidMessage ? null : "1px solid red"
                    }}
                    onChange={(e) => {
                        const value = e.target.value;

                        // Check if the length of the input is valid (between 0 and 100 characters)
                        if (value.length > 100) {
                            setIsValidMessage(false);
                        } else {
                            if (!isValidMessage) {
                                setIsValidMessage(true);
                            }
                            handleOnChange("message", value);
                        }
                    }}
                >
                </textarea>
                <span className='max-char-text'>100 characters max!</span>
            </div>


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