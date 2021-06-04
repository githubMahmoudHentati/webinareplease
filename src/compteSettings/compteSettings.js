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

export const CompteSettings=()=>{
    const accountMenu = useSelector((state)=>state.Reducer.accountMenu)
    console.log("accountMenu",accountMenu)

    const SelectMenu = ()=>{
        switch(accountMenu){
            case 0:
                return <CompteGeneralInformation/>
            case 1:
            return <SecurityAccount/>
            default:
                return <CompteGeneralInformation/>

        }
    }

    return(
        <div>
            <PrincipalPage >
                <Row gutter={[0, 40]}>
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize:"14px"}}>
                            <Breadcrumb.Item href="">
                                <span >Accueil</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <span>Compte</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Mon Compte</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={24} className={"title-col"}>
                        <ArrowLeftOutlined
                            style={{display: "flex", alignItems: "center", fontSize: 'medium', cursor: 'medium'}}
                            onClick={() => history.push("/")}/>
                        <span style={{
                            fontSize: "medium",
                            fontFamily: "Arial, Helvetica, sans-serif;",
                            marginLeft: "1%"
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