import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import '../connexion.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

export const FormConnexion =()=>{
    const history = useHistory()
    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>Connexion</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} >

                    <Col span={24} className={"col_input"}>
                        <Input placeholder="default size" prefix={<UserOutlined/>}/>
                    </Col>

                    <Col span={24} className={"col_input"}>
                        <Input.Password
                            placeholder="input password"
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            prefix={<UnlockOutlined/>}
                        />
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col>
                                <Checkbox><span className={"spn_chbx"}>Se souvenir de moi</span></Checkbox>
                            </Col>
                            <Col>
                                <a className={"spn_chbx"}> Mot de passe oublié</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button className={"spn_chbx"} style={{width:"100%"}}type="primary">Connexion</Button>
                    </Col>
                    <Col >
                        <span className={"spn_chbx"}>Pas encore membre?</span>
                    </Col>
                    <Col onClick={()=>{history.push("/signUp")}}>
                        <a className={"spn_chbx"}>Inscrivez-vous</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
