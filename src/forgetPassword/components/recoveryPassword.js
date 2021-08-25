import React  from 'react';
import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const RecoveryPassword =()=> {
    const history = useHistory()
    const { t} = useTranslation();

    return(
        <Row gutter={[0, 40]} className={'col-connexion_recovery-pass'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("forgetPassword.RecoveryEmail")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("forgetPassword.CheckYourEmailBox")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("forgetPassword.NotFoundEmailMsg")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button  onClick={()=>{history.push("/connexion")}} className={"spn_chbx"} style={{width:"100%"}}type="primary" >{t("forgetPassword.BackToLogIn")}
                        </Button>
                    </Col>
                    <Col onClick={()=>{history.push("/contactClient")}}>
                        <a className={"spn_chbx"} href="#/">
                            {t("forgetPassword.ContactClient")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}