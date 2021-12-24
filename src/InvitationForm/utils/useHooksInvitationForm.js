import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import moment from 'moment';
import "moment/locale/zh-cn";
import locale_fr from "antd/es/locale/fr_FR";
import locale_en from "antd/es/locale/en_US";
import {Link} from 'react-router-dom'
import i18n from "../../i18n/index";
// import {service} from "../../core/Service/service";
// import GenerateModal from "../GenerateModal/GenerateModal";

export const useHooksInvitationForm = () => {

    const [visible, setVisible] = useState(true);
    const [captcha, setCaptcha] = useState(false);
    const [condition, setConditions] = useState(false);
    const [show, setShow] = useState(false);
    const [videoUri, setVideoUri] = useState("");
    const [formLayout, setFormLayout] = useState('vertical');
    const [cryptext, setCryptext]=useState("")
    // eventHub.on('changeLang', changeLang)
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
    const history=useHistory()
    const format = 'HH:mm';
    const dateFormat = 'DD-MM-YYYY';
    console.log("cryptext",cryptext)
    const getTime = (time) => {
        var d = new Date(time);
        var h = addZero(d.getHours());
        var m = addZero(d.getMinutes());
        return h + ":" + m
    }
    const partipationOptions=[
        {
            id:1,
            value:"A distance ",
            name: 'A distance '
        },
        {
            id:2,
            value:"Présentiel ",
            name: 'Présentiel '
        }
    ]
    const [state, setState] = useState({
        lastName: "",
        firstName: "",
        email: "",
        participation:partipationOptions[0].value,
        lang: locale_fr,
        showRobot: true,
        errorEmail:false,
        errorExistEmail:false,
        empty:[]
    });
    const validateMessages = {
        required:  i18n.t("InvitationPage.validations.required"),
        exist : i18n.t('InvitationPage.validations.exist'),
        email:  i18n.t("InvitationPage.validations.email"),
        types: {
            lastName: "${label} "+ i18n.t("InvitationPage.validations.lastName"),
            firstName: "${label} "+ i18n.t("InvitationPage.validations.firstName"),
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
            info:{
                text:  i18n.t('InvitationPage.form.info.text'),
                link:  i18n.t('InvitationPage.form.info.link'),
            },
            success:{
               title:i18n.t('InvitationPage.form.success.title'),
               subscribed:i18n.t('InvitationPage.form.success.subscribed'),
               verif: i18n.t('InvitationPage.form.success.verif'),
            }
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
    useEffect(()=>{
        history && history.pathname && setCryptext( history.pathname.replace('/invitation/',''))

    },[])

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
        pushEmptyField("participation",value)
        setState({...state, participation:value, empty:state.empty})
    }
    const handleChangeFields = (event) =>{
        pushEmptyField(event.target.name,event.target.value )
        if(event.target.name==="email"){
            setState({...state, errorEmail:  !validateEmail(event.target.value)})
        }
        setState({...state,[event.target.name]: event.target.value, empty:state.empty})
    }
    // const handleChangeEmail = (event) => {
    //     if(!validateEmail(event)){
    //         setState({...state,email: event.target.value, errorEmail:true})
    //     }else{
    //         setState({...state, errorEmail:false})
    //     }
    // }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
            addTagText( "")
        }
    }
    const onFormLayoutChange = ({layout}) => {
        setFormLayout(layout);
    };
    const confirm = () => {
        setVisible(!visible)
    }
    const addTagText = (placeholder) =>{
        document.querySelector('.Form .ant-select-selection-search-input')
            .setAttribute("placeholder",placeholder)
    }
    const getTag = (props) => {
        let findIndex = state.emails.map(x => x.email).indexOf(props.value)
        return (findIndex > -1) ?
            <div className={`tagForm`}>
                                <span className={`tagTextForm`}>
                                    {props.value}
                                </span>
                <i className={"icon-close"} onClick={() => props.onClose()}></i>
                {
                    addTagText( i18n.t("validations.format"))
                }
            </div>: null
    }
    const submitForm = (event) => {
        let validated = false
        event.preventDefault()
        event.stopPropagation()
        if (state.email.length && state.lastName.length && state.firstName.length && state.participation.length) {
            validated = true
        } else if(validateEmail(state.email)) {
            validated = true
        } else {

            checkEmptyField();
            validated = false
        }

        // setState({...state,empty:validated})
        if (validated) {
            /** call api **/
            // let startDate = getDate(state.date) + "T" + getTime(state.time)
            // var dte = new Date(startDate);
            // dte.setHours(dte.getHours() + 1);
            // let endDate = getDate(dte) + "T" + getTime(dte)
            let data = {
                event: {
                    id: makeid(5).toLowerCase(),
                    summary: state.title,
                    // start: {"dateTime": startDate},
                    // end: {"dateTime": endDate},
                    organizer: {
                        email: state.email,
                        self: true
                    },
                    attendees: state.emails
                },
                client: "webinarplease",
                mode: "test"
            }
            // service.createWebinar(data).then(async (response) => {
            //     if(response.data.code===200 || response.status ===200){
            //         await setVideoUri(response.data.videoUri)
            //         await setShow(true)
            //         setTimeout(async function (e) {
            //             try {
            //                 form.resetFields();
            //                 form.setFieldsValue({
            //                     title: "",
            //                     email: "",
            //                     emails: [],
            //                     time: moment(getTime, format),
            //                     date: moment(new Date(), dateFormat),
            //                     condition:false
            //                 });
            //             } catch (e) {
            //                 console.log(e)
            //             }
            //             await setState({ showRobot: false})
            //             setTimeout(async function () {
            //                 await setState({ showRobot: true})
            //             }, 1000)
            //             await setState({title: "",
            //                 date: moment(new Date(), dateFormat),
            //                 time: moment(getTime, format),
            //                 email: "", emails: []})
            //             await setConditions(false)
            //         }, 500)
            //     }
            //
            // }).catch(error=>{
            //     console.log("error", error)
            //     setShow(false)
            //     message.error('Echec de création de webinar!');
            // })

        }

    }
    const checkEmptyField =  () => {
        let empty=state.empty;
        console.log("state", state)
        let requiresFields=["participation","lastName","firstName","email"]
         requiresFields.forEach(async field=>{
             await pushEmptyField(field, state[field])
        })
        console.log("empty", empty)
        setState({...state,empty:empty})
    }
    const pushEmptyField = (field,value) =>{
        let findIndex=state.empty.findIndex(x=>x===field)
        if(!value.length){
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
        if (!state.email.length || !state.participation.length || !state.lastName.length || !state.firstName.length) {
            return true
        } else {
            return false
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
    }
    return {
        formLayout,state,visible,setVisible,captcha,condition,show,videoUri,handleChangeCaptcha,handleChangeCondition,
        isEmptyField,submitForm,confirm,onFormLayoutChange,validateEmail,
        handleClear,handleChangeParticipation,partipationOptions,buttonItemLayout,
        getTime,getTag, handleChangeFields,validateMessages,FormDataSource,sendConfirm
    }
}
