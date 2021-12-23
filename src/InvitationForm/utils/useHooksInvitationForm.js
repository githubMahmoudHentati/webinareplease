import React, {useState} from 'react';

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
    // eventHub.on('changeLang', changeLang)
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
        title: "",
        date: moment(new Date(), dateFormat),
        time: moment(getTime(new Date()), format),
        email: "",
        emails: [],
        lang: locale_fr,
        showRobot: true,
        errorEmail:false,
        errorExistEmail:false
    });

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

    const getDate = (date) => {
        var date = new Date(date)
        var y = addZero(date.getUTCFullYear())
        var m = addZero(date.getUTCMonth() + 1)
        var d = addZero(date.getUTCDate())
        return y + "-" + m + "-" + d
    }
    const handleChangeTitle = (e) => {
        setState({...state, title: e.target.value})
    }
    const handleChangeEmail = (e) => {
        setState({...state, email: e.target.value})

    }
    const handleChangeDate = (date, dateString) => {
        let currentDate = date && dateString ? moment(new Date(date), dateFormat) : moment(new Date(), dateFormat)
        setState({...state, date: currentDate})
    }
    const handleChangeTime = (time, timeString) => {
        let currentTime = time && timeString ? moment(new Date(time), dateFormat) : moment(new Date(), format)
        setState({...state, time: currentTime})
    }

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
    const handleChangeEmails =async  (value) =>{
        let emails=state.emails
        let findIndex=emails.map(x=>x.email).indexOf(value)
        if(validateEmail(value)){
            if( findIndex===-1){
                getTag({value:value})
                emails.push({email:value})
                await setState({...state,emails:emails, errorEmail:false,  errorExistEmail:false})
            }
        }
    }
    const verifFormat = async (event)=>{
        let findIndex=state.emails.map(x=>x.email).indexOf(event.target.value)
        if(!validateEmail(event.target.value)){
            await setState({...state, errorEmail:true,errorExistEmail:false})
        }else{
            await setState({...state, errorEmail:false})
            if(findIndex>-1){
                await setState({...state, errorExistEmail:true})
            }
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
        if (state.email.length) {
            validated = true
        } else if (validateEmail(state.email)) {
            validated = true
        } else {
            validated = false
        }
        if (validated) {
            /** call api **/
            let startDate = getDate(state.date) + "T" + getTime(state.time)
            var dte = new Date(startDate);
            dte.setHours(dte.getHours() + 1);
            let endDate = getDate(dte) + "T" + getTime(dte)
            let data = {
                event: {
                    id: makeid(5).toLowerCase(),
                    summary: state.title,
                    start: {"dateTime": startDate},
                    end: {"dateTime": endDate},
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
    const isEmptyField = () => {
        if (!state.email.length || !state.emails.length || !state.title.length || !state.date.length || !state.time.length) {
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
    return {
        formLayout,state,visible,setVisible,captcha,condition,show,videoUri,handleChangeCaptcha,handleChangeCondition,
        isEmptyField,submitForm,confirm,onFormLayoutChange,verifFormat,handleChangeEmails,validateEmail,
        handleClear,handleChangeTime,handleChangeTitle,handleChangeEmail,handleChangeDate,
        getTime,getTag
    }
}
