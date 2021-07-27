import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Input, Button, Avatar, Select, Spin, Form} from 'antd'
import '../compteSettings.scss'
import {UserOutlined, UploadOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import {AvatarUpload} from "./avatarUpload"
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {setConnexionConstraintDataOnchange, setConnexionCredential} from "../../connexion/store/connexionAction";
import {setConstraintDataOnchange} from "../store/accountSettingsAction";
import {useHistory} from "react-router-dom";
import {setSignUpConstraintDataOnchange} from "../../signUp/store/signUpAction";
import { useTranslation } from 'react-i18next';

const {Option} = Select;

export const AccountGeneralInformation = () => {
    const history = useHistory()
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const {UpdateAccountSetting} = GraphQLFetchData(form)
    const {
        generalInformationOnChange,
        generalInformationOnChangeSelect,
        handleSubmit,
        values,
        darkMode
    } = Hooks(UpdateAccountSetting)
    console.log("generalInformation", values)
    const { t, i18n } = useTranslation();
    const requiredFieldRule = [{required: true, message: t("contactClient.Champs requis")}];

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        dispatch(setConstraintDataOnchange({
            constraintDataNameChange: "isMailValid",
            constraintDataValueChange: re.test(email)
        }))
        return re.test(email)
    }

    useEffect(() => {
        if (values.constraintData.isMailValid === true) {
            document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
            document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        }
        if (values.constraintData.isMailValid === false) {
            console.log(values.constraintData.isMailValid)

            document.documentElement.style.setProperty('--inputErrorForm', "red");
            document.documentElement.style.setProperty('--inputBorderErrorForm', "red");
        }
    }, [values.constraintData.isMailValid]);


    return (
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmit}
        >
            <Spin spinning={values.constraintData.loadingGeneralInformation}>
                <Row gutter={[20, 0]}>
                    <Col className={"col_avatar"} xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}}>
                        <Row justify={"space-between"} gutter={[0, 15]}>
                            <Col offset={2} span={22}>
                             <span className={"spn_CompteSettings"}
                                   style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Avatar")}</span>
                            </Col>
                            <Col span={24}>
                                <Avatar style={{
                                    background: darkMode === false ? "RGB(231, 247, 255)" : "#141414",
                                    border: darkMode === false ? "1px solid RGB(231, 247, 255)" : "1px solid rgba(255, 255, 255, 0.15)",
                                    color: darkMode === false ? "RGB(0, 127, 203)" : "rgba(255, 255, 255, 0.85)"
                                }} size={150}
                                        src={values.generalInformation.vignette}
                                        icon={values.constraintData.avatarLoading ? <div>
                                            <LoadingOutlined/>
                                            <div style={{marginTop: 8}}>{t("CompteSettings.Upload")}</div>
                                        </div> : !values.generalInformation.vignette ? <UserOutlined/> : ""}
                                />
                            </Col>
                            <Col span={24}>
                                <AvatarUpload/>
                            </Col>
                        </Row>
                    </Col>
                    <Col className={"col_infos-générale"} xs={{span: 24}} sm={{span: 24}} md={{span: 24}}
                         lg={{span: 12}}>
                        <Row gutter={[0, 30]}>
                            <Col span={24} className={"col-forms"}>
                         <span style={{
                             textAlign: 'left',
                             fontSize: "20px",
                             fontWeight: "500",
                             fontFamily: "SF Pro Display",
                             color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                         }}>{t("CompteSettings.GenInfo")}</span>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[0, 20]}>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Nom")}<span className="require">*</span></span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="firstName"
                                                           rules={requiredFieldRule}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.firstName} name="firstName"
                                                           placeholder={"Nom"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Prénom")}<span className="require">*</span> </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="lastName"
                                                           rules={requiredFieldRule}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.lastName} name="lastName"
                                                           placeholder={"Prénom"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Email")}<span className="require">*</span> </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item
                                                    className={"form-item-style"}
                                                    name="email"
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
                                                    <Input value={values.generalInformation.email} name="email"
                                                           placeholder={"Email"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {values.constraintData.updateAccountSettingError &&
                                    <Col offset={4} span={20} className={"col_input"}>
                                        <span style={{color: "red"}}>{t("CompteSettings.Oups, Cette adresse e-mail est déjà utilisée par un autre utilisateur")} </span>
                                    </Col>
                                    }
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Ville")}  </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="city"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.city} name="city"
                                                           placeholder={"Ville"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Adresse")} </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="address"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.address} name='address'
                                                           placeholder={"Adresse"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Nombre d'employées")} </span>
                                            </Col>
                                            <Col span={24}>
                                                <Select
                                                    showSearch
                                                    style={{width: "100%"}}
                                                    placeholder="Entre 5 - 10 employé(e)s"
                                                    optionFilterProp="children"
                                                    onChange={generalInformationOnChangeSelect}
                                                    name="numberPerson"
                                                    value={values.generalInformation.numberPerson}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option name="numberPerson" key={1} value="1">{t("CompteSettings.5-10 employé(e)s")}</Option>
                                                    <Option name="numberPerson" key={2} value="2">{t("CompteSettings.10-20 employé(e)s")}</Option>
                                                    <Option name="numberPerson" key={3} value="3">{t("CompteSettings.20-30 employé(e)s")}</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Code postale")} </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="postalCode"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.postalCode}
                                                           name="postalCode"
                                                           placeholder={"Code postale"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.Téléphone")}<span className="require">*</span> </span>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item name="phone"
                                                           rules={requiredFieldRule}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input value={values.generalInformation.phone} name='phone'
                                                           placeholder={"Téléphone"}></Input>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row justify={"end"} gutter={[10, 0]}>
                                            <Col>
                                                <Button onClick={() => {
                                                    dispatch(setConstraintDataOnchange({
                                                        constraintDataNameChange: "updateAccountSettingError",
                                                        constraintDataValueChange: false
                                                    }))
                                                    document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                                    document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
                                                    history.push("/")
                                                }}
                                                        className={"spn_CompteSettings"} style={{
                                                    background: darkMode === false ? "" : "#141414",
                                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                                                    border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                                                }}>{t("CompteSettings.Annuler")}</Button>
                                            </Col>
                                            <Col>
                                                <Button loading={values.constraintData.loadingUpdateAccountSetting}
                                                        onClick={() => {
                                                            dispatch(setConstraintDataOnchange({
                                                                constraintDataNameChange: "updateAccountSettingError",
                                                                constraintDataValueChange: false
                                                            }))
                                                        }}
                                                        htmlType="submit" className={"spn_CompteSettings"}
                                                        type={"primary"} style={{
                                                    background: darkMode === false ? "" : "#141414",
                                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                                                    border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                                                }}>{t("CompteSettings.Mettre à jour")}</Button>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        </Form>
    )
}