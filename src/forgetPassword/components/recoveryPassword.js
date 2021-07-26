import React  from 'react';
import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const RecoveryPassword =()=> {
    const history = useHistory()
    const { t, i18n } = useTranslation();

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    {t("forgetPassword.E-mail de récupération envoyé !")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("forgetPassword.Veuillez vérifier votre courrier électronique dans les 2 prochaines heures pour connaître les prochaines étapes pour réinitialiser votre mot de passe.")}
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("forgetPassword.Si vous ne voyez pas l'e-mail, il se peut qu'il se trouve dans votre dossier de courrier indésirable ou que votre compte Webinarplease se trouve sous une autre adresse e-mail.")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button  onClick={()=>{history.push("/connexion")}} className={"spn_chbx"} style={{width:"100%"}}type="primary" >{t("forgetPassword.Retour à la page connexion")}
                        </Button>
                    </Col>
                    <Col onClick={()=>{history.push("/contactClient")}}>
                        <a className={"spn_chbx"}>
                            {t("forgetPassword.Contactez notre support client")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}