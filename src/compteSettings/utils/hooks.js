import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange,
    setLoadingUpdatePassword,
    setSecurityAccountPassword
} from "../store/accountSettingsAction";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";



const Hooks=(callback)=> {

    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const values = useSelector((state) => state.AccountSettingsReducer)
    const valuesCredentiels = useSelector((state) => state.Reducer)

    console.log("valuesssskjfdghkjfdghkhdfjs",values)

//******************generalInformation************************//
    const generalInformationOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setGeneralInformationOnchange({generalInformationNameChange: event.target.name, generalInformationValueChange: event.target.value}));

        dispatch(setConstraintDataOnchange({
            constraintDataNameChange: "updateAccountSettingError",
            constraintDataValueChange: false
        }))
        document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
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
    const handleSubmit = async ()=>{
        await dispatch(setConstraintDataOnchange({constraintDataNameChange:"loadingUpdateAccountSetting",constraintDataValueChange:true}))
        if(values.generalInformation.vignette!==localStorage.getItem('avatar')){
            localStorage.setItem('avatar',values.generalInformation.vignette )
        }
        if(values.generalInformation.lastName!==localStorage.getItem('lastName')){
            localStorage.setItem('lastName',values.generalInformation.lastName)
        }
        if(values.generalInformation.firstName!==localStorage.getItem('firstName')){
            localStorage.setItem('firstName',values.generalInformation.firstName)
        }
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
    const generalInformationOnChangeAvatar= (avatar) => {
         dispatch(setGeneralInformationOnchange({
            generalInformationNameChange: "vignette",
            generalInformationValueChange: avatar
        }))
    };
    console.log("valuesPassword",values)
    return({
        generalInformationOnChangeSelect,
        generalInformationOnChange,
        handleSubmit,
        securityAccountPassword,
        handleSaveNewPassword,
        generalInformationOnChangeAvatar,
        values,
        darkMode,
        valuesCredentiels,
        //subscriptionOnChange
    })
}

export  default Hooks