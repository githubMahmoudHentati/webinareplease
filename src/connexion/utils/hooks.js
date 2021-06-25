import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";
import {ConnexionReducer} from "../store/connexionReducer";
import {GraphQLFetchData} from "./graphQLFetchData";


export  const Hooks=()=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ConnexionReducer)
    const {Connexion}=GraphQLFetchData(values)
//******************connexion************************//
    const connexionOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setConnexionOnchange({
            ConnexionNameChange: event.target.name,
            ConnexionValueChange: event.target.value
        }));
    };

    const handleSubmit =()=>{
        dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:true}))
        Connexion()
    }

    return({
        connexionOnChange,
        handleSubmit,
        values
    })
}