import React from 'react';
import {Row, Col,Button,Form} from 'antd'
import '../compteSettings.scss'
import strip from "../../assets/stripe.png"
import{SubscriptionTable} from "./subscriptionTable";
import {useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import { useTranslation } from 'react-i18next';

import {useHistory} from "react-router-dom";

export const AccountSubscription=()=>{
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t} = useTranslation();
    const {values}=Hooks();
    const history = useHistory()
    return(
        <Row gutter={[0, 40]}>
            <Col offset={0} xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:12}}>
                <Row gutter={[0, 25]} style={{borderRight:darkMode===false?"1px solid RGB(241, 241, 241)":"1px solid rgba(255, 255, 255, 0.15)"}}>
                    <Col span={24}>
                        <Row  gutter={[0, 5]}>
                            <Col span={24}>
                                <span className={"spn_abonnement"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Subscription")}</span>
                            </Col>
                            <Col className={"parag_abonnement"} span={24} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                {t("CompteSettings.YourSubscription")}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Subscription")} :</span>
                            </Col>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}} >
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.subscriptionType} <br/> {values.subscription.subscriptionAmount}<br/>{values.subscription.subscriptionMode}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"}  style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.UsedStorage")}:</span>
                            </Col>
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}}>
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}> {values.subscription.usedStorage}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row >
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:6}}>
                                <span className={"parag_abonnement_gras"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.BroadcastDuration")} :</span>
                            </Col>
                            <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:18}}>
                                <span className={"parag_abonnement"} style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}}>{values.subscription.diffusionDuration}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <span className={"spn_limite"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                            {t("CompteSettings.Quotes")} <br/> {t("CompteSettings.limits")}</span>
                        <a href="#/" className={"spn_limite"} onClick={()=>{history.push("/contactClient") ;  document.querySelector(':root').classList.remove('dark')}}> {t("CompteSettings.ContactUs")}</a>
                    </Col>
                </Row>
            </Col>
            <Col offset={1}  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:11}} className={"col_modePaiement"}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span className={"spn_abonnement"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.PaymentMethod")}</span>
                    </Col>
                    <Col><img className={"img-strip"} src={strip} alt={""}/></Col>
                    <Col  className={"parag_abonnement"} offset={1} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" }}> {values.subscription.paymentMode}</Col>
                    <Col span={24}>
                        <Button className={"parag_abonnement"} disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.25)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> {t("CompteSettings.NewPaymentMeth")}</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} className={"row_abonnement"} >
                    <Col offset={0} span={24}>
                        <Row justify={"space-between"}>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 14}} lg={{span:14}}>
                                <span className={"spn_abonnement"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.SubscriptionBill")}</span>
                            </Col>
                            <Col className={"col_update_infos"} xs={{ span: 24}} sm={{ span: 24}} md={{ span: 10}} lg={{span:10}} >
                                <Button className={"parag_abonnement"} disabled style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.25)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}> {t("CompteSettings.ChangeBillInfos")}</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col  xs={{ span: 23}} sm={{ span: 23}} md={{ span: 24}} lg={{span:24}} >
                        <SubscriptionTable/>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}