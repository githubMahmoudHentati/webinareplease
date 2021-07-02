import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Checkbox, Form} from 'antd'
import '../connexion.scss'
import {UserOutlined,LockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Hooks} from "../utils/hooks";
import {setForgetPasswordConstraintDataOnchange} from "../../forgetPassword/store/forgetPasswordAction";
import {useDispatch} from "react-redux";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {setConnexionConstraintDataOnchange, setConnexionCredential} from "../store/connexionAction";

export const FormConnexion =()=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const history = useHistory()
    dispatch(setForgetPasswordConstraintDataOnchange({constraintDataNameChange:"passwordSent",constraintDataValueChange:false}))

    const isValidPassword = (password) => {

        return !values.constraintData.connexionError
    }

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

    const requiredFieldRule = [{required: true, message: 'Champs requis'}];

    const {Connexion}=GraphQLFetchData(form)

    const{handleSubmit,values,connexionOnChange,connexionOnChangeButton}=Hooks(Connexion)

    console.log(values)

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
            onFinish={handleSubmit}
        >
        <Row gutter={[0, 40]} className={'col-connexion'}>
            <Col span={24}>
                <span className={"span_connexion"}>Connexion</span>
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
                        <span style={{color: "red"}}>Oups, nous n'avons pas pu vous connecter. Veuillez vérifier vos informations et réessayer</span>
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
                                <Checkbox value="isRememberMe" name="isRememberMe" onChange={connexionOnChangeButton} ><span className={"spn_chbx"}>Se souvenir de moi</span></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col>
                                <a  onClick={()=>{toForgotPassword()}} className={"spn_chbx"}> Mot de passe oublié</a>
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
                            className={"spn_chbx"} style={{width:"100%"}}type="primary" htmlType="submit">Connexion</Button>
                    </Col>
                    <Col >
                        <span className={"spn_chbx"}>Pas encore membre?</span>
                    </Col>
                    <Col onClick={()=>{toSignUp()}}>
                        <a className={"spn_chbx"}>Inscrivez-vous</a>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}
