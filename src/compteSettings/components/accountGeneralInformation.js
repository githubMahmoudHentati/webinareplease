import React, {useEffect} from 'react';
import {Row, Col, Input, Button, Avatar, Select, Spin, Form} from 'antd'
import '../compteSettings.scss'
import {UserOutlined,LoadingOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import Hooks from "../utils/hooks";
import {AvatarUpload} from "./avatarUpload"
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {
    setConstraintDataOnchange,
    setErrorVisibility,
    setGeneralInformationOnchange
} from "../store/accountSettingsAction";
import {useHistory} from "react-router-dom";

import {useTranslation} from 'react-i18next';
import axios from 'axios';

import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'

const {Option} = Select;

export const AccountGeneralInformation = ({form}) => {
    const history = useHistory()


    const dispatch = useDispatch()
    const {UpdateAccountSetting} = GraphQLFetchData(form)
    const {
        generalInformationOnChange,
        generalInformationOnChangeSelect,
        handleSubmit,
        generalInformationOnChangeAvatar,
        values,
        darkMode,
    } = Hooks(UpdateAccountSetting)

    const GetBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

    }
    const onSave =(file)=>{
        let url = process.env.REACT_APP_API_WEBINARPLEASE_HOST
        let token = localStorage.getItem('jwtToken')
        axios({
            url: url,
            method: 'post',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: file
        }).then((result) => {
         let value=result.data.data.uploadLogo;
           if (result.data.data.uploadLogo){
               dispatch(setErrorVisibility({
                   ErrorVisibilityName: "errorVisibility",
                   ErrorVisibilityValue: false
               }))
           }else{
               value=""
               dispatch(setErrorVisibility({
                   ErrorVisibilityName: "errorVisibility",
                   ErrorVisibilityValue: true
               }))
           }
            generalInformationOnChangeAvatar(value)
        }).catch(error => {
            console.log("error",error)
        });
    }
    const handleChange = async info => {

        if (info.file.status === 'uploading') {

             dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "avatarLoading",
                constraintDataValueChange: true
            }))
            return;
        }


        //*******************Upload Avatar In Server********************/////
        let formData = new FormData();
        const variables = {
            avatar: null
        }
        const query = `
    mutation ($avatar:Upload!)
        {uploadLogo(avatar:$avatar)}
`;
        const operations = JSON.stringify({query, variables: {variables}});
        formData.append("operations", operations);
        const map = {
            "0": ["variables.avatar"]
        };
        formData.append("map", JSON.stringify(map));
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
         fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            return formData.append("0", file);
        })

        onSave(formData)
    }

    const {t} = useTranslation();


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
            document.documentElement.style.setProperty('--inputErrorForm', "red");
            document.documentElement.style.setProperty('--inputBorderErrorForm', "red");
        }
    }, [values.constraintData.isMailValid]);
    const requiredFieldRule = [{required: true, message: t("contactClient.FieldsRequired")},{max:15}];
    
  const handleChangePhone =(value)=>{
    dispatch(setGeneralInformationOnchange({generalInformationNameChange: 'phone', generalInformationValueChange: value}));
      
  }
    return (
        // <Form
        //     form={form}
        //     layout="horizontal"
        //     name="product-form"
        //     onFinish={handleSubmit}
        // >
            <Spin spinning={values.constraintData.loadingGeneralInformation}>
                <Row gutter={[10, 0]}>
                    <Col className={"col_avatar"} xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 6}}
                         xl={{span: 4}}>
                        <Row justify={"space-around"} gutter={[0, 10]}>
                            <Col offset={0} span={24}>
                             <span className={"spn_CompteSettings"}
                                   style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Avatar")}</span>
                            </Col>
                            <Col offset={0} span={24}>
                                <Avatar style={{
                                    background: darkMode === false ? "RGB(231, 247, 255)" : "#141414",
                                    border: darkMode === false ? "1px solid RGB(231, 247, 255)" : "1px solid rgba(255, 255, 255, 0.15)",
                                    color: darkMode === false ? "RGB(0, 127, 203)" : "rgba(255, 255, 255, 0.85)"
                                }} size={150}
                                        src={values.constraintData.avatarLoading ?
                                            <LoadingOutlined/> : values.generalInformation.vignette}
                                        icon={values.constraintData.avatarLoading ? <div>
                                            <LoadingOutlined/>
                                            <div style={{marginTop: 8}}>{t("CompteSettings.Upload")}</div>
                                        </div> : <UserOutlined/>}
                                />
                            </Col>
                            <Col offset={0} span={24}>
                                <AvatarUpload handleChange={handleChange} darkMode={darkMode}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col className={"col_infos-générale"} xs={{span: 24}} sm={{span: 24}} md={{span: 24}}
                         lg={{span: 12}} xl={{span: 14}}>
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
                                  }}>{t("CompteSettings.LastName")}<span className="require">*</span></span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="lastName"
                                                           rules={requiredFieldRule}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off" value={values.generalInformation.lastName}
                                                           name="lastName"
                                                           placeholder={t("CompteSettings.LastName")}
                                                           maxLength={16}
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
                                  }}>{t("CompteSettings.FirstName")}<span className="require">*</span> </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="firstName"
                                                           rules={requiredFieldRule}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off"
                                                           value={values.generalInformation.firstName}
                                                           name="firstName"
                                                           placeholder={t("CompteSettings.FirstName")}
                                                           maxLength={16}
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
                                            <Col span={23}>
                                                <Form.Item
                                                    className={"form-item-style"}
                                                    name="email"
                                                    rules={[
                                                        ({getFieldValue}) => ({
                                                            validator(_, value) {
                                                                if (isValidEmail(value)) {
                                                                    return Promise.resolve('value');
                                                                }
                                                                return Promise.reject(t('contactClient.EnterValidMail'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input autocomplete="off" value={values.generalInformation.email}
                                                           name="email"
                                                           placeholder={"Email"}
                                                           onChange={generalInformationOnChange}></Input>
                                                </Form.Item>
                                                {values.constraintData.updateAccountSettingError &&
                                                <Col span={20} className={"col_input"}>
                                                    <span
                                                        style={{color: "red"}}>{t("CompteSettings.UsedAddress")} </span>
                                                </Col>
                                                }
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.City")}  </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="city"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off" value={values.generalInformation.city}
                                                           name="city"
                                                           placeholder={t("CompteSettings.City")}
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
                                  }}>{t("CompteSettings.Address")} </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="adresse"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off" value={values.generalInformation.address}
                                                           name='adresse'
                                                           placeholder={t("CompteSettings.Address")}
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
                                  }}>{t("CompteSettings.Society")}  </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="society"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off" value={values.generalInformation.society}
                                                           name="society"
                                                           placeholder={t("CompteSettings.Society")}
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
                                  }}>{t("CompteSettings.NumberOfEmployees")} </span>
                                            </Col>
                                            <Col span={23}>
                                                <Select
                                                    className={"selectCompte"}
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
                                                    getPopupContainer={() => document.querySelector(".selectCompte")}
                                                >
                                                    <Option name="numberPerson" key={1}
                                                            value="1">{t("CompteSettings.choiceOne")}</Option>
                                                    <Option name="numberPerson" key={2}
                                                            value="2">{t("CompteSettings.choiceTwo")}</Option>
                                                    <Option name="numberPerson" key={3}
                                                            value="3">{t("CompteSettings.choiceThree")}</Option>
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[0, 10]}>
                                            <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                  }}>{t("CompteSettings.ZipCode")} </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="postalCode"
                                                           style={{marginBottom: 0}}
                                                >
                                                    <Input autocomplete="off"
                                                           value={values.generalInformation.postalCode}
                                                           name="postalCode"
                                                           placeholder={t("CompteSettings.ZipCode")}
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
                                  }}>{t("CompteSettings.Phone")}<span className="require">*</span> </span>
                                            </Col>
                                            <Col span={23}>
                                                <Form.Item name="phone"
                                                           rules={[
                                                               ({_}) => ({
                                                                   validator(_, value) {
                                                                       if (value) {
                                                                           if (isValidPhoneNumber(value)) {

                                                                               return Promise.resolve('value');
                                                                           }

                                                                           return Promise.reject(t('CompteSettings.InvalidPhone'));

                                                                       } else return Promise.reject(t('contactClient.FieldsRequired'))

                                                                   },
                                                               })
                                                           ]}
                                                           style={{marginBottom: 0}}
                                                >
                                                    <PhoneInput
                                                        international
                                                        defaultCountry="FR"
                                                        placeholder={t("CompteSettings.Phone")}
                                                        value={values.generalInformation.phone || ""}
                                                        onChange={handleChangePhone}

                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/*<Col span={23}>*/}
                                    {/*    <Row justify={"end"} gutter={[10, 0]}>*/}
                                    {/*        <Col>*/}
                                    {/*            <Button onClick={() => {*/}
                                    {/*                dispatch(setConstraintDataOnchange({*/}
                                    {/*                    constraintDataNameChange: "updateAccountSettingError",*/}
                                    {/*                    constraintDataValueChange: false*/}
                                    {/*                }))*/}
                                    {/*                document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');*/}
                                    {/*                document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');*/}
                                    {/*                history.push("/")*/}
                                    {/*            }}*/}
                                    {/*                    className={"spn_CompteSettings"} style={{*/}
                                    {/*                background: darkMode === false ? "" : "#141414",*/}
                                    {/*                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",*/}
                                    {/*                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"*/}
                                    {/*            }}>{t("CompteSettings.Cancel")}</Button>*/}
                                    {/*        </Col>*/}
                                    {/*        <Col>*/}
                                    {/*            <Button loading={values.constraintData.loadingUpdateAccountSetting}*/}
                                    {/*                    onClick={() => {*/}
                                    {/*                        dispatch(setConstraintDataOnchange({*/}
                                    {/*                            constraintDataNameChange: "updateAccountSettingError",*/}
                                    {/*                            constraintDataValueChange: false*/}
                                    {/*                        }))*/}
                                    {/*                    }}*/}
                                    {/*                    htmlType="submit" className={"spn_CompteSettings"}*/}
                                    {/*                    type={"primary"}*/}
                                    {/*            >{t("CompteSettings.Update")}</Button>*/}
                                    {/*        </Col>*/}
                                    {/*    </Row>*/}
                                    {/*</Col>*/}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Spin>
        // </Form>
    )
}