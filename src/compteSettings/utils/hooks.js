import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInformationOnchange} from "../store/accountSettingsAction";
import {AccountSettingsReducer} from "../store/accountSettingsReducer";
//import {setSubscriptionOnchange} from "../store/accountSettingsAction";


export  const Hooks=()=> {
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const values = useSelector((state) => state.AccountSettingsReducer)

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

    return({
        generalInformationOnChangeSelect,
        generalInformationOnChange,
        values,
        darkMode
        //subscriptionOnChange
    })
}