import React, {useState, useEffect, useRef} from 'react';
import {Row, Col} from 'antd'
import '../compteSettings.scss'
import {useDispatch, useSelector} from "react-redux";
import {setAccountSetting} from "../../utils/redux/actions";
import { useTranslation } from 'react-i18next';

export const SecurityAccount = () => {
    const dispatch = useDispatch()
    // dark mode from redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const { t, i18n } = useTranslation();

    return (
        <Row gutter={[0, 25]}>
            <Col offset={1} span={24}>
                <span className={"spn1_securité"}
                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Sécurité et accès")}</span>
            </Col>
            <Col offset={1} span={24}>
                <Row justify={"space-between"} gutter={[0, 15]}>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 5}} lg={{span: 5}}>
                        <Row>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"}
                                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Mot de passe")}</span>
                            </Col>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"}
                                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Fiabilité du mot de passe actuel")} :</span>
                                <span className={"spn2_motDePasse"} style={{color: "RGB(69, 195, 59)"}}>   {t("CompteSettings.Moyen")}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display: "flex ", alignItems: "center"}} xs={{span: 24}} sm={{span: 24}} md={{span: 2}}
                         lg={{span: 2}}>
                        <a className={"spn2_motDePasse"} onClick={() => dispatch(setAccountSetting(2))}>{t("CompteSettings.Modifier")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}