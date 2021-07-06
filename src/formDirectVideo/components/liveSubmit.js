import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Form} from 'antd'
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {Hooks} from "../utils/hooks";
import {setLiveForm} from "../store/formDirectVideoAction";
import {useDispatch} from "react-redux";

export const LiveSubmit=(props)=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const {handleSubmit,values}=Hooks()
    const {loading_securedPassword, data_securedPassword}=GraphQLFetchData(values)
    useEffect(() => {
        dispatch(setLiveForm(form));
    }, [form]);

    useEffect(async () => {
        if (values.general.loadingSecuredPassword)
        {
            await form.setFieldsValue({...form.getFieldsValue(),pwd:values.general.pwd})
        }
        else
            await form.setFieldsValue({...form.getFieldsValue(),pwd:""})
    }, [values.general.loadingSecuredPassword]);



    return(
        <div>
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                {props.children}
            </Form>
        </div>
    )
}