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
    setInvitationOnchangeRules, setFormDirectLiveConstraintDataOnchange
} from "../store/formDirectVideoAction";
import {setSignUpOnchange} from "../../signUp/store/signUpAction";
import {GraphQLFetchDataForm} from "./graphQLFetchDataForm";
import useWindowDimensions from "../../utils/components/getWindowDimensions";

const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)
    // values.form&&console.log("hooks-form",values.form.getFieldValue())
    const {CreateLive,UpdateLive,generateSecuredPassword,themesDisplayQueryAction,idLive} = GraphQLFetchDataForm(values)
    let matchesMedia   = useWindowDimensions()  // fonction js pour afficher interface seulement en 767px de width


    //******************General************************//
    const generalOnChangeByName =(value,event,name)=>{
        console.log("testtest",name,value)
        dispatch(setGeneralOnchange({generalNameChange:name, generalValueChange:value}));
    }
    const generalOnChange = (event) => {
        console.log("event",event.target.value,event.target.name)
        dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.value}))
        if(event.target.name==="pwd"){
            dispatch(setGeneralOnchange({generalNameChange:"securedPasswordOption", generalValueChange:false})) ;}


    };

    const generalOnChangeButton = async (event) => {
        console.log("event",event.target)
        await dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.checked}))&&dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:false}));
        if(event.target.name==="securedPasswordOption")
        {
            event.target.checked?generateSecuredPassword():dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:false}));
        }

    };
    const getFirstCharacter = (item)=>{
        const finalUserName=  item.name.toUpperCase().split('').shift() + item.lastName.toUpperCase().split('').shift();
        return finalUserName
    }
    const disablePastDate=(current,indexPost,indexPlan,dateType)=>{
        // Can not select days before today and today
         console.log("currenttt",indexPost )
        if (indexPost===0 && values.socialTools[indexPost]&&values.socialTools[indexPost].plan){
            if (values.socialTools[indexPost].plan[indexPlan].startDate&&dateType==="endDate")
                return  moment(values.socialTools[indexPost].plan[indexPlan].startDate,"YYYY-MM-DDTHH:mm:ss+01:00").isAfter(current)
            if (values.socialTools[indexPost].plan[indexPlan].endDate&&dateType==="startDate")
                return  moment(values.socialTools[indexPost].plan[indexPlan].endDate,"YYYY-MM-DDTHH:mm:ss+01:00").isBefore(current) || current < moment().startOf('day')
            else
                return current && current < moment().startOf('day')
        }
        return current && current < moment().startOf('day');
    }

    const startGetDisabledHours = () => {
        let hours = [];
        console.log("values.general.startDate",values.general.startDate)
        if (values.general.startDate&&moment(values.general.startDate).format('YYYY-MM-DD') === moment().tz("Europe/Paris").format('YYYY-MM-DD')) {
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
        if (values.general.startDate&&moment(values.general.startDate).format('YYYY-MM-DD') === moment().tz("Europe/Paris").format('YYYY-MM-DD')) {
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
        values.configuration.SpeakerList.length < 1 &&name==="switchSpeaker" &&dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:value}));
    }

    const configurationOnChangeButton = (event) => {

        dispatch(setConfigurationOnchange({configurationNameChange:event.target.value, configurationValueChange:event.target.checked}));

    };

    const configurationOnChange = (event) => {

        console.log("event",event.target.value,event.target.name)
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.name, configurationValueChange:event.target.value}));
        event.target.value==="visibleVideo" && themesDisplayQueryAction()
    };

    const ConfigurationOnChangeSelect = (value,action,name) => {

        console.log("event-select",action)
        dispatch(setConfigurationOnchange({configurationNameChange: name, configurationValueChange: value}));
    };

    const displayThemes=()=>{
        themesDisplayQueryAction()
    }

    const onChangeSpeaker=(event,nameSpeaker)=>{
        const valueSpeaker=event && event.target ?  event.target.value : event
        dispatch(setConfigurationSpeaker({nameSpeaker,valueSpeaker}));

    }

    const addSpeaker = () => {
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker:[]}))
    };

    const editSpeaker = (name,lastName,title,email,logoSpeaker,id) => {
console.log("editid",id)
        console.log("SpeakerListedit",values.configuration.SpeakerList)
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:true}));
        dispatch(setConfigurationInitialSpeaker({id:id,name,lastName,title,email,logoSpeaker: logoSpeaker}))
    };

    const deleteSpeaker = async (id) => {
        await dispatch(setConfigurationDeleteSpeaker({id}))
        console.log("enteeeer",values.configuration.SpeakerList.length<1)
        values.configuration.SpeakerList.length===0&&dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:false}))
        values.configuration.SpeakerList.length===0&&dispatch(setConfigurationInitialSpeaker({id:null,name:"",lastName:"",title:"",email:"",logoSpeaker: []}))
    };

    const handleOk = () => {
        // form.validateFields()
        //     .then((values)=>{alert(values)})
        dispatch(setConfigurationSpeakerList(values.configuration.speaker));
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:false}));
    };

    const handleCancel = () => {

        let initSpeaker={id: null, name: "", lastName: "", title: "", email: "", logoSpeaker: []}
        for(const [key , value] of Object.entries(initSpeaker)){
            onChangeSpeaker(value, key)
        }
        dispatch(setConfigurationOnchange({configurationNameChange:"modalSpeaker", configurationValueChange:false}));
         values.configuration.SpeakerList.length<=0&&
        dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:false}))
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
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingCreateEditLive",constraintDataValueChange:true}));
        dispatch(setConfigurationOnchange({
            configurationNameChange: "addSpeakerList", configurationValueChange:
                values.configuration.SpeakerList.map((el, i) => (
                    {
                        ...values.configuration.addSpeakerList,
                        name: el.name,
                        lastName: el.lastName,
                        function: el.title,
                        avatar: el.logoSpeaker && el.logoSpeaker.length ? el.logoSpeaker[0].thumbUrl : '',
                        mail: el.email,
                    }
                ))
        }));
        let newStartDate= typeof values.general.startDate!="string"?(values.general.startDate).format('YYYY-MM-DD'):values.general.startDate
        let newStartHour= typeof values.general.startHour!="string"?(values.general.startHour).format('HH:mm:ss'):values.general.startHour
        dispatch(setGeneralOnchange({generalNameChange:"startDate", generalValueChange:newStartDate}));
        dispatch(setGeneralOnchange({generalNameChange:"startHour", generalValueChange:newStartHour}));
        idLive?UpdateLive():CreateLive()
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
        handleClickDelete,
        getFirstCharacter
    })
}

export default Hooks