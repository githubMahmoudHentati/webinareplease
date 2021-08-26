import React from 'react';
import './forgetPassword.scss'
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