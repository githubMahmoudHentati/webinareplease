import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input,Button} from 'antd'
import '../compteSettings.scss'
import strip from "../../assets/stripe.png"
import {AccountGeneralInformation} from "./accountGeneralInformation";
import{SubscriptionTable} from "./subscriptionTable";
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const AccountSubscription=()=>{
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t, i18n } = useTranslation();
    const {values}=Hooks()
    return(
        <Row gutter={[0, 40]}>
            <Col offset={1} xs={{ span: 24}} sm={{ span: 24}} md={{ span: 11}} lg={{span:11}}>
                <Row gutter={[0, 25]} style={{borderRight:darkMode===false?"1px solid RGB(241, 241, 241)":"1px solid rgba(255, 255, 255, 0.15)"}}>
                    <Col span={24}>
                        <Row  gutter={[0, 5]}>
                            <Col span={24}>
                                <span className={"spn_abonnement"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Abonnement")}</span>
                            </Col>
                            <Col className={"parag_abonnement"} span={24} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                {t("CompteSettings.Votre abonnement est actuellement le suivant")}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Abonnement")} :</span>
                            </Col>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}} >
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.subscriptionType} <br/> {values.subscription.subscriptionAmount}<br/>{values.subscription.subscriptionMode}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"}  style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Stockage utilisé")}:</span>
                            </Col>
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}}>
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.usedStorage}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Durée du diffusion")} :</span>
                            </Col>
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}}>
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}>  {values.subscription.diffusionDuration}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <span className={"spn_limite"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                            {t("CompteSettings.Vos quotes sont epuisés? vous souhaitez obtenir")} <br/> {t("CompteSettings.plus de limites?")}</span>
                        <a className={"spn_limite"}> {t("CompteSettings.Contactez-nous")}</a>
                    </Col>
                </Row>
            </Col>
            <Col offset={1}  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 11}} lg={{span:11}}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span className={"spn_abonnement"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Mode de paiement choisi")}</span>
                    </Col>
                    <Col><img className={"img-strip"} src={strip}/></Col>
                    <Col  className={"parag_abonnement"} offset={1} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" }}> {values.subscription.paymentMode}</Col>
                    <Col span={24}>
                        <Button className={"parag_abonnement"} disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> {t("CompteSettings.Enregistrer un nouveau moyen de paiement")}</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]}>
                    <Col offset={1} span={24}>
                        <Row justify={"space-between"}>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 14}} lg={{span:14}}>
                                <span className={"spn_abonnement"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Facture d'abonnement")}</span>
                            </Col>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 10}} lg={{span:10}}>
                                <Button className={"parag_abonnement"} disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> {t("CompteSettings.Changer mes infos de facturation")}</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col  span={24}>
                        <SubscriptionTable/>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}