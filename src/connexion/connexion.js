import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import './connexion.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import WebinairePlease from "../utils/components/WebinairePlease";
import {FormConnexion} from "./components/formConnexion";
import logo from "../assets/logoWebinaireplease.svg"

export const Connexion =()=>{
    return(
        <WebinairePlease logo={logo}>
            <FormConnexion/>
        </WebinairePlease>
    )
}