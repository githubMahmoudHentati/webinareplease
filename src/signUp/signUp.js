import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox,Form} from 'antd'
import './signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormSignUp} from './components/formSignUp'
import logo from "../assets/logoWebinaireplease.svg"
import {useHistory} from 'react-router-dom';
import {Hooks} from "./utils/hooks";

export const SignUp =()=>{
    const [form] = Form.useForm();

    const history = useHistory()
    const {handleSubmit,values}=Hooks()
    return(
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmit}
        >
        <WebinairePlease logo={logo}>
                    <FormSignUp
                        child1={
                            <span>Créez votre compte gratuitement</span>
                        }
                      child2={
                        <Row className={"text-form"} gutter={[10,0]}>
                            <Col>
                                <Button onClick={()=>{history.push("/connexion")}}>Annuler</Button>
                            </Col>
                            <Col>
                                <Button  loading={values.constraintData.loadingSignUp} type="primary" htmlType="submit">Inscrivez-vous maintenant</Button>
                            </Col>
                        </Row>
                       }
                    />
        </WebinairePlease>
        </Form>
    )
}