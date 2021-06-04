import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import './formDirectVideo.scss'
import {ArrowLeftOutlined} from '@ant-design/icons';
import history from '../router/history';
import {MenuForms} from './components/menuforms'
import {Generals} from "./components/general";
import {Configuration} from "./components/configuration";
import Invitation from "./components/Invitation";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setAccountSetting} from "../utils/redux/actions";


export const FormDirectVideo =()=>{
    const directMenu = useSelector((state)=>state.Reducer.accountMenu)
    const history = useHistory()

    const SelectMenu = ()=>{
        switch(directMenu){
            case 0:
                return <Generals/>
            case 1:
                return <Configuration/>
            case 2:
                return <Invitation/>
            case 3:
                return <Generals/>
            case 4:
                return <Generals/>
            default:
                return <Generals/>
        }
    }
    return(
        <div>
            <Card style={{width: "100%"}}>
                <Row gutter={[0, 40]}>
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize:"14px"}}>
                            <Breadcrumb.Item href="">
                                <span >Accueil</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="">
                                <span>Direct</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Ajouter un direct</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={24} className={"title-col"}>
                        <ArrowLeftOutlined
                            onClick={()=>{history.push("/showVideos")}}
                            style={{display: "flex", alignItems: "center", fontSize: 'medium', cursor: 'medium'}}
                            />
                        <span style={{
                            fontSize: "medium",
                            fontFamily: "Arial, Helvetica, sans-serif;",
                            marginLeft: "1%"
                        }}> Ajouter un direct
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
            </Card>
        </div>
    )
}