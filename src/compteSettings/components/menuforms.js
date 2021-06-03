import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../compteSettings.scss'
import {MailOutlined} from '@ant-design/icons';

export const MenuForms =()=>{
    return (
        <Row>
            <Col span={24}>
                <Menu
                    style={{width:'100%',height:"100%"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >
                    <Menu.Item key="1">
                        Géneral
                    </Menu.Item>
                    <Menu.Item key="2">
                        Securité
                    </Menu.Item>
                    <Menu.Item key="5">
                        Abonnement
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


