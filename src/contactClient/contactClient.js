import React from 'react';
import './contactClient.scss'
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