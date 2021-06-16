import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input,Button} from 'antd'
import '../compteSettings.scss'
import strip from "../../assets/stripe.png"
import {AccountGeneralInformation} from "./accountGeneralInformation";
import{SubscriptionTable} from "./subscriptionTable";
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";

export const AccountSubscription=()=>{
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values}=Hooks()
    return(
        <Row gutter={[0, 40]}>
            <Col span={11}>
                <Row gutter={[0, 25]} style={{borderRight:darkMode===false?"1px solid RGB(241, 241, 241)":"1px solid rgba(255, 255, 255, 0.15)"}}>
                    <Col span={24}>
                        <Row  gutter={[0, 5]}>
                            <Col span={24}>
                                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Abonement</span>
                            </Col>
                            <Col span={24} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                Votre abonnement est actuellement le suivant
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Abonnement :</span>
                            </Col>
                            <Col  >
                                <span style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.subscriptionType} <br/> {values.subscription.subscriptionAmount}<br/>{values.subscription.subscriptionMode}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Stockage utilisé :</span>
                            </Col>
                            <Col >
                                <span style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.usedStorage}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Durée du diffusion :</span>
                            </Col>
                            <Col >
                                <span style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}>  {values.subscription.diffusionDuration}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <span style={{textAlign: 'left', fontSize: "12px", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                            Vos quotes sont epuisés? vous souhaitez obtenir <br/> plus de limites?</span>
                        <a> Contactez-nous</a>
                    </Col>
                </Row>
            </Col>
            <Col offset={1} span={11}>
                <Row  gutter={[0, 25]}>
                    <Col span={24}>
                        <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>mode de paiement choisi</span>
                    </Col>
                    <Col><img className={"img-strip"} src={strip}/></Col>
                    <Col offset={1} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" }}> {values.subscription.paymentMode}</Col>
                    <Col span={24}>
                        <Button disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> Enregistrer un nouveau moyen de paiement</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Row justify={"space-between"}>
                            <Col>
                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Facture d'abonnement</span>
                            </Col>
                            <Col span={6}>
                                <Button disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> Changer mes infos de facturation</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <SubscriptionTable/>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}