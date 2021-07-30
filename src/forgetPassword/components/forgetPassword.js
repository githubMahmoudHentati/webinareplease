import React, { useState,useEffect,useRef } from 'react';
import {Button, Col, Form, Input, Row} from "antd";
import {useHistory} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const ForgetPassword =()=> {
    const history = useHistory()
    const { t, i18n } = useTranslation();
    const requiredFieldRule = [{required: true, message: t('forgetPassword.FieldsRequired')}];
    const {forgetPasswordOnChange,values}=Hooks()


    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("forgetPassword.ResetPass")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                    {t("forgetPassword.TellUsEmail")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} >
                    <Col span={24} className={"col_input"}>
                        <Form.Item name="username" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <Input name="email" onChange={forgetPasswordOnChange}  placeholder={t("forgetPassword.YourMailAddress")} prefix={<UserOutlined/>}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button loading={values.constraintData.loadingForgetPassword}  className={"spn_chbx"} style={{width:"100%"}}type="primary" htmlType="submit">{t("forgetPassword.SendResetMail")}</Button>
                    </Col>
                    <Col onClick={()=>{history.push("/connexion")}}>
                        <a className={"spn_chbx"}>
                            {t("forgetPassword.LoginRedirect")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}