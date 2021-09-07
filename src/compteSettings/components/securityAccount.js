import React from 'react';
import {Row, Col} from 'antd'
import '../compteSettings.scss'
import {useDispatch, useSelector} from "react-redux";
import {setAccountSetting} from "../../utils/redux/actions";
import { useTranslation } from 'react-i18next';

export const SecurityAccount = () => {
    const dispatch = useDispatch()
    // dark mode from redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const { t} = useTranslation();

    return (
        <Row gutter={[0, 25]}>
            <Col offset={0} span={24}>
                <span className={"spn1_securité"}
                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.SecurityAndAccess")}</span>
            </Col>
            <Col offset={0} xs={{span: 20}} sm={{span: 20}} md={{span: 24}} lg={{span: 16}} className={"col_security"}>
                <Row justify={"space-between"} gutter={[0, 15]} className={"row_password"}>
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 20}} lg={{span: 20}}>
                        <Row>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"}
                                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Password")}</span>
                            </Col>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"}
                                      style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.StrengthPass")} :</span>
                                <span className={"spn2_motDePasse"} style={{color: "RGB(69, 195, 59)"}}>   {t("CompteSettings.Medium")}</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display: "flex ", alignItems: "center"}} xs={{span: 24}} sm={{span: 24}} md={{span: 2}}
                         lg={{span: 1}}>
                        <a href="#/" className={"spn2_motDePasse"} onClick={() => dispatch(setAccountSetting(2))}>{t("CompteSettings.Modifier")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}