
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
    setInvitationOnchangeRules, setFormDirectLiveConstraintDataOnchange, setDatePlanFormat
} from "../store/formDirectVideoAction";
import {GraphQLFetchDataForm} from "./graphQLFetchDataForm";
import useWindowDimensions from "../../utils/components/getWindowDimensions";
import {setDirectSetting} from "../../utils/redux/actions";
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {useEffect} from "react";

const Hooks=()=>{
    const dispatch = useDispatch()
    const values = useSelector((state)=> state.FormDirectVideoReducer)
    const {CreateLive,UpdateLive,generateSecuredPassword,themesDisplayQueryAction,idLive} = GraphQLFetchDataForm(values)
    let matchesMedia   = useWindowDimensions()  // fonction js pour afficher interface seulement en 767px de width

    const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: "smooth" })


    //******************General************************//
    const generalOnChangeByName =(value,event,name)=>{
        dispatch(setGeneralOnchange({generalNameChange:name, generalValueChange:event}));
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:true}))
    }

    const generalOnChange = (event) => {
        dispatch(setGeneralOnchange({generalNameChange:event.target.name, generalValueChange:event.target.value}))
        if(event.target.name==="pwd"){
            dispatch(setGeneralOnchange({generalNameChange:"securedPasswordOption", generalValueChange:false}))
        }
        if(event.target.value==="freeAccess"){
            dispatch(setGeneralOnchange({generalNameChange:"pwd", generalValueChange:""}))
            dispatch(setGeneralOnchange({generalNameChange:"securedPasswordOption", generalValueChange:false}))
        }
        event.target.value==="liveAccess"&&dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:true}))
    }

    const generalOnChangeButton = async (event) => {
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
        if (indexPost===indexPost && values.socialTools[indexPost]&&values.socialTools[indexPost].plan){
            if (values.socialTools[indexPost].plan[indexPlan].startDate&&dateType==="endDate")
                return  moment(values.socialTools[indexPost].plan[indexPlan].startDate,"YYYY-MM-DDTHH:mm:ss+01:00").isAfter(current)
            if (values.socialTools[indexPost].plan[indexPlan].endDate&&dateType==="startDate")
                return  moment(values.socialTools[indexPost].plan[indexPlan].endDate,"YYYY-MM-DDTHH:mm:ss+01:00").isBefore(current) || current < moment().startOf('day')
            else
                return current && current < moment().startOf('day')
        }
        if (values.general.startHour&&moment(values.general.startHour,'HH:mm').isSameOrBefore(moment().tz("Europe/Paris"))) {
            return  current.isSameOrBefore(moment())
        } else
            return current && current < moment().startOf('day');
    }

    const startGetDisabledHours = () => {
        let hours = [];
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
            if (selectedHour===-1) {
                for (let i = 0; i < 60; i++) {
                    minutes.push(i);
                }
            }
            else if (selectedHour === moment().tz("Europe/Paris").hour()) {
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
        name==="liveAutomaticArchiving"&&dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:true}))
    }
    const configurationOnChangeByNameSwitch = (value , name) =>{
        dispatch(setConfigurationOnchange({configurationNameChange:name, configurationValueChange:value}));
    }

    const configurationOnChangeButton = async (event) => {

        await dispatch(setConfigurationOnchange({configurationNameChange:event.target.value, configurationValueChange:event.target.checked}));
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:true}))


    };

    const configurationOnChange = (event) => {

        console.log("event",event.target.value,event.target.name)
        dispatch(setConfigurationOnchange({configurationNameChange:event.target.name, configurationValueChange:event.target.value}));
        event.target.value==="visibleVideo" && themesDisplayQueryAction()

        if(event.target.value==="notVisibleVideo"){
            dispatch(setConfigurationOnchange({configurationNameChange:"theme", configurationValueChange:[]}))
        }

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
    };

    //**************Invitation************//

    const InvitationOnChangeChecked = (event) => {
        dispatch(setInvitationOnchangeRules({invitationNameChangeRules:event.target.value, invitationValueChangeRules:event.target.checked}));
    };

    const invitationOnChangeSelect = (value,event,name) => {
        console.log("event",value,name)
        //let listTags= (...[],option)
        dispatch(setInvitationOnchange({invitationNameChange:"emails", invitationValueChange:value}));
    };

    //************************Common Function***********************//



    const handleSubmit =async (e)=>{
        if (e.code === 'Enter') debugger;
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingCreateEditLive",constraintDataValueChange:true}));
        dispatch(setConfigurationOnchange({
            configurationNameChange: "addSpeakerList", configurationValueChange:
                values.configuration.SpeakerList.map((el, i) => (
                    {
                        ...values.configuration.addSpeakerList,
                        name: el.name,
                        lastName: el.lastName,
                        function: el.title,
                        avatar: el.logoSpeaker && el.logoSpeaker.length ? el.logoSpeaker[0].thumbUrl.substring(el.logoSpeaker[0].thumbUrl.lastIndexOf("/")+ 1,el.logoSpeaker[0].thumbUrl.length) : '',
                        mail: el.email,

            }
                ))
        }));
        let newStartDate= !values.general.liveAction?"":typeof values.general.startDate!="string"?(values.general.startDate).format('YYYY-MM-DD'):values.general.startDate
        let newStartHour= !values.general.liveAction?"":typeof values.general.startHour!="string"?(values.general.startHour).format('HH:mm'):values.general.startHour
        // let period = typeof values.general.period!="string"? values.general.period.format('HH:mm:ss'):values.general.period;
        dispatch(setGeneralOnchange({generalNameChange:"startDate", generalValueChange:newStartDate}));
        dispatch(setGeneralOnchange({generalNameChange:"startHour", generalValueChange:newStartHour}));

        dispatch(setDatePlanFormat());

        dispatch(setGeneralOnchange({generalNameChange:"period", generalValueChange:!values.general.liveAction?"":typeof values.general.period!="string"&&values.general.period===!null? moment(values.general.period).format('HH'):values.general.period===null?"":values.general.period}));
        idLive?UpdateLive():CreateLive()

    }

    const checkKeyDown =(e)=>{
        console.log("e.code-----",e)
        console.log("e.code-----",e.code)
        if (e.keyCode === 13) e.preventDefault();
    }

    // Suppression des r??gles invitations

    const handleClickDelete =(name)=>{
        if(name === 1){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"afterPrograming", invitationValueChangeRules:false}));
        }else if(name === 2){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"beforeWeek", invitationValueChangeRules:false}));
        } else if(name === 3){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"beforeDay", invitationValueChangeRules:false}));
        }else if(name === 4){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"beforeHour", invitationValueChangeRules:false}));
        }else if(name === 5){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"afterSubscription", invitationValueChangeRules:false}));
        }else if(name === 6){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"isParticiped", invitationValueChangeRules:false}));
        } else if(name === 7){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"notVisualized", invitationValueChangeRules:false}));
        }else if(name === 8){
            dispatch(setInvitationOnchangeRules({invitationNameChangeRules:"replay", invitationValueChangeRules:false}));
        }
    }
    const sendPostMessage = (info, value)=>{
        const iframeEl = document
            .getElementById('TemplatesIframe');
        if(iframeEl){
            iframeEl.contentWindow.postMessage(
                ({info: info , value: value }),
                '*',
            );
        }

    }
    const generalInformationOnChangeAvatar= (avatar) => {
        dispatch(setGeneralInformationOnchange({
            generalInformationNameChange: "vignette",
            generalInformationValueChange: avatar
        }))
        dispatch(setConstraintDataOnchange({
            constraintDataNameChange: "avatarLoading",
            constraintDataValueChange: false
        }))
    };

    const handleChangeGuestRemotly = (event) => {
        if(event === null){
            dispatch(setInvitationOnchange({
                invitationNameChange: "maxOnlineGuests",
                invitationValueChange: 0
            }))
        }else{
        dispatch(setInvitationOnchange({
            invitationNameChange: "maxOnlineGuests",
            invitationValueChange: event
        }))
        }
    }
    const handleChangeGuestPresentiel = (event) => {
        if(event === null){
            dispatch(setInvitationOnchange({
                invitationNameChange: "maxOnsiteGuests",
                invitationValueChange: 0
            }))
        }else {
        dispatch(setInvitationOnchange({
            invitationNameChange: "maxOnsiteGuests",
            invitationValueChange: event
        }))
        }
    }
    const handleChange =(value)=>{
        console.log(`selected ${value}`);
        dispatch(setConfigurationOnchange({configurationNameChange:"languages", configurationValueChange:value}));
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
        getFirstCharacter,
        sendPostMessage,
        checkKeyDown,
        scrollToRef,
        generalInformationOnChangeAvatar,
        handleChangeGuestRemotly,
        handleChangeGuestPresentiel,
        handleChange,
        configurationOnChangeByNameSwitch
    })
}

export default Hooks