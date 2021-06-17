import React ,{Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox} from 'antd'
import '../contactClient.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";

export const FormContactClient =()=> {
    const {ContactClientOnChange , handleSubmitContactClient}= Hooks()

    return (
        <Row gutter={[0, 40]} className={'col-signUp'}>
            <Col style={{textAlign: 'center'}} span={24}>
                <span className={"spn1"}>Contactez-nous et présicez vos besions</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]}>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span className={"spn2"}>Nom :</span>
                            </Col>
                            <Col span={19}>
                                <Input className={"spn2"} placeholder={"Nom"} name="name" onChange={ContactClientOnChange}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span className={"spn2"}>Prénom :</span>
                            </Col>
                            <Col span={19}>
                                <Input className={"spn2"} placeholder={"Prénom"} name="lastName" onChange={ContactClientOnChange} ></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span className={"spn2"} >E-mail :</span>
                            </Col>
                            <Col span={19}>
                                <Input className={"spn2"} placeholder={"E-mail"} name="email" onChange={ContactClientOnChange}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span className={"spn2"}>Votre message :</span>
                            </Col>
                            <Col span={19}>
                                <Input.TextArea className={"spn2"} placeholder={"Votre message"} name="message" onChange={ContactClientOnChange}></Input.TextArea>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row  gutter={[10, 0]} className={"text-form"}>
                    <Col>
                        <Button className={"spn2"}> Annuler</Button>
                    </Col>
                    <Col>
                        <Button type={"primary"} className={"spn2"} onClick={handleSubmitContactClient}>Envoyer</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}