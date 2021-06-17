import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Checkbox, Form} from 'antd'
import '../connexion.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Hooks} from "../utils/hooks";

export const FormConnexion =()=>{
    const [form] = Form.useForm();
    const history = useHistory()

    const isValidPassword = (password) => {

        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(password)
    }
    const requiredFieldRule = [{required: true, message: 'Champs requis'}];
    const{handleSubmit,values}=Hooks()

    return(
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmit}
        >
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>Connexion</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} >

                    <Col span={24} className={"col_input"}>
                        <Form.Item name="email" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                        <Input placeholder="default size" prefix={<UserOutlined/>}/>
                        </Form.Item>
                    </Col>
                    <Col span={24} className={"col_input"}>
                        <Form.Item
                            className={"form-item-style"}
                            name="password"
                            rules={[{
                                required: true,
                                message: "S'il vous plaît saisissez votre mot de passe!"
                            },
                                ({getFieldValue}) => ({
                                    validator(_, value) {
                                        if (isValidPassword(values.passwordIntranet)) {
                                            return Promise.resolve('value');
                                        }
                                        return Promise.reject('Minimum 8 caractéres avec au moins une majiscule, un chiffre et un caractère spéciale');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                className={"spn2"}
                                name="password"
                                placeholder="Mot de passe"
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col>
                                <Checkbox><span className={"spn_chbx"}>Se souvenir de moi</span></Checkbox>
                            </Col>
                            <Col>
                                <a className={"spn_chbx"}> Mot de passe oublié</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button className={"spn_chbx"} style={{width:"100%"}}type="primary" htmlType="submit">Connexion</Button>
                    </Col>
                    <Col >
                        <span className={"spn_chbx"}>Pas encore membre?</span>
                    </Col>
                    <Col onClick={()=>{history.push("/signUp")}}>
                        <a className={"spn_chbx"}>Inscrivez-vous</a>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}
