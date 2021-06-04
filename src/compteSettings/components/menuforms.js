import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../compteSettings.scss'
import {MailOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {setAccountSecurity} from "../../utils/redux/actions";

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
                    <Menu.Item key="1" onClick={()=>{dispatch(setAccountSecurity(0))}}>
                        Compte
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=>{dispatch(setAccountSecurity(1))}}>
                        Securité
                    </Menu.Item>
                    <Menu.Item key="5" onClick={()=>{dispatch(setAccountSecurity(2))}}>
                        Abonnement
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


