import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";
import {ConnexionReducer} from "../store/connexionReducer";
import {GraphQLFetchData} from "./graphQLFetchData";


export  const Hooks=(connexionAction)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ConnexionReducer)
//******************connexion************************//
    const connexionOnChange = async (event) => {
        console.log("event", event.target.value, event.target.name)
        await dispatch(setConnexionOnchange({
            ConnexionNameChange: event.target.name,
            ConnexionValueChange: event.target.value
        }));
        dispatch(setConnexionConstraintDataOnchange({
            constraintDataNameChange: "connexionError",
            constraintDataValueChange: false
        }))
        document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
    };

    const handleSubmit=async ()=>{
        await dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:true}))
        connexionAction()
    }

    return({
        connexionOnChange,
        handleSubmit,
        values
    })
}