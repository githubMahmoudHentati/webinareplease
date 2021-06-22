import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setConnexionOnchange} from "../store/connexionAction";
import {ConnexionReducer} from "../store/connexionReducer";


export  const Hooks=()=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ConnexionReducer)

//******************connexion************************//
    const connexionOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setConnexionOnchange({
            ConnexionNameChange: event.target.name,
            ConnexionValueChange: event.target.value
        }));
    };

    const handleSubmit =()=>{

    }

    return({
        connexionOnChange,
        handleSubmit,
        values
    })
}