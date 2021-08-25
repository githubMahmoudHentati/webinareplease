import React from 'react';

import './resetPassword.scss'

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