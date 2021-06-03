import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormSignUp} from './components/formSignUp'
import logo from "../assets/logoWebinaireplease.svg"


export const SignUp =()=>{
    return(

        <WebinairePlease logo={logo}>
                    <FormSignUp
                        child1={
                            <span>Créez votre compte gratuitement</span>
                        }
                      child2={
                        <Row className={"text-form"} gutter={[10,0]}>
                            <Col>
                                <Button>Annuler</Button>
                            </Col>
                            <Col>
                                <Button type="primary">Inscrivez-vous maintenant</Button>
                            </Col>
                        </Row>
                       }
                    />
        </WebinairePlease>
    )
}