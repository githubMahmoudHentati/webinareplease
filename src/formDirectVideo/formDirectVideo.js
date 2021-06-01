import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import './formDirectVideo.scss'
import {ArrowLeftOutlined} from '@ant-design/icons';
import history from '../router/history';
import {MenuForms} from './components/menuforms'
import {Generals} from "./components/general";
import {Configuration} from "./components/configuration"


export const FormDirectVideo =()=>{

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
                            style={{display: "flex", alignItems: "center", fontSize: 'medium', cursor: 'medium'}}
                            onClick={() => history.push("/")}/>
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
                                <Configuration />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}