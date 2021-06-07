import React, { useState,useEffect,useRef } from 'react';
import {MenuForms} from './components/menuforms'
import {Breadcrumb, Card, Col, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import history from "../router/history";
import {Configuration} from "../formDirectVideo/components/configuration";
import {CompteGeneralInformation} from "./components/CompteGeneralInformation";
import {SecurityAccount} from "./components/securityAccount"
import {PrincipalPage} from "../utils/components/principalPage";
import {useSelector} from "react-redux";
import {PasswordEdit} from "./components/passwordEdit";
import {AccountSubscription} from './components/accountSubscription'
import {useHistory} from "react-router-dom";


export const CompteSettings=()=>{
    const history = useHistory()
    const accountMenu = useSelector((state)=>state.Reducer.accountMenu)
    console.log("accountMenu",accountMenu)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const SelectMenu = ()=>{
        switch(accountMenu){
            case 0:
                return <CompteGeneralInformation/>
            case 1:
            return <SecurityAccount/>
            case 2:
                return <PasswordEdit/>
            case 3:
                return <AccountSubscription/>
            default:
                return <CompteGeneralInformation/>
        }
    }

    return(
        <div>
            <PrincipalPage >
                <Row gutter={[0, 40]}>
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize:"14px"}} style={{color:darkMode===false?"":"#ffffff"}}>
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}}>
                                <span >Accueil</span>
                            </Breadcrumb.Item >
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}}>
                                <span>Compte</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item style={{color:darkMode===false?"":"#ffffff"}}>Mon Compte</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={24} className={"title-col"} style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#141414"}}>
                        <ArrowLeftOutlined
                            style={{display: "flex", alignItems: "center", fontSize: 'medium', cursor: 'medium' , color:darkMode===false?"":"white"}}
                            onClick={() => history.push("/showVideos")}/>
                        <span style={{
                            fontSize: "medium",
                            fontFamily: "Arial, Helvetica, sans-serif;",
                            marginLeft: "1%",
                            color:darkMode===false?"":"white"
                        }}> Mon Compte
                                        </span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[30, 20]}>
                            <Col span={4}>
                                <MenuForms />
                            </Col>
                            <Col span={16}>
                                <SelectMenu />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </PrincipalPage>
        </div>
    )
}