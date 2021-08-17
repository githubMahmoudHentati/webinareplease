import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import history from './router/history';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ShowVideos from "./showVideos/showVideos";
import FormDirectVideo from "./formDirectVideo/FormDirectVideo";
import PackagePayement from "./PackagePayement/PackagePayement";
import {Connexion} from "./connexion/connexion";
import {SignUp} from "./signUp/signUp";
import {ContactClient} from "./contactClient/contactClient";
import {CompteSettings} from "./compteSettings/compteSettings";
import Calendar from "./Calendar/Calendar";
import {useSelector} from "react-redux";
import {GraphQLFetchData} from "./utils/grapqhQL/graphQLFetchData";
import {ForgetPassword} from "./forgetPassword/forgetPassword";
import {ResetPassword} from "./resetPassword/resetPassword";
import Error from "./utils/components/Error";
import {ConfirmAccount} from "./confirmAccount/confirmAccount";
import en_US from "antd/lib/locale/en_US";
import frFR from "antd/lib/locale/fr_FR";
import { ConfigProvider } from "antd";
import 'moment/locale/fr';
import 'react-phone-number-input/style.css'


let tabData = [
    "connexion", "forgot-password", "ConfirmAccount", "PackagePayement", "signUp"
]
function App() {
    const {verificationToken} = GraphQLFetchData()
    const credentialsValues = useSelector((state) => state.Reducer)
    const lang =useSelector((state)=>state.Reducer.lang)
    let pathName = window.location.pathname.replace('/', '')
    
   
    React.useEffect(()=>{
        const root = document.querySelector(':root')

        if(tabData.includes(pathName)){
            if(JSON.parse(localStorage.getItem('darkMode'))){
                root.classList.remove('dark')
                root.classList.add('light')
               }
        }

    },[pathName])
    return (
        <ConfigProvider locale={lang==="fr"?frFR:en_US}>

        <div className="App">
            {verificationToken &&
            <BrowserRouter history={history}>
                <Switch>
                    <Redirect exact from="/" to="/connexion"/>
                    <Route exact path='/PackagePayement'> {!credentialsValues.appState.loggedIn ? <PackagePayement/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/connexion'> {!credentialsValues.appState.loggedIn ? <Connexion/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/ConfirmAccount'> {!credentialsValues.appState.loggedIn ? <ConfirmAccount/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/signUp'> {!credentialsValues.appState.loggedIn ? <SignUp/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/forgot-password'> {!credentialsValues.appState.loggedIn ? <ForgetPassword/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/reset-password'> {!credentialsValues.appState.loggedIn ? <ResetPassword/> :
                        <Redirect exact to="/showVideos"/>}</Route>
                    <Route exact path='/contactClient' component={ContactClient}/>
                    <Route exact path='/showVideos'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <ShowVideos/>}</Route>
                    <Route exact path='/FormDirectVideo'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <FormDirectVideo/>}</Route>
                    <Route exact path='/compteSettings'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <CompteSettings/>}</Route>
                    <Route exact path='/calendar'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <Calendar/>}</Route>
                    <Route path={"*"} component={Error}/>
                </Switch>
            </BrowserRouter>
            }

        </div>
        </ConfigProvider>
    );
}

export default App;
