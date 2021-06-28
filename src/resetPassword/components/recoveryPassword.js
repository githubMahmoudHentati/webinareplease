import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";

export const RecoveryPassword =()=> {
    const history = useHistory()

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                  Woohoo!
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                Votre mot de passe a été mis à jour avec succès et vous pouvez maintenant l'utiliser pour vous reconnecter à Webinarplease.
                </span>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button  onClick={()=>{history.push("/connexion")}} className={"spn_chbx"} style={{width:"100%"}}type="primary" >Retour à la page connexion
                        </Button>
                    </Col>
                    <Col onClick={()=>{history.push("/contactClient")}}>
                        <a className={"spn_chbx"}>
                            Contactez notre support client</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}