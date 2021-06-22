import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ContactClientReducer} from "../store/ContactClientReducer";
import {setSignUpOnchange} from "../../signUp/store/signUpAction";
import {setContactClientOnchange} from "../store/ContactClientAction";


export  const Hooks=(ContactClientMutationAction)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ContactClientReducer)

//******************generalInformation************************//
    const ContactClientOnChange = (event) => {
        console.log("eventContactClient", event.target.value, event.target.name)
        dispatch(setContactClientOnchange({
            ContactClientNameChange: event.target.name,
            ContactClientValueChange: event.target.value
        }));
    };

    const handleSubmitContactClient =()=>{
        ContactClientMutationAction()
    }

    return({
        ContactClientOnChange,
        handleSubmitContactClient,
        values
    })
}