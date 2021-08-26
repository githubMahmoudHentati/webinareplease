import React  from 'react';
import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';


export const RecoveryPassword =()=> {
    const history = useHistory()
    const { t} = useTranslation();

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                  Woohoo!
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                {t("resetPassword.UseNewPassMsg")}
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button  onClick={()=>{history.push("/connexion")}} className={"spn_chbx"} style={{width:"100%"}}type="primary" >Retour à la page connexion
                        </Button>
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