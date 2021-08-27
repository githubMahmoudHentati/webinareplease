import React  from 'react';
import { Col, Row} from "antd";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const FormConfirmAccount =()=> {

    const {ResendConfirmAccount}=Hooks()
    const { t} = useTranslation();

    return(
        <Row gutter={[0, 30]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("ConfirmAccount.ConfirmationSend")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("ConfirmAccount.EmailCheck")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize: "14px"}} className={"span_connexion"}>
                {t("ConfirmAccount.NotFoundEmailMsg")}
                </span>
            </Col>
            <Col span={24}>
                <span>{t("ConfirmAccount.EmailNotFound")}     </span>
                <a href="#/" className={"spn_chbx"} onClick={ResendConfirmAccount}>
                    {t("ConfirmAccount.ResendEmail")}</a>
            </Col>
        </Row>
    )
}