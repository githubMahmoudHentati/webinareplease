import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Form,Spin} from 'antd'
import {GraphQLFetchDataForm} from "../utils/graphQLFetchDataForm";
import Hooks from "../utils/hooks";
import {setLiveForm} from "../store/formDirectVideoAction";
import moment from "moment";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {BarHeader} from "./barHeader";
import {useTranslation} from 'react-i18next';
import {setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction"

export const LiveSubmit=(props)=>{
    const history = useHistory()
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const {handleSubmit,values}=Hooks()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {t, i18n} = useTranslation();
    const isAddedForm=values.constraintData.crudOption==='Ajouter' || localStorage.getItem('formPage')==='Ajouter' || !localStorage.getItem('idLive')


    useEffect(async () => {
        if (values.general.loadingSecuredPassword)
        {
            await form.setFieldsValue({...form.getFieldsValue(),pwd:values.general.pwd})
        }
        else
            await form.setFieldsValue({...form.getFieldsValue(),pwd:""})
    }, [values.general.loadingSecuredPassword]);


    useEffect(async () => {
        if (values.constraintData.loadingLiveFetchData&&localStorage.getItem('idLive'))
        {
            console.log("enteer-field")
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
                }
            ))
            // dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:false}));
        }
    }, [values.constraintData.loadingLiveFetchData]);
    console.log("form.getFieldsValue()",form.getFieldsValue())

    const values_data = useSelector((state)=> state.FormDirectVideoReducer)
    const {getLiveData} = GraphQLFetchDataForm(values_data)

    useEffect(async () => {
        getLiveData()
    }, []);

    return(
        <div>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                <Spin spinning={localStorage.getItem('idLive')?!values.constraintData.loadingLiveFetchData:false}>
                    <Row gutter={[0, 10]}>
                        <Col span={24} className={"header-col"}>
                            <Breadcrumb className={"header-col-breadcrumb"} style={{fontSize:"14px" , fontFamily: "SF Pro Display",fontWeight: "normal"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                                    <span >Accueil</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                                    <span>Direct</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{localStorage.getItem('idLive') ? values.general.liveTitle :isAddedForm ? t("formDirectVideo.AddLive"): '' } </Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                        <Col span={24} className={"title-col"} style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
                            <BarHeader/>
                        </Col>
                        {props.children}
                    </Row>
                </Spin>
            </Form>
        </div>
    )
}
