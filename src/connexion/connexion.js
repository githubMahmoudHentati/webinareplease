import React from 'react';

import './connexion.scss'

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