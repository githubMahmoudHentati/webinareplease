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
    const [loading, setLoading] = useState(false);

    const {loading_securedPassword, data_securedPassword}=GraphQLFetchData(values)
    useEffect(async () => {
        await dispatch(setLiveForm(form));
        setLoading(true)
    }, []);
    console.log("load",values.general.loadingSecuredPassword)

    useEffect(async () => {
        if (values.general.loadingSecuredPassword)
        {
            console.log("enteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer-form")
            console.log("dataaa", values.general.pwd)
            form.setFieldsValue({securedPasswordOption: "azeazeazeazeaz"})
            await form.setFieldsValue({...form.getFieldsValue(),pwd:values.general.pwd})
            console.log("live-sbmit-getFieldsValue()",form.getFieldsValue())
        }
    }, [values.general.loadingSecuredPassword]);

    //form.setFieldsValue({securedPasswordOption: "azeazeazeazeaz"})


    console.log("values.forms",values.form)
    useEffect(async () => {
        if (values.general.loadingSecuredPassword)
        {
            await form.setFieldsValue(values.form.getFieldValue())

        }
    }, [values.form]);



    return(
        <div>
            {loading&&
            <Form
                form={values.form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                {props.children}
            </Form>
            }
        </div>
    )
}