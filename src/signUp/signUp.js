import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormSignUp} from './components/formSignUp'
import logo from "../assets/logoWebinaireplease.svg"
import {useHistory} from 'react-router-dom';
import {Hooks} from "./utils/hooks";

export const SignUp =()=>{
    const history = useHistory()
    const {handleSubmit}=Hooks()
    return(

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
                                <Button onClick={handleSubmit} type="primary" htmlType="submit">Inscrivez-vous maintenant</Button>
                            </Col>
                        </Row>
                       }
                    />
        </WebinairePlease>
    )
}