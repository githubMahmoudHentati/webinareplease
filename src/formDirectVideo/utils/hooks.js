import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setConfigurationInitialSpeaker,
    setConfigurationOnchange,
    setConfigurationSpeaker,
    setConfigurationDeleteSpeaker,
    setConfigurationSpeakerList,
    setGeneralOnchange,
    setInvitationOnchange,
    setInvitationOnchangeRules
} from "../store/formDirectVideoAction";
import {setSignUpOnchange} from "../../signUp/store/signUpAction";
import {GraphQLFetchData} from "./graphQLFetchData";

export  const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)
    const {CreateLive} = GraphQLFetchData(values)


    //***************General************************//
    const generalOnChangeByName =(value,event,name)=>{
        console.log("a",name,value)
        dispatch(setGeneralOnchange({generalNameChange:name, generalValueChange:value}));
    }
    const generalOnChange = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.value}));
    };

    const generalOnChangeButton = (event) => {
        dispatch(setGeneralOnchange({generalNameChange:event.target.value, generalValueChange:event.target.checked}));
    };


    //**************Configuration************//
    const configurationOnChangeByName =(value,name)=>{
        dispatch(setConfigurationOnchange({configurationNameChange:name, configurationValueChange:value}));
        values.configuration.SpeakerList.length < 2 &&name==="switchSpeaker" &&dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:value}));
    }

    const configurationOnChangeButton = (event) => {
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.value, configurationValueChange:event.target.checked}));
    };

    const configurationOnChange = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.name, configurationValueChange:event.target.value}));
    };



    const onChangeSpeaker=(event,nameSpeaker)=>{
        const valueSpeaker=event.target.value
        dispatch(setConfigurationSpeaker({nameSpeaker,valueSpeaker}));
    }

    const addSpeaker = () => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker:{}}))
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
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker: {}}))
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

    //**************Invitation************//

    const InvitationOnChangeChecked = (event) => {
        dispatch(setInvitationOnchangeRules({invitationNameChangeRules:event.target.value, invitationValueChangeRules:event.target.checked}));
    };

    const invitationOnChangeSelect = (value,event,name) => {
        console.log("event",value,name)
        //let listTags= (...[],option)
        dispatch(setInvitationOnchange({invitationNameChange:name, invitationValueChange:value}));
    };


    const handleSubmit =()=>{
        CreateLive()
    }

    return({
        generalOnChangeByName,
        generalOnChange,
        generalOnChangeButton,
        configurationOnChangeByName,
        handleOk,
        handleCancel,
        addSpeaker,
        editSpeaker,
        deleteSpeaker,
        onChangeSpeaker,
        configurationOnChange,
        configurationOnChangeButton,
        InvitationOnChangeChecked,
        invitationOnChangeSelect,
        handleSubmit,
        values
    })
}