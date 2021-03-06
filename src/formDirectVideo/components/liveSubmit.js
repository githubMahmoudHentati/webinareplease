import React, {useEffect} from 'react';
import {Row, Col,Breadcrumb,Form,Spin} from 'antd'
import {GraphQLFetchDataForm} from "../utils/graphQLFetchDataForm";
import Hooks from "../utils/hooks";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {BarHeader} from "./barHeader";
import {useTranslation} from 'react-i18next';
import {setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction";
import {HomeOutlined} from "@ant-design/icons";
import va from "simple-react-lightbox";


export const LiveSubmit=(props)=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const [form] = Form.useForm();
    const {handleSubmit,checkKeyDown,values}=Hooks()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {t} = useTranslation();
    const isAddedForm=values.constraintData.crudOption==='Ajouter' || localStorage.getItem('formPage')==='Ajouter' || !localStorage.getItem('idLive')
    console.log("values",values)

    useEffect(async () => {
        if (values.general.loadingSecuredPassword)
        {
            await form.setFieldsValue({...form.getFieldsValue(),pwd:values.general.pwd})
        }
        else
            await form.setFieldsValue({...form.getFieldsValue(),pwd:""})
    }, [values.general.loadingSecuredPassword]);


    useEffect(async () => {
        if (values.constraintData.loadingLiveFetchData&&localStorage.getItem('idLive') || values.invitation.loadingemailscsv )
        {
            await form.setFieldsValue(Object.assign(form.getFieldsValue(),
                {
                    //**********general live info***********/////
                    liveTitle: values.general.liveTitle,
                    liveDescription: values.general.liveDescription,
                    liveAction: values.general.liveAction,
                    startDate: moment(values.general.startDate, "YYYY-MM-DD"),
                    startHour: moment(values.general.startHour, "HH:mm:ss"),
                    period: moment(values.general.livePlan.duration,"HH:mm:ss"),
                    directAccessMode: values.general.directAccessMode,
                    liveAccess: values.general.liveAccess,
                    pwd: values.general.pwd,
                    liveSharedLink: values.general.liveSharedLink,
                    securedPasswordOption: values.general.securedPasswordOption,
                    //**********configuration live info***********/////
                    directProgram: values.configuration.directProgram,
                    notVisibleVideo: values.configuration.notVisibleVideo,
                    visibleVideo: values.configuration.visibleVideo,
                    liveAutomaticArchiving: values.configuration.liveAutomaticArchiving,
                    SpeakerList: values.configuration.SpeakerList,
                    liveInteractiveOption: values.configuration.liveInteractiveOption,
                    liveMultimediaOptions: values.configuration.liveMultimediaOptions,
                    chat: values.configuration.chat,
                    comments: values.configuration.comments,
                    likeMention: values.configuration.likeMention,
                    attachments: values.configuration.attachments,
                    richeMediaDiffusion: values.configuration.richeMediaDiffusion,
                    videoMode: values.configuration.videoMode,
                    theme: values.configuration.theme,
                    tags: values.configuration.tags,
                    switchLanguages:values.configuration.switchLanguages,
                    languages:values.configuration.languages,
                    //**********Invitation live info***********/////
                    emails:values.invitation.emails,
                    emailsGroup:values.invitation.emailsGroup,
                    maxguestremotly:values.invitation.maxOnlineGuests,
                    maxguestpresential:values.invitation.maxOnsiteGuests
                }
            ))
            // dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:false}));
        }
    }, [values.constraintData.loadingLiveFetchData , values  ]);
    useEffect(()=>{
       console.log("lskjfsd13213ljfsdljk",values)
    },[values])

    const values_data = useSelector((state)=> state.FormDirectVideoReducer)
    const {getLiveData} = GraphQLFetchDataForm(values_data)

    useEffect(async () => {
        getLiveData()
    },[] );

    useEffect(async () => {
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"errorMenuFormStyle",constraintDataValueChange:false}));
    }, [values.general]);

    const stickyElm = document.querySelector('.title-col')
    const rootEl = document.querySelector('.App')
    // const observer = new IntersectionObserver(
    //     ([e]) => rootEl.classList.toggle('is-pinned', e.intersectionRatio < 1),
    //     {threshold: [1]}
    // );
    //
    //
    // useEffect(() => {
    //     if(stickyElm) {
    //         // debugger
    //         observer.observe(stickyElm)
    //     }
    // }, );


    return(
        <div>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
                onKeyDown={(e) => checkKeyDown(e)}
            >
                <Spin spinning={localStorage.getItem('idLive')?!values.constraintData.loadingLiveFetchData:false}>
                    <Row gutter={[0, 10]}>
                        <Col span={24} className={"header-col"}>
                            <Breadcrumb className={"header-col-breadcrumb"} style={{fontSize:"14px" , fontFamily: "SF Pro Display",fontWeight: "normal",color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                                    <HomeOutlined className={"home_icon"} />
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{localStorage.getItem('idLive') ? values.general.liveTitle :isAddedForm ? t("formDirectVideo.AddLive"): '' } </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                            <BarHeader/>
                        {props.children}
                    </Row>
                </Spin>
            </Form>
        </div>
    )
}
