import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './resetPassword.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormResetPassword} from "./components/formResetPassword";
import logo from "../assets/logoWebinaireplease.svg"


export const ResetPassword =()=>{
    return(
        <WebinairePlease logo={logo}>
            <FormResetPassword/>
        </WebinairePlease>
    )
}