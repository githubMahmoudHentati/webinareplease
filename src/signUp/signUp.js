import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox,Form} from 'antd'
import './signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormSignUp} from './components/formSignUp'
import logo from "../assets/logoWebinaireplease.svg"
import {useHistory} from 'react-router-dom';
import {HooksSignUp} from "./utils/hooks";
import { useTranslation } from 'react-i18next';

export const SignUp =()=>{
    const [form] = Form.useForm();
    const { t, i18n } = useTranslation();

    const history = useHistory()
    const {handleSubmitSignUp,valuesSignUp}=HooksSignUp()
    return(
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            className={"signIn-form"}
            name="product-form"

            onFinish={handleSubmitSignUp}
        >

        <WebinairePlease logo={logo}>
                    <FormSignUp
                        child1={
                            <span>{t("CompteSettings.CFreeAccount")}</span>
                        }
                      child2={
                        <Row className={"text-form"} gutter={[10,0]}>
                            <Col>
                                <Button onClick={()=>{history.push("/ConfirmAccount")}}>{t("CompteSettings.Cancel")}</Button>
                            </Col>
                            <Col>
                                <Button  loading={valuesSignUp.constraintData.loadingSignUp} type="primary" htmlType="submit">{t("CompteSettings.RegisterNow")}</Button>
                            </Col>
                        </Row>
                       }
                    />
        </WebinairePlease>
        </Form>
    )
}