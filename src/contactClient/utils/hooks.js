import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ContactClientReducer} from "../store/ContactClientReducer";
import {setSignUpOnchange} from "../../signUp/store/signUpAction";
import {setContactClientOnchange, setLoadingEnvoieMail} from "../store/ContactClientAction";


export  const Hooks=(ContactClientMutationAction , form)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ContactClientReducer)
     console.log("valuesContactReduce",values)

//******************generalInformation************************//
    const ContactClientOnChange = (event) => {
        console.log("eventContactClient", event.target.value, event.target.name)
        dispatch(setContactClientOnchange({
            ContactClientNameChange: event.target.name,
            ContactClientValueChange: event.target.value
        }));
    };

    const handleSubmitContactClient = async ()=>{
        await ContactClientMutationAction()
        //loading Button
        dispatch(setLoadingEnvoieMail({
            loadingEnvoiMailNameChange: "loading",
            loadingEnvoiMailValueChange: true
        }))
    }

    return({
        ContactClientOnChange,
        handleSubmitContactClient,
        values
    })
}