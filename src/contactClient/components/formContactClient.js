import React  from 'react';
import {Row, Col, Input, Button,Form} from 'antd'
import '../contactClient.scss'

import {Hooks} from "../utils/hooks";

import {GraphQLFetchData} from "../utils/graphQLFetchData";
import { useTranslation } from 'react-i18next';
import {useHistory} from "react-router-dom";

export const FormContactClient =()=> {
    const [form] = Form.useForm();
    const history = useHistory()

    const {ContactClientMutation}=GraphQLFetchData(form)

    function ContactClientMutationAction(){
        ContactClientMutation()
    }
    const {ContactClientOnChange , handleSubmitContactClient,values}= Hooks(ContactClientMutationAction , form)
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }
    const { t} = useTranslation();
    const requiredFieldRule = [{required: true, message: t("contactClient.FieldsRequired")}];

    return (
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            name="product-form"
            className={"product-form-sign"}
            onFinish={handleSubmitContactClient}
        >
        <Row gutter={[0, 40]} className={'col-contact'}>
            <Col style={{textAlign: 'center'}} span={24}>
                <span className={"spn1"}>{t("contactClient.ContactUsWithReq")}</span>
            </Col>
            <Col span={24} >
                <Row gutter={[0, 10]}>
                    <Col span={24}>
                        <Form.Item name="name" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={t("CompteSettings.Nom")}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="name" placeholder={t("CompteSettings.Nom")} value={values.contactClient.name} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name="lastName" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={t("CompteSettings.FirstName")}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="lastName" placeholder={t("CompteSettings.FirstName")} value={values.contactClient.lastName} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            className={"form-item-style"}
                            name="email"
                            label={t("CompteSettings.Email")}
                            rules={[
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (isValidEmail(value)) {
                                            return Promise.resolve('value');
                                        }
                                        return Promise.reject(t("contactClient.EnterValidMail"));
                                    },
                                }),
                            ]}
                        >
                            <Input className={"spn2"} onChange={ContactClientOnChange}
                                   name="email" placeholder={t("CompteSettings.Email")} value={values.contactClient.email} />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item name="message" className={"form-item-style"}
                                   rules={requiredFieldRule}
                                   label={t("contactClient.YourMessage")}
                        >
                            <Input.TextArea className={"spn2"} placeholder={t("contactClient.YourMessage")} name="message" onChange={ContactClientOnChange} value={values.contactClient.message} />
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row  gutter={[10, 0]} className={"text-form"}>
                    <Col>
                        <Button className={"spn2"} onClick={()=>history.push("/compteSettings")}> {t("CompteSettings.Cancel")}</Button>
                    </Col>
                    <Col>
                        <Button htmlType="submit" type={"primary"} className={"spn2"} loading={values.loading.loading}>{t("contactClient.envoyer")}</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}