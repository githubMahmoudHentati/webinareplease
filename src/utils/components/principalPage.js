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
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    console.log("darmode principalpage",darkMode)
    const iframeStyle = props.menuType==="accountSetting"?{height:accountMenu===2||accountMenu===1?"100vh":"100%"}:{height:directMenu===2?"100vh":"100%"}

    return(
        <div className="showVideosDiv" style={iframeStyle}>
            <GlobalHeader/>
            <Card  style={{height:"93%" , backgroundColor:darkMode===false?"#F0F1F4":"#000000" , border:darkMode===false? "1px solid white": "1px solid #141414" }} className={"card"} >
                <Card style={{height:"100%" , backgroundColor:darkMode===false?"#FFFFFF":"#141414" , border:darkMode===false? "1px solid white": "1px solid #141414" }}>
                    {props.children}
                </Card>
            </Card>
        </div>
    )
}