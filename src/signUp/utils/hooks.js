import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInformationOnchange} from "../../compteSettings/store/accountSettingsAction";
import {SignUpReducer} from "../store/signUpReducer";
import {setSignUpOnchange} from "../store/signUpAction";

export  const Hooks=()=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.SignUpReducer)

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
          console.log("submitInscris", values)
    }

    return({
        signUpOnChange,
        signUpOnChangeSelect,
        handleSubmit,
        values
    })
}