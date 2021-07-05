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
    console.log("load",values.general.loadingSecuredPassword)

    useEffect(() => {
        if (values.general.loadingSecuredPassword)
        {
            console.log("enteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer-form")
            console.log("dataaa", values.general.pwd)
            form.setFieldsValue({securedPasswordOption: "azeazeazeazeaz"})
        }
    }, [values.general.loadingSecuredPassword]);
    form.setFieldsValue({securedPasswordOption: "azeazeazeazeaz"})


    console.log("values.forms",values.form)
    useEffect(() => {
        if (values.general.loadingSecuredPassword)
        {
            form.setFieldsValue(values.form.getFieldValue())

        }
    }, [values.form]);



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