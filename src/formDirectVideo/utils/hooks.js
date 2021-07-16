import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import 'moment-timezone';

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

const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)
    // values.form&&console.log("hooks-form",values.form.getFieldValue())
    const {CreateLive,generateSecuredPassword,themesDisplayQueryAction} = GraphQLFetchData(values)
    let matchesMedia = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width


    //******************General************************//
    const generalOnChangeByName =(value,event,name)=>{
        console.log("a",name,value)
        dispatch(setGeneralOnchange({generalNameChange:name, generalValueChange:value}));
    }
    const generalOnChange = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.value}));
    };

    const generalOnChangeButton = async (event) => {
        console.log("event",event.target)
        await dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.checked}));
        if(event.target.name==="securedPasswordOption")
        {
            event.target.checked&&generateSecuredPassword()
            !event.target.checked&&await dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:false}));
        }
    };

    const disablePastDate=(current)=>{
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }

    const startGetDisabledHours = () => {
        let hours = [];
        console.log("values.general.startDate",values.general.startDate)
        if (values.general.startDate&&values.general.startDate.format('YYYY-MM-DD') === moment().tz("Europe/Paris").format('YYYY-MM-DD')) {
            for (let i = 0; i < moment().tz("Europe/Paris").hour(); i++) {
                hours.push(i);
            }
        }
        // else if(finalHour)
        //     for (let i = 23; i > finalHour.hour() ; i--) {
        //         hours.push(i);
        //     }
        return hours;
    }

    const startGetDisabledMinutes = (selectedHour) => {
        let minutes= [];
        if (values.general.startDate&&values.general.startDate.format('YYYY-MM-DD') === moment().tz("Europe/Paris").format('YYYY-MM-DD')) {
            if (selectedHour === moment().tz("Europe/Paris").hour()) {
                for (let i = 0; i < moment().minute(); i++) {
                    minutes.push(i);
                }
            }
        }
        // else if(values.finalHour && selectedHour===values.finalHour.hour())
        //     for (let i = 59; i > (values.finalHour.minutes())-1; i--) {
        //         minutes.push(i);
        //     }
        return minutes;
    }


    //*****************Configuration************//
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
        event.target.name="visibleVideo" && themesDisplayQueryAction()
    };

    const ConfigurationOnChangeSelect = (value,action) => {
        console.log("event",action.name, action.value)
        dispatch(setConfigurationOnchange({configurationNameChange: action.name, configurationValueChange: action.value}));
    };

    const displayThemes=()=>{
        themesDisplayQueryAction()
    }

    const onChangeSpeaker=(event,nameSpeaker)=>{
        const valueSpeaker=event.target.value
        dispatch(setConfigurationSpeaker({nameSpeaker,valueSpeaker}));
    }

    const addSpeaker = () => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker:[]}))
    };

    const editSpeaker = (name,lastName,title,email,logoSpeaker,id) => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id,name,lastName,title,email,logoSpeaker: logoSpeaker

        }))
    };

    const deleteSpeaker = async (id) => {
        await dispatch(setConfigurationDeleteSpeaker({id}))
        console.log("enteeeer",values.configuration.SpeakerList.length<2)
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:false}))
        values.configuration.SpeakerList.length===1&&dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker: {}}))
    };

    const handleOk = () => {
        // form.validateFields()
        //     .then((values)=>{alert(values)})
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


    const handleSubmit =async ()=>{
        await dispatch(setConfigurationOnchange({
            configurationNameChange: "addSpeakerList", configurationValueChange:
                values.configuration.SpeakerList.map((el, i) => (
                    {
                        ...values.configuration.addSpeakerList,
                        name: el.name,
                        lastName: el.lastName,
                        function: el.title,
                        avatar: el.logoSpeaker[0].thumbUrl,
                        mail: el.email,

                    }
                ))
        }));
        CreateLive()
    }

    // Suppression des régles invitations

    const handleClickDelete =(name)=>{
        if(name === 1){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleInscription", invitationValueChangeRules:false}));
        }else if(name === 2){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelJ7", invitationValueChangeRules:false}));
        } else if(name === 3){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelJ1", invitationValueChangeRules:false}));
        }else if(name === 4){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelH1", invitationValueChangeRules:false}));
        }else if(name === 5){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleInscription2", invitationValueChangeRules:false}));
        }else if(name === 6){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelJ72", invitationValueChangeRules:false}));
        } else if(name === 7){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelJ12", invitationValueChangeRules:false}));
        }else if(name === 8){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"visibleRappelH12", invitationValueChangeRules:false}));
        }
    }


    return({
        generalOnChangeByName,
        generalOnChange,
        generalOnChangeButton,
        startGetDisabledHours,
        startGetDisabledMinutes,
        disablePastDate,
        configurationOnChangeByName,
        ConfigurationOnChangeSelect,
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
        displayThemes,
        values,
        matchesMedia,
        handleClickDelete
    })
}

export default Hooks