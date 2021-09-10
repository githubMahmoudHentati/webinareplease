import React from 'react';
import {Row, Col, Input, Button, Form} from 'antd'
import '../compteSettings.scss'
import { EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {setAccountSetting} from "../../utils/redux/actions";
import {useDispatch , useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import { useTranslation } from 'react-i18next';

export const PasswordEdit =()=>{
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t} = useTranslation();


    const {UpdatePassword}=GraphQLFetchData(form)

    function SecurityAccountUpdatePassword(){
        UpdatePassword()
    }

    const { securityAccountPassword , handleSaveNewPassword , values}=Hooks(SecurityAccountUpdatePassword)

    const isValidPassword = (password) => {

        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(password)
    }
    const requiredFieldRule = [{required: true, message: t("contactClient.FieldsRequired")}];

    return(
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 24 }}
            layout="horizontal"
            name="product-form"
            onFinish={handleSaveNewPassword}
        >
        <Row  gutter={[0, 30]}>
            <Col span={24}>
                <span className={"spn1_securité"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.SecurityAndAccess")}</span>
            </Col>
            <Col span={24}>
                <Row  gutter={[0, 20]}>
                    <Col span={24}>
                        <span className={"spn2_motDePasse"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" }}>{t("CompteSettings.EditPass")}</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.Ancien mot de passe")} :</span>
                            </Col>
                            <Col xs={{span: 22}} sm={{span: 22}} md={{span: 20}} lg={{span: 10}}>
                                <Form.Item name="oldPassWord" className={"form-item-style"}
                                           rules={requiredFieldRule}
                                >
                                <Input.Password
                                    className={"spn2_motDePasse"}
                                    value={values.securityAccount.oldPassWord}
                                    name="oldPassWord"
                                    onChange={securityAccountPassword}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={t("CompteSettings.Ancien mot de passe")}>
                                </Input.Password>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <span className={"mdp"} style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("CompteSettings.NewPassword")} :</span>
                            </Col>
                            <Col xs={{span: 22}} sm={{span: 22}} md={{span: 20}} lg={{span: 10}}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="newPassWord"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isValidPassword(values.securityAccount.newPassWord)) {
                                                    return Promise.resolve(t("formDirectVideo.value"));
                                                }
                                                return Promise.reject(t("resetPassword.MinCharCapLetterMsg"));
                                            },
                                        }),
                                    ]}
                                >
                                <Input.Password
                                    className={"spn2_motDePasse"}
                                    value={values.securityAccount.newPassWord}
                                    name="newPassWord"
                                    onChange={securityAccountPassword}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    placeholder={t("CompteSettings.Nouveau mot de passe")}>
                                </Input.Password>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{span: 22}} sm={{span: 22}} md={{span: 20}} lg={{span: 10}}>
                        <Row gutter={[10, 0]} justify={"end"}>
                            <Col>
                                <Button className={"spn2_motDePasse"} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} onClick={()=>dispatch(setAccountSetting(1))} >{t("CompteSettings.Cancel")}</Button>
                            </Col>
                            <Col>
                                <Button className={"spn2_motDePasse"}  type={"primary"} htmlType="submit" loading={values.loadingUpdatePassword.loadingUpdatePassword}>{t("CompteSettings.Save")}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Form>
    )
}