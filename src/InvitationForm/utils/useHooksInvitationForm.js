import React, {useState, useEffect} from 'react';
import moment from 'moment';
import "moment/locale/zh-cn";
import locale_fr from "antd/es/locale/fr_FR";
import locale_en from "antd/es/locale/en_US";
import {Link} from 'react-router-dom'
import i18n from "../../i18n/index";
import {useSelector,useDispatch} from 'react-redux'
import {setSelectedField, setSelectedParticipationField, setVisibleInscriptionPage} from '../store/InvitationFormAction'
import {useGraphQLFetchDataForm} from "./graphQLFetchDataForm";
export const useHooksInvitationForm = () => {

    const [visible, setVisible] = useState(true);
    const [captcha, setCaptcha] = useState(false);
    const [condition, setConditions] = useState(false);
    const [show, setShow] = useState(false);
    const [videoUri, setVideoUri] = useState("");
    const [formLayout, setFormLayout] = useState('vertical');
    const infoToRegister= useSelector((state)=>state.InvitationReducer.infoToRegister)
    const selectedParticipation= useSelector(state=>state.InvitationReducer.selectedParticipation)
    const cryptext= useSelector((state)=>state.InvitationReducer.cryptext)
    const {confirmRegistration} = useGraphQLFetchDataForm(cryptext)
    const dispatch = useDispatch()
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 14,
                    offset: 4,
                },
            }
            : null;
    moment.locale(localStorage.getItem("set-lang") || 'fr');

    const format = 'HH:mm';
    const dateFormat = 'DD-MM-YYYY';
    const getTime = (time) => {
        var d = new Date(time);
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + ":" + m
    }
    const [state, setState] = useState({
        lastNameInvitor: "",
        firstNameInvitor: "",
        email: "",
        participation:[
            {
                id:1,
                name:`A distance `,
                value:0,
            },
            {
                id:2,
                name:`Présentiel `,
                value:0,
            }
        ],
        selectedParticipation:{
            id:1,
            name:`A distance `,
            value:0,
        },
        lang: locale_fr,
        showRobot: true,
        errorEmail:false,
        errorExistEmail:false,
        empty:[],
        date: "",
        description: "",
        title:"",
        defaultParticipationValue : ""
    });
    const validateMessages = {
        required:  i18n.t("InvitationPage.validations.required"),
        exist : i18n.t('InvitationPage.validations.exist'),
        email:  i18n.t("InvitationPage.validations.email"),
        types: {
            lastNameInvitor: "${label} "+ i18n.t("InvitationPage.validations.lastName"),
            firstNameInvitor: "${label} "+ i18n.t("InvitationPage.validations.firstName"),
            email: "${label} "+ i18n.t("InvitationPage.validations.email"),
        },
    };

    const FormDataSource={
        form:{
            participation:i18n.t('InvitationPage.form.participation') ,
            organised:i18n.t('InvitationPage.form.organised') ,
            firstName:i18n.t('InvitationPage.form.firstName'),
            lastName:i18n.t('InvitationPage.form.lastName'),
            email:i18n.t('InvitationPage.form.email'),
            signup:i18n.t('InvitationPage.form.signup'),
            return:i18n.t('InvitationPage.form.return'),
            send:i18n.t('InvitationPage.form.send'),
            confirm:i18n.t('InvitationPage.form.confirm') ,
            resend:i18n.t('InvitationPage.form.resend'),
            date:i18n.t('InvitationPage.form.date'),
            time:i18n.t('InvitationPage.form.time'),
            info:{
                text:  i18n.t('InvitationPage.form.info.text'),
                link:  i18n.t('InvitationPage.form.info.link'),
            },
            success:{
               title:i18n.t('InvitationPage.form.success.title'),
               subscribed:i18n.t('InvitationPage.form.success.subscribed'),
               verif: i18n.t('InvitationPage.form.success.verif'),
            },
            places:i18n.t('InvitationPage.form.places'),
            successSend:i18n.t('InvitationPage.form.successSend'),
            verif:i18n.t('InvitationPage.form.verif')
        },
        successWebinar:{
            image:"../../../public/assets/images/success.png",
            title: i18n.t("modal.title"),
            ok: i18n.t("modal.ok"),
            access: i18n.t("modal.access"),
            copy: i18n.t("modal.copy"),
            copied: i18n.t("modal.copied"),
            upload:i18n.t("modal.upload")
        }
    }
    const getDefaultParticipation = ( ) =>{
        return  state.selectedParticipation.name  +  ' — ' + state.selectedParticipation.value  +  FormDataSource.form.places
    }
    useEffect(()=>{
        console.log("use effect infoToRegister", infoToRegister)
        if(infoToRegister && Object.keys(infoToRegister).length> 0)
        setState({...state, ...infoToRegister, selectedParticipation: infoToRegister.selectedParticipation,})//, selectedParticipation: infoToRegister.selectedParticipation

    },[infoToRegister])
    // useEffect(()=>{
    //     if(infoToRegister && Object.keys(infoToRegister).length)
    //     setState({...state,...infoToRegister })
    //
    // },[ infoToRegister.errorExistEmail])
    async function changeLang(lang) {
        let locale=lang.code==="fr" ? locale_fr : locale_en
        await setState({...state, lang: locale})
    }

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    function handleOk(){
        setShow(false);
    }
    function handleCancel(){
        setShow(false);
    }
    const handleChangeParticipation= (value) => {
        console.log("handleChangeParticipation value************",value)
        pushEmptyField("participation",value)

        dispatch(setSelectedParticipationField({payload: value}))
        // setState({...state, selectedParticipation:value, empty:state.empty})
    }
    const handleChangeFields = (event) =>{
        pushEmptyField(event.target.name,event.target.value )
        setState({...state,[event.target.name]: event.target.value, empty:state.empty})
        dispatch(setSelectedField({payload:{name:event.target.name, value:event.target.value}}))
    }
    // const handleChangeEmail = (event) => {
    //     if(!validateEmail(event)){
    //         setState({...state,email: event.target.value, errorEmail:true})
    //     }else{
    //         setState({...state, errorEmail:false})
    //     }
    // }

    const  validateEmail = (email) => {
        console.log("email", email)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid=re.test(String(email).toLowerCase())
        console.log("isValid", isValid)
        if(email.length){
            setState({...state,errorEmail: !isValid, errorExistEmail: false})
            dispatch(setSelectedField({payload:{name:"errorEmail",value:!isValid }}))
            dispatch(setSelectedField({payload:{name:"errorExistEmail",value:!isValid }}))
        }
        return isValid;
    }

    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleClear = (value) => {
        let emails = state.emails
        let findIndex = emails.map(x => x.email).indexOf(value)
        if (findIndex > -1) {
            emails.splice(findIndex, 1)
        }
        setState({...state, emails: emails})
        if(!state.emails.length){
            // addTagText( "")
        }
    }
    const onFormLayoutChange = ({layout}) => {
        setFormLayout(layout);
    };
    const confirm = () => {
        setVisible(!visible)
    }

    const checkFields = () =>{
        let validEmail=validateEmail(state.email)
        console.log("checkFields---------validEmail ",validEmail)
        let notEmptyFields= !emptyFields()
        console.log("checkFields---------notEmptyFields ",notEmptyFields)
        console.log("infoToRegister.errorExistEmail",infoToRegister.errorExistEmail)
        console.log("validEmail && !infoToRegister.errorExistEmail && notEmptyFields ",validEmail && !infoToRegister.errorExistEmail && notEmptyFields )
        return validEmail && !infoToRegister.errorExistEmail && notEmptyFields
    }
    const emptyFields = () =>{
        let lengthFields= state.lastNameInvitor.length> 0 && state.firstNameInvitor.length> 0
        console.log("emptyfields = ",lengthFields)
        let emptyFields=!lengthFields &&  checkEmptyField();
        // if(lengthFields){
        //     return false;
        // }else{
        //      checkEmptyField();
        // }
        console.log("emptyFields----------------",emptyFields)
        return emptyFields
    }
    const checkEmptyField =   () => {
        let empty=state.empty;
        console.log("state", state)
        let requiresFields=["participation","lastNameInvitor","firstNameInvitor","email"]
         requiresFields.forEach(async field=>{
            await pushEmptyField(field, state[field])
        })

        console.log("checkEmptyField*****empty", empty)
        if(!empty.length){
            empty=[]
        }
        setState({...state,empty:empty})
        let isEmpty=empty.length>0;
        console.log("isEmpty",isEmpty)
        return isEmpty

    }
    const pushEmptyField = (field,value) =>{
        let findIndex=state.empty.findIndex(x=>x===field)
        if(!value){
            if(findIndex===-1){
                state.empty.push(field)
            }
        }else{
            if(findIndex>-1){
                state.empty.splice(findIndex,1)
            }
        }
    }
    const isEmptyField = () => {
        if (!state.email.length  || !state.lastNameInvitor.length || !state.firstNameInvitor.length) {
            return true
        } else {
            return false
        }
    }
    const submitForm = (event) => {

        event.preventDefault()
        event.stopPropagation()
        let validated =  checkFields()

        // setState({...state,empty:validated})
        console.log("validated",validated)
        if (validated) {
            console.log("state.selectedParticipation",state.selectedParticipation)
            console.log("state.participation",state.participation)
            let selectedParticipation=state.participation.find(x=>x.id === state.selectedParticipation.id)
            console.log("findIdexSelectedParticipation",selectedParticipation)
            let data= {
                cryptext : cryptext,
                email: state.email,
                input:{
                    isOnline:selectedParticipation.id,
                    name:state.firstNameInvitor,
                    surname:state.lastNameInvitor
                }
            }
            confirmRegistration({variables: data})
        }

    }


    function handleChangeCondition(event) {
        setConditions(event.target.checked)
    }

    function handleChangeCaptcha(event) {
        setCaptcha(event)
    }
    const sendConfirm = () =>{
        console.log("sendConfirm")
        /** todo add api send confirm inscription **/
        dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: false,confirm:false, confirmSuccess:true}}))

    }

    const handleConfirmPage = () =>{
        console.log("handleConfirmPage****click")
        dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: false,confirm:true, confirmSuccess:false}}))
    }
    const handleConfirmSuccessPage = () =>{
        console.log("handleConfirmPage****click")
        dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: false,confirm:false, confirmSuccess:true}}))
    }
    const returnToInscription = () =>{
        console.log("returnToInscription****click")
        dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: true,confirm:false, confirmSuccess:false}}))
    }
    return {
        formLayout,state,visible,setVisible,captcha,condition,show,videoUri,handleChangeCaptcha,handleChangeCondition,
        isEmptyField,submitForm,confirm,onFormLayoutChange,validateEmail,
        handleClear,handleChangeParticipation,buttonItemLayout,getDefaultParticipation,
        getTime, handleChangeFields,validateMessages,FormDataSource,sendConfirm,infoToRegister,
        handleConfirmPage,handleConfirmSuccessPage,returnToInscription
    }
}
