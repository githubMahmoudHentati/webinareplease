import React  from 'react';
import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

export const ErrorResetPassword =()=> {
    const history = useHistory()
    const {values}=Hooks()
    const { t} = useTranslation();

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                  Whoops!
                </span>
            </Col>
            {values.constraintData.tokenExpired ?
                <Col span={24}>
                            <span style={{fontSize: "14px"}} className={"span_connexion"}>
                                {t("resetPassword.InvalidLink")}
                            </span>
                </Col>
                :
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                            <span style={{fontSize: "14px"}} className={"span_connexion"}>
                            {t("resetPassword.ProblemInResetPass")}
                            </span>
                    </Col>
                    <Col span={24}>
                                <span style={{fontSize: "14px"}} className={"span_connexion"}>
                            {t("resetPassword.Voulez-vous réessayer ?")}
                            </span>
                    </Col>
                </Row>
            }
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Button onClick={() => {
                            history.push("/forgot-password")
                        }} className={"spn_chbx"} style={{width: "100%"}} type="primary"> {t("resetPassword.GetNewLink")}
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