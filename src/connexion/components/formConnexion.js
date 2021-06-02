import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import '../connexion.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';

export const FormConnexion =()=>{
    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span style={{textAlign: 'left', fontSize: "17px", fontFamily: "system-ui"}}>Connexion</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} >

                    <Col span={24}>
                        <Input placeholder="default size" prefix={<UserOutlined/>}/>
                    </Col>
                    <Col span={24}>
                        <Input.Password
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            prefix={<UnlockOutlined/>}
                        />
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col>
                                <Checkbox>Se souvenir de moi</Checkbox>
                            </Col>
                            <Col>
                                <a> Mot de passe oublié</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button style={{width:"100%"}}type="primary">Connexion</Button>
                    </Col>
                    <Col >
                        <span>Pas encore membre?</span>
                    </Col>
                    <Col >
                        <a>Inscrivez-vous</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
