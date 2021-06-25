import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInformationOnchange, setSecurityAccountPassword} from "../store/accountSettingsAction";
import {AccountSettingsReducer} from "../store/accountSettingsReducer";
import {Reducer} from "../../utils/redux/reducer";
//import {setSubscriptionOnchange} from "../store/accountSettingsAction";


export  const Hooks=(callback)=> {
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const values = useSelector((state) => state.AccountSettingsReducer)
    const valuesCredentiels = useSelector((state) => state.Reducer)

//******************generalInformation************************//
    const generalInformationOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setGeneralInformationOnchange({generalInformationNameChange: event.target.name, generalInformationValueChange: event.target.value}));
    };

    const generalInformationOnChangeSelect = (value,action) => {
        console.log("event",action.name, action.value)
        dispatch(setGeneralInformationOnchange({generalInformationNameChange: action.name, generalInformationValueChange: action.value}));
    };

//*******************subscription************************//
//     const subscriptionOnChange = (event) => {
//         console.log("event", event.target.value, event.target.name)
//         dispatch(setSubscriptionOnchange({generalNameChange: event.target.name, generalValueChange: event.target.value}));
//     };

//*******************Password************************//
    const securityAccountPassword = (event) => {
        console.log("eventSecurityAccount", event.target.value, event.target.name)
        dispatch(setSecurityAccountPassword({securityAccountNameChange: event.target.name, securityAccountValueChange: event.target.value}));
    }
    const handleSubmit = ()=>{
        callback()
    }
    //*******************Handle Save New Password**********//
    const handleSaveNewPassword =()=>{
        callback()
    }
    console.log("valuesPassword",values)
    return({
        generalInformationOnChangeSelect,
        generalInformationOnChange,
        handleSubmit,
        securityAccountPassword,
        handleSaveNewPassword,
        values,
        darkMode,
        valuesCredentiels
        //subscriptionOnChange
    })
}