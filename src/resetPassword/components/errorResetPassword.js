import {Button, Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import {Hooks} from "../utils/hooks";

export const ErrorResetPassword =()=> {
    const history = useHistory()
    const {values}=Hooks()

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
                            Ce lien de réinitialisation de mot de passe n'était plus valide. Cela vous ennuierait-il d'en activer un nouveau ?
                            </span>
                </Col>
                :
                <Row gutter={[0, 20]}>
                    <Col span={24}>
                            <span style={{fontSize: "14px"}} className={"span_connexion"}>
                            Un problème est survenu lors de la réinitialisation de votre mot de passe.
                            </span>
                    </Col>
                    <Col span={24}>
                                <span style={{fontSize: "14px"}} className={"span_connexion"}>
                            Voulez-vous réessayer ?
                            </span>
                    </Col>
                </Row>
            }
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <Button onClick={() => {
                            history.push("/forgot-password")
                        }} className={"spn_chbx"} style={{width: "100%"}} type="primary">Obtenir un nouveau lien
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