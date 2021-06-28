import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './forgetPassword.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormForgetPassword} from "./components/formForgetPassword";
import logo from "../assets/logoWebinaireplease.svg"


export const ForgetPassword =()=>{
    return(
        <WebinairePlease logo={logo}>
            <FormForgetPassword/>
        </WebinairePlease>
    )
}