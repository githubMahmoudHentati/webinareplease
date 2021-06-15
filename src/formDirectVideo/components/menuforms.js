import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {MailOutlined} from '@ant-design/icons';
import {setDirectSetting} from "../../utils/redux/actions";
import {useDispatch, useSelector} from "react-redux";

export const MenuForms =()=>{
    const dispatch = useDispatch()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    return (
        <Row>
            <Col span={24} >
                <Menu
                    style={{width:'100%',height:"100%" , backgroundColor:darkMode===false?"":"#141414" , borderRight:darkMode===false?"":"2px solid #1D1D1D"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >

                    <div className={"titre-menu"}>
                        <span
                            style={{
                                color:darkMode===false?"RGBA(0, 0, 0, 0.85)":"rgba(255, 255, 255, 0.85)",
                                fontSize: "14px",
                                textAlign: "left",
                                fontFamily: "Ping Fang SC",
                                fontWeight: "bold"
                            }}>
                            Paramètres généraux
                        </span>

                    </div>

                    <Menu.Item className={"menuItem"} onClick={()=>{dispatch(setDirectSetting(0))}} key="1">
                        Géneral
                    </Menu.Item>
                    <div className={"titre-menu"}>
                    <span style={{
                        color:darkMode===false?"RGBA(0, 0, 0, 0.85)":"rgba(255, 255, 255, 0.85)",
                        fontSize: "14px",
                        textAlign: "left",
                        fontFamily: "Ping Fang SC",
                        fontWeight: "bold"
                    }}>Paramètres optionnels</span>
                    </div>
                    <Menu.Item className={"menuItem"} onClick={()=>{dispatch(setDirectSetting(1))}} key="2">
                        Configuration
                    </Menu.Item>

                    <Menu.Item className={"menuItem"} onClick={()=>{dispatch(setDirectSetting(2))}}key="3">
                        Invitations
                    </Menu.Item>

                    <Menu.Item className={"menuItem"} onClick={()=>{dispatch(setDirectSetting(3))}} key="4">
                        Outils social
                    </Menu.Item>

                    <Menu.Item className={"menuItem"} onClick={()=>{dispatch(setDirectSetting(4))}} key="5">
                        Templates
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


