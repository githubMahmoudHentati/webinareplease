import React  from 'react';
import {useEffect} from 'react'
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox , Select,Form} from 'antd'
import '../signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {HooksSignUp} from "../utils/hooks";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {setSignUpConstraintDataOnchange} from "../store/signUpAction";
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';
const { Option } = Select;


export const FormSignUp =({child1,child2})=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
    };

    const { t, i18n } = useTranslation();

    const {signUpOnChange,signUpOnChangeSelect,valuesSignUp,SignUpOnChangeButton}= HooksSignUp()

    const isValidPhone= (phone) => {
        return phone.match( /^-?[\d.]+(?:e-?\d+)?$/)
    }

    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:"isMailValid",constraintDataValueChange:re.test(email)}))
        return re.test(email)
    }

    useEffect(() => {
        if (valuesSignUp.constraintData.isMailValid===true)
        {
            document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
            document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        }
        if (valuesSignUp.constraintData.isMailValid===false)
        {
            console.log(valuesSignUp.constraintData.isMailValid)

            document.documentElement.style.setProperty('--inputErrorForm', "red");
            document.documentElement.style.setProperty('--inputBorderErrorForm', "red");
        }
    }, [valuesSignUp.constraintData.isMailValid]);


    const isValidPassword = (password) => {

        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(password)
    }
    const requiredFieldRule = [{required: true, message: t("contactClient.FieldsRequired")}];

    console.log("signUp",valuesSignUp)
    return(

            <Row gutter={[0, 40]} className={'col-signUp'}>
                <Col className={"spn1"} style={{textAlign: 'center'}} span={24}>
                    {child1}
                </Col>
                <Col span={24}>
                    <Row gutter={[0, 30]}>
                        <Col span={24}>
                            <Row gutter={[0, 10]} justify={"end"}>
                                <Col span={24}>
                                    <Form.Item name="firstName" className={"form-item-style"}
                                               rules={requiredFieldRule}
                                               label={t("CompteSettings.Nom")}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="firstName" placeholder={t("CompteSettings.Nom")}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="lastName" className={"form-item-style"}
                                               rules={requiredFieldRule}
                                               label={t("CompteSettings.FirstName")}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="lastName" placeholder={t("CompteSettings.FirstName")}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        className={"form-item-style"}
                                        name="email"
                                        label={<div><span className="require">*</span> <span style={{color:"rgba(0, 0, 0, 0.85)"}} >{t("CompteSettings.Email")}</span></div>}
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
                                        <Input  className={"spn2"} onChange={signUpOnChange}
                                               name="email" placeholder={t("CompteSettings.mail")}></Input>
                                    </Form.Item>
                                </Col>
                                {valuesSignUp.constraintData.signUpError &&
                                <Col offset={4} span={20} className={"col_input"}>
                                    <span style={{color: "red"}}>{t("CompteSettings.UsedAddress")}</span>
                                </Col>
                                }
                                <Col span={24}>
                                    <Form.Item name="phone" className={"form-item-style"}
                                               label={<div><span className="require">*</span> <span style={{color:"rgba(0, 0, 0, 0.85)"}} >{t("CompteSettings.Phone")}</span></div>}
                                               rules={[
                                                   ({getFieldValue}) => ({
                                                       validator(_, value) {
                                                           if (isValidPhone(value)) {
                                                               return Promise.resolve('value');
                                                           }
                                                           return Promise.reject(t("CompteSettings.InvalidPhone"));
                                                       },
                                                   }),
                                               ]}

                                    >
                                        <Input placeholder={t("CompteSettings.EnterPhone")} className={"spn2"} name="phone" onChange={signUpOnChange}>

                                            </Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                                    <Form.Item
                                        className={"form-item-style"}
                                        name="password"
                                        label={<div><span className="require">*</span> <span style={{color:"rgba(0, 0, 0, 0.85)"}} >{t("CompteSettings.Password")}</span></div>}
                                        rules={[
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (isValidPassword(valuesSignUp.signUp.password)) {
                                                        return Promise.resolve('value');
                                                    }
                                                    return Promise.reject(t("resetPassword.MinCharCapLetterMsg"));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            className={"spn2"}
                                            name="password" onChange={signUpOnChange}
                                            placeholder={t("CompteSettings.Password")}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                        />
                                    </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[0, 10]}>
                                <Col span={24}>
                                    <Form.Item name="address" className={"form-item-style"}
                                               label={"Adress"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="address" placeholder={t("CompteSettings.Address")}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="city" className={"form-item-style"}
                                               label={t("CompteSettings.Ville")}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="city" placeholder={t("CompteSettings.Ville")}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="postalCode" className={"form-item-style"}
                                               label={t("CompteSettings.ZipCode")}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="postalCode" placeholder={t("CompteSettings.ZipCode")}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[0, 10]}>
                                <Col span={24}>
                                    <Form.Item name="society" className={"form-item-style"}
                                               label={t("CompteSettings.Company")}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="society" placeholder={t("CompteSettings.Company")}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="numberPerson" className={"form-item-style"}
                                               label={t("CompteSettings.NumberOfEmployees")}
                                    >
                                            <Select
                                                className={"spn2"}
                                                name="numberPerson" onChange={signUpOnChangeSelect}
                                                defaultValue={t("CompteSettings.choiceOne")}
                                                showSearch
                                                style={{width: "100%"}}
                                                placeholder={t("CompteSettings.choiceOne")}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option name="numberPerson" key={1} value="1">{t("CompteSettings.choiceOne")}</Option>
                                                <Option name="numberPerson" key={2} value="2">{t("CompteSettings.choiceTwo")}</Option>
                                                <Option name="numberPerson" key={3} value="3">{t("CompteSettings.choiceThree")}</Option>
                                            </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row className={"row_politique"} gutter={[10, 0]}>
                                <Col offset={4} span={1}>
                                    <Form.Item name="confidentialityOptionGroup" className={"form-item-style"} valuePropName="checked"
                                               rules={[{required: true, message: ''}]}
                                    >
                                        <Checkbox.Group name="confidentialityOptionGroup">
                                        <Checkbox value="confidentialityOption"  name="confidentialityOption" onChange={SignUpOnChangeButton}></Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                                </Col>
                                <Col className={"col-politique"} style={{color: "RGB(185, 185, 185)"}} span={15}>
                                    <span
                                        className={"spn2"}>{t("CompteSettings.WebinarDataProcess")}</span>
                                    <a> {t("CompteSettings.PrivacyPolicy")} </a>
                                    <span className={"pol"}>{t("CompteSettings.ClickAgree")}</span><a className={"pol"}> {t("CompteSettings.Service condition,")} </a>
                                    <span className={"pol"}>{t("CompteSettings.la")}</span><a className={"pol"}> {t("CompteSettings.Politique de confidentialité")}" </a><span className={"pol"}>{t("CompteSettings.en")}</span><a className={"pol"}> {t("CompteSettings.l'Accord de traitement des donnèes")} </a>
                                    <span className={"pol"}>{t("CompteSettings.ConfirmOrder")}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={20}>
                            {child2}
                        </Col>
                    </Row>
                </Col>
            </Row>
    )
}
