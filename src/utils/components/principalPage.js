import React,{useState , useEffect} from 'react';
import GlobalHeader from "./header";
import {Card} from "antd";
import {useSelector} from "react-redux";
import {Reducer} from "../redux/reducer";
import {useDispatch} from "react-redux";
import {CompteGeneralInformation} from "../../compteSettings/components/CompteGeneralInformation";
import {SecurityAccount} from "../../compteSettings/components/securityAccount";
import {PasswordEdit} from "../../compteSettings/components/passwordEdit";


export const PrincipalPage =(props)=>{
    const accountMenu = useSelector((state)=>state.Reducer.accountMenu)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    return(
        <div className="showVideosDiv" style={{height:accountMenu===2||accountMenu===1?"100vh":"100%"}}>
            <GlobalHeader/>
            <Card  style={{height:"93%" , backgroundColor:darkMode===false?"#F0F1F4":"#000000"}} className={"card"} >
                <Card style={{height:"100%" , backgroundColor:darkMode===false?"#FFFFFF":"#0C0C0C" , border:darkMode===false? "1px solid white": "1px solid #141414" }}>
                    {props.children}
                </Card>
            </Card>
        </div>
    )
}