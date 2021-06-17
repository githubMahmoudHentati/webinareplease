import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button} from 'antd'
import '../compteSettings.scss'
import { EyeInvisibleOutlined, EyeTwoTone,CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons';
import {setAccountSetting} from "../../utils/redux/actions";
import {useDispatch , useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";

export const PasswordEdit =()=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values}= Hooks()
    const {generalInformationOnChange}=Hooks()
    return(
        <Row  gutter={[0, 30]}>
            <Col span={24}>
                <span className={"spn1_securité"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span className={"spn2_motDePasse"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" }}>modifier votre mot de passe</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Ancien mot de passe :</span>
                            </Col>
                            <Col span={24}>
                                <Input.Password
                                    className={"spn2_motDePasse"}
                                    value={values.generalInformation.previousPassword}
                                    name="previousPassword"
                                    onChange={generalInformationOnChange}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={"Ancien mot de passe"}>
                                </Input.Password>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Nouveau mot de passe :</span>
                            </Col>
                            <Col span={24}>
                                <Input.Password
                                    className={"spn2_motDePasse"}
                                    name="newPassword"
                                    onChange={generalInformationOnChange}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={"Nouveau Mot de passe"}>
                                </Input.Password>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]} justify={"end"}>
                            <Col>
                                <Button className={"spn2_motDePasse"} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} onClick={()=>dispatch(setAccountSetting(1))} >Annuler</Button>
                            </Col>
                            <Col>
                                <Button className={"spn2_motDePasse"} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} type={"primary"}>Enregistrer</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}