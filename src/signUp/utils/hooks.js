import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInformationOnchange} from "../../compteSettings/store/accountSettingsAction";
import {SignUpReducer} from "../store/signUpReducer";
import {setSignUpConstraintDataOnchange, setSignUpOnchange} from "../store/signUpAction";
import {GraphQLFetchData} from "./graphQLFetchData";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";

export  const Hooks=()=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.SignUpReducer)
    const {CreateAccount}=GraphQLFetchData(values)

//******************generalInformation************************//
    const signUpOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setSignUpOnchange({
            SignUpNameChange: event.target.name,
            SignUpValueChange: event.target.value
        }));
    };
    const signUpOnChangeSelect = (value,action) => {
        console.log("event",action.name, action.value)
        dispatch(setSignUpOnchange({SignUpNameChange: action.name, SignUpValueChange: action.value}));
    };

    const handleSubmit =()=>{
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:"loadingSignUp",constraintDataValueChange:true}))
        CreateAccount()
    }

    return({
        signUpOnChange,
        signUpOnChangeSelect,
        values,
        handleSubmit
    })
}