import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input,Button} from 'antd'
import '../compteSettings.scss'
import strip from "../../assets/stripe.png"
import {CompteGeneralInformation} from "./CompteGeneralInformation";
import{SubscriptionTable} from "./subscriptionTable";

export const AccountSubscription=()=>{
    return(
        <Row gutter={[0, 40]}>
            <Col span={11}>
                <Row gutter={[0, 25]} style={{borderRight:"1px solid RGB(241, 241, 241)"}}>
                    <Col span={24}>
                        <Row  gutter={[0, 5]}>
                            <Col span={24}>
                                <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Abonement</span>
                            </Col>
                            <Col span={24}>
                                Votre abonnement est actuellement le suivant
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Abonnement :</span>
                            </Col>
                            <Col  >
                                <span style={{color:"RGBA(0, 0, 0, 0.65)"}}> Forfait Pro <br/> 99EUR/Mois<br/>Engagement et paiment mensuel</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Stockage utilisé :</span>
                            </Col>
                            <Col >
                                <span style={{color:"RGBA(0, 0, 0, 0.65)"}}> 500 Mo /1Go</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col span={6}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight:"500"}}>Durée du diffusion :</span>
                            </Col>
                            <Col >
                                <span style={{color:"RGBA(0, 0, 0, 0.65)"}}> 20 mins /100 min</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <span style={{textAlign: 'left', fontSize: "12px", fontFamily: "system-ui"}}>
                            Vos quotes sont epuisés? vous souhaitez obtenir <br/> plus de limites?</span>
                        <a> Contactez-nous</a>
                    </Col>
                </Row>
            </Col>
            <Col offset={1} span={11}>
                <Row  gutter={[0, 25]}>
                    <Col span={24}>
                        <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>mode de paiement choisi</span>
                    </Col>
                    <Col><img className={"img-strip"} src={strip}/></Col>
                    <Col offset={1}> Paiement avec stripe</Col>
                    <Col span={24}>
                        <Button disabled> Enregistrer un nouveau moyen de paiement</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Row justify={"space-between"}>
                            <Col>
                                <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Facture d'abonnement</span>
                            </Col>
                            <Col span={6}>
                                <Button disabled> Changer mes infos de facturation</Button>
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