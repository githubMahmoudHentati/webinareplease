import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Form,Spin} from 'antd'
import {GraphQLFetchDataForm} from "../utils/graphQLFetchDataForm";
import Hooks from "../utils/hooks";
import {setLiveForm} from "../store/formDirectVideoAction";
import {useDispatch} from "react-redux";
import moment from "moment";

export const LiveSubmit=(props)=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const {handleSubmit,values}=Hooks()
    const {loading_securedPassword, data_securedPassword,LiveUpdatedInfData}=GraphQLFetchDataForm(values)

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
                    //period: moment(values.general.startDate,"YYYY-MM-DD"),,
                    directAccessMode: !values.general.liveAccess ? "freeAccess" : "liveAccess",
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
        }
    }, [values.constraintData.loadingLiveFetchData]);
    console.log("form.getFieldsValue()",form.getFieldsValue())

    return(
        <div>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                <Spin spinning={localStorage.getItem('idLive')?!values.constraintData.loadingLiveFetchData:false}>
                {props.children}
                </Spin>
            </Form>
        </div>
    )
}
