import React, {useEffect, useState} from 'react';
import './App.css';
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
import {useDispatch, useSelector} from "react-redux";
import {GraphQLFetchData} from "./utils/grapqhQL/graphQLFetchData";
import {ForgetPassword} from "./forgetPassword/forgetPassword";
import {ResetPassword} from "./resetPassword/resetPassword";
import Error from "./utils/components/Error";
import Replay from "./ReplayModule/replay"
import {ConfirmAccount} from "./confirmAccount/confirmAccount";
import IframeStudioLive from "./webinareStudioLive/webinareStudioLive";
import en_US from "antd/lib/locale/en_US";
import frFR from "antd/lib/locale/fr_FR";
import { ConfigProvider } from "antd";
import 'moment/locale/fr';
import 'react-phone-number-input/style.css'
import {Invitation} from "./InvitationForm/Invitation";

let tabData = [
    "connexion", "forgot-password", "ConfirmAccount", "PackagePayement", "signUp"
]
function App() {
    const dispatch = useDispatch()
    const credentialsValues = useSelector((state) => state.Reducer)
    const {verificationToken,tokenAPI} = GraphQLFetchData(credentialsValues)
    const lang =useSelector((state)=>state.Reducer.lang)
    let pathName = window.location.pathname.replace('/', '')


    useEffect(() => {
        tokenAPI()
    }, []);

   
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
                    <Route exact path='/webinarStudioLive'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <IframeStudioLive/>}</Route>
                    <Route exact path='/calendar'> {!credentialsValues.appState.loggedIn ?
                        <Redirect exact to="/connexion"/> : <Calendar/>}</Route>
                    <Route exact path='/replay'>
                        <Replay/>
                    </Route>
                    <Route exact path='/invitation/:cryptext'>
                       <Invitation/>
                    </Route>
                    <Route path={"*"} component={Error}/>
                </Switch>
            </BrowserRouter>
            }

        </div>
        </ConfigProvider>
    );
}

export default App;
