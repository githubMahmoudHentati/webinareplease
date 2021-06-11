import React, { useState,useEffect,useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormDirectVideoReducer} from "../store/formDirectVideoReducer";
import {setDarkMode} from "../../utils/redux/actions";
import {
    setConfigurationInitialSpeaker,
    setConfigurationOnchange,
    setConfigurationSpeaker,
    setConfigurationDeleteSpeaker, setConfigurationSpeakerList, setGeneralOnchange
} from "../store/formDirectVideoAction";

export  const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)


    //***************General************************//
    const generalOnChangeSwitch =(checked,event,valueSwitch)=>{
        console.log("a",event.target.value,checked)
        dispatch(setGeneralOnchange({generalNameChange:valueSwitch, generalValueChange:checked}));
    }
    const generalOnChange = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.value}));
    };

    const generalOnChangeButton = (event) => {
        dispatch(setGeneralOnchange({generalNameChange:event.target.value, generalValueChange:event.target.checked}));
    };


    //**************Configuration************//
    const configurationOnChangeSwitch =(checked,event,valueSwitch)=>{
        dispatch(setConfigurationOnchange({configurationNameChange:valueSwitch, configurationValueChange:checked}));
        values.configuration.SpeakerList.length < 2 &&valueSwitch==="switchSpeaker" &&dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:checked}));
    }

    const configurationOnChangeButton = (event) => {
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.value, configurationValueChange:event.target.checked}));
    };

    const onChangeCheckbox = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.name, configurationValueChange:event.target.value}));
    };


    const onChangeSpeaker=(event,nameSpeaker)=>{
        const valueSpeaker=event.target.value
        dispatch(setConfigurationSpeaker({nameSpeaker,valueSpeaker}));
    }

    const addSpeaker = () => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:""}))
    };

    const editSpeaker = (name,lastName,title,email,id) => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id,name,lastName,title,email}))
        console.log("azaez")
    };

    const deleteSpeaker = async (id) => {
        await dispatch(setConfigurationDeleteSpeaker({id}))
        console.log("enteeeer",values.configuration.SpeakerList.length<2)
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:false}))
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:""}))
    };

    const handleOk = () => {
        dispatch(setConfigurationSpeakerList(values.configuration.speaker));
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:false}));
    };

    const handleCancel = () => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:false}));
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:false}))
        console.log("enteeeeeeeeeer")
    };

    return({
        generalOnChangeSwitch,
        generalOnChange,
        generalOnChangeButton,
        configurationOnChangeSwitch,
        handleOk,
        handleCancel,
        addSpeaker,
        editSpeaker,
        deleteSpeaker,
        onChangeSpeaker,
        onChangeCheckbox,
        configurationOnChangeButton,
        values
    })
}