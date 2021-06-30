import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setGeneralInformationOnchange,
    setLoadingUpdatePassword,
    setSecurityAccountPassword
} from "../store/accountSettingsAction";



export  const Hooks=(callback)=> {

    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const values = useSelector((state) => state.AccountSettingsReducer)
    const valuesCredentiels = useSelector((state) => state.Reducer)

    console.log("valuesssskjfdghkjfdghkhdfjs",values)

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
        dispatch(setLoadingUpdatePassword({
            LoadingUpdatePasswordNameChange: "loadingUpdatePassword",
            LoadingUpdatePasswordValueChange: true
        }))
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