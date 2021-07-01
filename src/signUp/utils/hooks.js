import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {SignUpReducer} from "../store/signUpReducer";
import {setSignUpConstraintDataOnchange, setSignUpOnchange} from "../store/signUpAction";
import {GraphQLFetchData} from "./graphQLFetchData";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";

export  const HooksSignUp=()=> {
    const dispatch = useDispatch()
    const valuesSignUp = useSelector((state) => state.SignUpReducer)
    const {CreateAccount}=GraphQLFetchData(valuesSignUp)

//******************generalInformation************************//
    const signUpOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setSignUpOnchange({
            SignUpNameChange: event.target.name,
            SignUpValueChange: event.target.value
        }));
        dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "signUpError",
            constraintDataValueChange: false
        }))
        console.log("hooks",valuesSignUp.constraintData.isMailValid)
        if (valuesSignUp.constraintData.isMailValid===true)
        {
            document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
            document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        }
    };

    const signUpOnChangeSelect = (value,action) => {
        console.log("event",action.name, action.value)
        dispatch(setSignUpOnchange({SignUpNameChange: action.name, SignUpValueChange: action.value}));
    };

    const handleSubmitSignUp = () => {
        dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "loadingSignUp",
            constraintDataValueChange: true
        }))
        CreateAccount()
    }

    return({
        signUpOnChange,
        signUpOnChangeSelect,
        valuesSignUp,
        handleSubmitSignUp
    })
}