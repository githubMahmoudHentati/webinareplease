import React  from 'react';
import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const FormConfirmAccount =()=> {
    const history = useHistory()
    const {ResendConfirmAccount}=Hooks()
    const { t, i18n } = useTranslation();

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("ConfirmAccount.E-mail de confirmation envoyé !")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("ConfirmAccount.Veuillez vérifier votre courrier électronique  pour  valider l'inscription.")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize: "14px"}} className={"span_connexion"}>
                {t("ConfirmAccount.Si vous ne voyez pas l'e-mail, il se peut qu'il se trouve dans votre dossier de courrier indésirable ou que votre compte Webinarplease se trouve sous une autre adresse e-mail.")}
                </span>
            </Col>
            <Col span={24}>
                <span>{t("ConfirmAccount.vous n'avez pas trouvé l'email?")}     </span>
                <a className={"spn_chbx"} onClick={ResendConfirmAccount}>
                    {t("ConfirmAccount.Renvoyer l'e-mail de confirmation")}</a>
            </Col>
        </Row>
    )
}