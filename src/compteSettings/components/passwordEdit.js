import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button} from 'antd'
import '../compteSettings.scss'
import { EyeInvisibleOutlined, EyeTwoTone,CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons';


export const PasswordEdit =()=>{
    return(
        <Row  gutter={[0, 30]}>
            <Col span={24}>
                <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "500"}}>modifier votre mot de passe</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "800"}}>Ancien mot de passe :</span>
                            </Col>
                            <Col span={24}>
                                <Input.Password
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={"Ancien mot de passe"}>
                                </Input.Password>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "800"}}>Nouveau mot de passe :</span>
                            </Col>
                            <Col span={24}>
                                <Input.Password
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={"Mot de passe"}>
                                </Input.Password>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]} justify={"end"}>
                            <Col>
                                <Button icon={<CloseCircleOutlined />}>Annuler</Button>
                            </Col>
                            <Col>
                                <Button type={"primary"}icon={<CheckCircleOutlined />}>Enregistrer</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}