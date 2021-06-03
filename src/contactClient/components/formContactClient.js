import React ,{Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import '../contactClient.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';


export const FormContactClient =()=> {
    return (
        <Row gutter={[0, 40]} className={'col-signUp'}>
            <Col style={{textAlign: 'center', fontSize: "20px", fontFamily: "system-ui", fontWeight: "bold"}} span={24}>
                <span>Créez votre compte gratuitement</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span>Nom :</span>
                            </Col>
                            <Col span={19}>
                                <Input placeholder={"Nom"}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span>Prénom :</span>
                            </Col>
                            <Col span={19}>
                                <Input placeholder={"Prénom"}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span>E-mail :</span>
                            </Col>
                            <Col span={19}>
                                <Input placeholder={"E-mail"}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span>Votre message :</span>
                            </Col>
                            <Col span={19}>
                                <Input.TextArea placeholder={"Votre message"}></Input.TextArea>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row  gutter={[10, 0]} className={"text-form"}>
                    <Col>
                        <Button> Annuler</Button>
                    </Col>
                    <Col>
                        <Button type={"primary"}>Envoyer</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}