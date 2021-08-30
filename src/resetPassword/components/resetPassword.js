import React from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useHistory} from "react-router-dom";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const ResetPassword =()=> {
    const history = useHistory()
    const { t} = useTranslation();

    const {values,darkMode,resetPasswordOnChange}=Hooks()
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
                    {t("resetPassword.ResetPass")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("resetPassword.InputNewPass")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("resetPassword.ChooseNewPass")}</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="newPassWord"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isValidPassword(value)) {
                                                    return Promise.resolve(t("formDirectVideo.value"));
                                                }
                                                return Promise.reject(t("resetPassword.MinCharCapLetterMsg"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        className={"spn2_motDePasse"}
                                        name="newPassword"
                                        onChange={resetPasswordOnChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        placeholder={t("CompteSettings.NewPassword")}>
                                    </Input.Password>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ConfirmNewPass")}</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="confirmPassword"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isConfirmPassword(value)) {
                                                    return Promise.resolve(t("formDirectVideo.value"));
                                                }
                                                return Promise.reject(t("resetPassword.NotIdenticalPass"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        className={"spn2_motDePasse"}
                                        name="confirmPassword"
                                        onChange={resetPasswordOnChange}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        placeholder={t("resetPassword.ConfirmNewPass")}>
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
                            {t("resetPassword.ResetPassword")}</Button>
                    </Col>
                    <Col onClick={()=>{history.push("/contactClient")}}>
                        <a href="#/" className={"spn_chbx"}>
                            {t("resetPassword.ContactClient")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}