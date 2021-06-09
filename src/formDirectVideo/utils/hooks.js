import React, { useState,useEffect,useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FormDirectVideoReducer} from "../store/formDirectVideoReducer";
import {setDarkMode} from "../../utils/redux/actions";
import {
    setDeleteSpeaker,
    setEditSpeaker,
    setModalSpeaker,
    setSpeaker,
    setSpeakerList,
    setSwitchSpeaker
} from "../store/formDirectVideoAction";

export  const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)

    const onChangeSwitch =(checked,event)=>{
        const valueSwitch = event.target.value
        console.log("name",event.target.value)
        dispatch(setSwitchSpeaker({valueSwitch:valueSwitch, checkedSwitch:checked}));
        values.SpeakerList.length < 2 &&valueSwitch==="switchSpeaker" &&dispatch(setModalSpeaker(checked));
    }

    const onChange=(event,nameSpeaker)=>{
        const value=event.target.value
        dispatch(setSpeaker({nameSpeaker,value}));
    }

    const addSpeaker = () => {
        dispatch(setModalSpeaker(true));
        dispatch(setEditSpeaker({id:null,name:"",lastName:"",title:"",email:""}))
    };

    const editSpeaker = (name,lastName,title,email,id) => {
        dispatch(setModalSpeaker(true));
        dispatch(setEditSpeaker({id,name,lastName,title,email}))
        console.log("azaez")
    };

    const deleteSpeaker = async (id) => {
        await dispatch(setDeleteSpeaker({id}))
        console.log("enteeeer",values.SpeakerList.length<2)
        values.SpeakerList.length<2&&dispatch(setSwitchSpeaker(false))
    };

    const handleOk = () => {
        dispatch(setSpeakerList(values.speaker));
        dispatch(setModalSpeaker(false));
    };

    const handleCancel = () => {
        dispatch(setModalSpeaker(false));
        console.log("enteeeeeeeeeer")
    };

    return({
        onChangeSwitch,
        handleOk,
        handleCancel,
        addSpeaker,
        editSpeaker,
        deleteSpeaker,
        onChange,
        values
    })
}