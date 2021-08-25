import React, {useEffect} from 'react';
import {Row, Col, Input, Button,Checkbox, Form} from 'antd'
import '../connexion.scss'
import {UserOutlined,LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Hooks} from "../utils/hooks";
import {setForgetPasswordConstraintDataOnchange} from "../../forgetPassword/store/forgetPasswordAction";
import {useDispatch} from "react-redux";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {setConnexionConstraintDataOnchange, setConnexionCredential} from "../store/connexionAction";
import { useTranslation } from 'react-i18next';

export const FormConnexion =()=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const history = useHistory()
    dispatch(setForgetPasswordConstraintDataOnchange({constraintDataNameChange:"passwordSent",constraintDataValueChange:false}))
    const { t} = useTranslation();



    useEffect(() => {
        const isRememberMe = localStorage.getItem('isRememberMe')?localStorage.getItem('isRememberMe'):false;
        if (isRememberMe){
            form.setFieldsValue( {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password'),
                isRememberMe:true
            })
            dispatch(setConnexionCredential(
                {
                    username:localStorage.getItem('username'),
                    password:localStorage.getItem('password'),
                }
            ))
            dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"isRememberMe", constraintDataValueChange:true}));
        }
        else{
            form.resetFields();
        }
    }, []);

    const requiredFieldRule = [{required: true, message: t('forgetPassword.FieldsRequired')}];
    const {Connexion}=GraphQLFetchData(form)
    const{handleSubmit,values,connexionOnChange,connexionOnChangeButton}=Hooks(Connexion)
    const toForgotPassword=()=>{
        document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
        dispatch(setConnexionConstraintDataOnchange({
            constraintDataNameChange: "connexionError",
            constraintDataValueChange: false
        }))
        history.push("/forgot-password")
    }

    const toSignUp=()=>{
        document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
        dispatch(setConnexionConstraintDataOnchange({
            constraintDataNameChange: "connexionError",
            constraintDataValueChange: false
        }))
        history.push("/PackagePayement")
    }

    return(
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            className={"product-form-sign"}
            onFinish={handleSubmit}
        >
        <Row gutter={[0, 40]} className={'col-connexion-sign'}>
            <Col span={24}>
                <span className={"span_connexion"}>{t("FormConnexion.Connexion")}</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 20]} >

                    <Col span={24} className={"col_input"}>
                        <Form.Item name="username" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                        <Input value={values.connexion.username} name="username" onChange={connexionOnChange}  placeholder="Email" prefix={<UserOutlined/>}/>
                        </Form.Item>
                    </Col>
                    <Col span={24} className={"col_input"}>
                        <Form.Item
                            className={"form-item-style"}
                            name="password"
                            rules={requiredFieldRule}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                value={values.connexion.password}
                                onChange={connexionOnChange}
                                className={"spn2"}
                                name="password"
                                placeholder="Mot de passe"
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            />
                        </Form.Item>
                    </Col>
                    {values.constraintData.connexionError &&
                    <Col span={24} className={"col_input"}>
                        <span style={{color: "red"}}>{t("FormConnexion.InfosVerificationMsg")}</span>
                    </Col>
                    }
                    <Col span={24}>
                        <Row justify="space-between">
                            <Col>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="isRememberMe"
                                    valuePropName="checked"
                                >
                                <Checkbox value="isRememberMe" name="isRememberMe" onChange={connexionOnChangeButton} ><span className={"spn_chbx"}>{t("FormConnexion.RememberMe")}</span></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col>
                                <a href="#/" onClick={()=>{toForgotPassword()}} className={"spn_chbx"}> {t("FormConnexion.ForgotPassword")}</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} >
                    <Col span={24}>
                        <Button
                            onClick={()=>{dispatch(setConnexionConstraintDataOnchange({
                            constraintDataNameChange: "connexionError",
                            constraintDataValueChange: false
                        }))}} loading={values.constraintData.loadingConnexion}
                            className={"spn_chbx"} style={{width:"100%"}}type="primary" htmlType="submit">{t("FormConnexion.Connexion")}</Button>
                    </Col>
                    <Col >
                        <span className={"spn_chbx"}>{t("FormConnexion.NotYetMem")}</span>
                    </Col>
                    <Col onClick={()=>{toSignUp()}}>
                        <a href="#/" className={"spn_chbx"}>{t("FormConnexion.SignUp")}</a>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}
