import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useHistory} from "react-router-dom";
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from "@ant-design/icons";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const ResetPassword =()=> {
    const history = useHistory()
    const { t, i18n } = useTranslation();

    const {values,darkMode,resetPasswordOnChange}=Hooks()
    console.log(values)
    const isValidPassword = (password) => {

        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(password)
    }
    const isConfirmPassword = (password) => {

        return values.resetPassword.newPassword===password
    }
    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("resetPassword.Réinitialisez votre mot de passe")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("resetPassword.Presque là, entrez simplement votre nouveau mot de passe et vous serez à nouveau connecté en quelques secondes.")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("resetPassword.Choisir un nouveau mot de passe")}</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="newPassWord"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isValidPassword(value)) {
                                                    return Promise.resolve(t("formDirectVideo.valeur"));
                                                }
                                                return Promise.reject(t("resetPassword.Minimum 8 caractéres avec au moins une majiscule, un chiffre et un caractère spéciale"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        className={"spn2_motDePasse"}
                                        name="newPassword"
                                        onChange={resetPasswordOnChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        placeholder={t("CompteSettings.Nouveau mot de passe")}>
                                    </Input.Password>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Confirmer la nouveau mot de passe</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="confirmPassword"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isConfirmPassword(value)) {
                                                    return Promise.resolve(t("formDirectVideo.valeur"));
                                                }
                                                return Promise.reject(t("resetPassword.Les mots de passe saisis ne sont pas identiques"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        className={"spn2_motDePasse"}
                                        name="confirmPassword"
                                        onChange={resetPasswordOnChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        placeholder={t("resetPassword.Confirmer la nouveau mot de passe")}>
                                    </Input.Password>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button loading={values.constraintData.loadingResetPassword}  className={"spn_chbx"} style={{width:"100%"}}type="primary" htmlType="submit">
                            {t("resetPassword.Réinitialiser le mot de passe")}</Button>
                    </Col>
                    <Col onClick={()=>{history.push("/contactClient")}}>
                        <a className={"spn_chbx"}>
                            {t("resetPassword.Contactez notre support client")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}