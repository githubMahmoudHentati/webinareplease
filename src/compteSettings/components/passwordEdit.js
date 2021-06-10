import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button} from 'antd'
import '../compteSettings.scss'
import { EyeInvisibleOutlined, EyeTwoTone,CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons';
import {setAccountSetting} from "../../utils/redux/actions";
import {useDispatch , useSelector} from "react-redux";

export const PasswordEdit =()=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    return(
        <Row  gutter={[0, 30]}>
            <Col span={24}>
                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "500"}}>modifier votre mot de passe</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "800"}}>Ancien mot de passe :</span>
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
                                <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "800"}}>Nouveau mot de passe :</span>
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
                                <Button style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} icon={<CloseCircleOutlined />} onClick={()=>dispatch(setAccountSetting(1))} >Annuler</Button>
                            </Col>
                            <Col>
                                <Button style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} type={"primary"}icon={<CheckCircleOutlined />}>Enregistrer</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}