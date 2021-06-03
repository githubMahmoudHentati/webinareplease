import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './contactClient.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormContactClient} from "./components/formContactClient";
import logo from "../assets/contactClient.svg"



export const ContactClient =()=>{
    return(
        <WebinairePlease logo={logo}>
            <FormContactClient />
        </WebinairePlease>
    )
}