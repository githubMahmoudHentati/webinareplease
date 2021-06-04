import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {MailOutlined} from '@ant-design/icons';
import {setAccountSetting} from "../../utils/redux/actions";
import {useDispatch} from "react-redux";

export const MenuForms =()=>{
    const dispatch = useDispatch()

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

                    <Menu.Item onClick={()=>{dispatch(setAccountSetting(0))}} key="1">
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
                    <Menu.Item onClick={()=>{dispatch(setAccountSetting(1))}} key="2">
                        Configuration
                    </Menu.Item>

                    <Menu.Item onClick={()=>{dispatch(setAccountSetting(2))}}key="3">
                        Invitations
                    </Menu.Item>

                    <Menu.Item onClick={()=>{dispatch(setAccountSetting(3))}} key="4">
                        Outils social
                    </Menu.Item>

                    <Menu.Item onClick={()=>{dispatch(setAccountSetting(4))}} key="5">
                        Ttemplates
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


