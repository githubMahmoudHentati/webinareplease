import React, { useState,useEffect,useRef } from 'react';
import './confirmAccount.scss'
import WebinairePlease from "../utils/components/WebinairePlease";
import logo from "../assets/logoWebinaireplease.svg"
import {FormConfirmAccount} from "./components/formConfirmAccount";


export const ConfirmAccount =()=>{
    return(
        <WebinairePlease logo={logo}>
            <FormConfirmAccount/>
        </WebinairePlease>
    )
}