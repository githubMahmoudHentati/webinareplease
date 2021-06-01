import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {MailOutlined} from '@ant-design/icons';

export const Forms =()=>{
    const { TabPane } = Tabs;
    return (
        <Row>
            <Col span={24}>
                <Menu
                    style={{width:'100%',height:"100%"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >

                    <div className={"titre-menu"}>
                        <span
                            style={{
                                fontSize: "14px",
                                color: "RGBA(0, 0, 0, 0.85)",
                                textAlign: "left",
                                fontFamily: "Ping Fang SC",
                                fontWeight: "bold"
                            }}>
                            Paramètres généraux
                        </span>

                    </div>

                    <Menu.Item key="1">
                        Géneral
                    </Menu.Item>
                    <div className={"titre-menu"}>
                    <span style={{
                        fontSize: "14px",
                        color: "RGBA(0, 0, 0, 0.85)",
                        textAlign: "left",
                        fontFamily: "Ping Fang SC",
                        fontWeight: "bold"
                    }}>Paramètres généraux</span>
                    </div>
                    <Menu.Item key="2">
                        Configuration
                    </Menu.Item>

                    <Menu.Item key="3">
                        Invitations
                    </Menu.Item>

                    <Menu.Item key="4">
                        Outils social
                    </Menu.Item>

                    <Menu.Item key="5">
                        Ttemplates
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


