import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";

export const RecoveryPassword =()=> {
    const history = useHistory()

    return(
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>
                    E-mail de récupération envoyé !
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                Veuillez vérifier votre courrier électronique dans les 2 prochaines heures pour connaître les prochaines étapes pour réinitialiser votre mot de passe.
                </span>
            </Col>
            <Col span={24}>
                <span style={{fontSize:"14px"}} className={"span_connexion"}>
                Si vous ne voyez pas l'e-mail, il se peut qu'il se trouve dans votre dossier de courrier indésirable ou que votre compte Buffer se trouve sous une autre adresse e-mail.
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