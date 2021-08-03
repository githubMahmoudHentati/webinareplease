import React from 'react';
import { Link } from 'react-router-dom';
import WebinairePlease from "./WebinairePlease";
import logo from "../../assets/logoWebinaireplease.svg"
import {useTranslation} from "react-i18next"
const Error = () =>{
const {t,i18n}=useTranslation()
    return(
        <WebinairePlease logo={logo}>
        <div className={"Default_Page"}>
            <span className="icon-404 icon404"></span>
            <h2>{t("error.oops")}</h2>
            <p>{t("error.Exist")}</p>
            <Link to='/connexion' className='btn'>
                {t("error.Home")}
            </Link>
        </div>
        </WebinairePlease>
    );
}

export default Error