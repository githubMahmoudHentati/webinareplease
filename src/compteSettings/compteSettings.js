import React, { useState,useEffect,useRef } from 'react';
import {MenuForms} from './components/menuforms'
import {Breadcrumb, Card, Col, Row} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import history from "../router/history";
import {Configuration} from "../formDirectVideo/components/configuration";

export const CompteSettings=()=>{
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

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}