import React, {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Checkbox, Form} from 'antd'
import '../contactClient.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";

export const FormContactClient =()=> {
    const {ContactClientOnChange , handleSubmitContactClient,values}= Hooks()
    const [form] = Form.useForm();

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    const requiredFieldRule = [{required: true, message: 'Champs requis'}];
    console.log("values-contaclient",values)

    return (
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmitContactClient}
        >
        <Row gutter={[0, 40]} className={'col-signUp'}>
            <Col style={{textAlign: 'center'}} span={24}>
                <span className={"spn1"}>Contactez-nous et présicez vos besions</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]}>
                    <Col span={24}>
                        <Form.Item name="name" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={"Nom"}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="name" placeholder={"Nom"}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="lastName" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={"Prenom"}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="lastName" placeholder={"Prenom"}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className={"form-item-style"}
                            name="email"
                            label={"E-mail"}
                            rules={[
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (isValidEmail(value)) {
                                            return Promise.resolve('value');
                                        }
                                        return Promise.reject('Veuillez entrer un mail valide');
                                    },
                                }),
                            ]}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="email" placeholder={"E-mail"}></Input>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="message" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={"Votre message"}
                        >
                            <Input.TextArea className={"spn2"} placeholder={"Votre message"} name="message" onChange={ContactClientOnChange}></Input.TextArea>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={16}>
                <Row  gutter={[10, 0]} className={"text-form"}>
                    <Col>
                        <Button className={"spn2"}> Annuler</Button>
                    </Col>
                    <Col>
                        <Button htmlType="submit" type={"primary"} className={"spn2"} onClick={handleSubmitContactClient}>Envoyer</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}