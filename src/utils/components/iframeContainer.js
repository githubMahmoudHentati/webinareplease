import React,{useState , useEffect} from 'react';
import GlobalHeader from "./header";
import {Card} from "antd";
import {useSelector} from "react-redux";
import {Reducer} from "../redux/reducer";
import {useDispatch} from "react-redux";
import {AccountGeneralInformation} from "../../compteSettings/components/accountGeneralInformation";
import {SecurityAccount} from "../../compteSettings/components/securityAccount";
import {PasswordEdit} from "../../compteSettings/components/passwordEdit";
import Hooks from "../../formDirectVideo/utils/hooks";
import {setIframeStyle} from "../redux/actions";


export const IframeContainer =(props)=>{
    const dispatch = useDispatch()
    const accountMenu = useSelector((state)=>state.Reducer.accountMenu)
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    // use Selector redux
    const {values} = Hooks()

    switch (props.menuType) {
        case "accountSetting":
            const iframeStyle = {height: accountMenu === 2 || accountMenu === 1 ? "100vh" : "100%"}
            return <div className="showVideosDiv" style={iframeStyle}>{props.children}</div>
        case "formDirectVideo":
            if (directMenu === 2) {
                let numberRulesAdded = Object.values(values.invitation.addRules).filter(element => element === true).length
                const iframeStyle = numberRulesAdded > 3 ? {height: "100%"} : {height: "100vh"}
                return <div className="showVideosDiv" style={iframeStyle}>{props.children}</div>
            } else if (directMenu === 3) {
                let numberRulesAdded = values.socialTools.filter(element => element.switch === true).length
                console.log("numberRulesAdded",numberRulesAdded)
                return <div className="showVideosDiv" style={{height:numberRulesAdded>0?"100%":"100vh"}}>{props.children}</div>
            } else
                return <div className="showVideosDiv" style={{height: "100%"}}>{props.children}</div>
        default :
            return <div className="showVideosDiv">{props.children}</div>
    }
}