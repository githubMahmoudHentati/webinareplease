import {useEffect} from 'react'
import React ,{Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox , Select,Form} from 'antd'
import '../signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {HooksSignUp} from "../utils/hooks";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {setSignUpConstraintDataOnchange} from "../store/signUpAction";
import {useDispatch} from "react-redux";
const { Option } = Select;

export const FormSignUp =({child1,child2})=>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
    };


    const {signUpOnChange,signUpOnChangeSelect,valuesSignUp,handleSubmitSignUp}= HooksSignUp()

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
    const requiredFieldRule = [{required: true, message: 'Champs requis'}];

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
                                               label={"Nom"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="firstName" placeholder={"Nom"}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="lastName" className={"form-item-style"}
                                               rules={requiredFieldRule}
                                               label={"Prenom"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
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
                                        <Input  className={"spn2"} onChange={signUpOnChange}
                                               name="email" placeholder={"E-mail"}></Input>
                                    </Form.Item>
                                </Col>
                                {valuesSignUp.constraintData.signUpError &&
                                <Col offset={4} span={20} className={"col_input"}>
                                    <span style={{color: "red"}}>Oups, Cette adresse e-mail est déjà utilisée par un autre utilisateur</span>
                                </Col>
                                }
                                <Col span={24}>
                                            <Form.Item name="phone" className={"form-item-style"}
                                                       label={"Téléphone "}
                                                       rules={requiredFieldRule}>
                                                <Input className={"spn2"} name="phone" onChange={signUpOnChange}
                                                       placeholder={"Numéro de téléphone"}>
                                                </Input>
                                            </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                                    <Form.Item
                                        className={"form-item-style"}
                                        name="password"
                                        label={"Mot de passe"}
                                        rules={[
                                            ({getFieldValue}) => ({
                                                validator(_, value) {
                                                    if (isValidPassword(valuesSignUp.signUp.password)) {
                                                        return Promise.resolve('value');
                                                    }
                                                    return Promise.reject('Minimum 8 caractéres avec au moins une majiscule, un chiffre et un caractère spéciale');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            className={"spn2"}
                                            name="password" onChange={signUpOnChange}
                                            placeholder="Mot de passe"
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
                                               name="address" placeholder={"adresse"}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="city" className={"form-item-style"}
                                               label={"Ville"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="city" placeholder={"Ville"}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="postalCode" className={"form-item-style"}
                                               label={"Code postal"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="postalCode" placeholder={"Code postal"}></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row gutter={[0, 10]}>
                                <Col span={24}>
                                    <Form.Item name="society" className={"form-item-style"}
                                               label={"Sociétté"}
                                    >
                                        <Input className={"spn2"} onChange={signUpOnChange}
                                               name="society" placeholder={"Société"}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="numberPerson" className={"form-item-style"}
                                               label={"Nombre d'employé"}
                                    >
                                            <Select
                                                className={"spn2"}
                                                name="numberPerson" onChange={signUpOnChangeSelect}
                                                showSearch
                                                style={{width: "100%"}}
                                                placeholder="Entre 5 - 10 employé(e)s"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option name="numberPerson" key={1} value="1">entre 5-10
                                                    employé(e)s</Option>
                                                <Option name="numberPerson" key={2} value="2">entre 10-20
                                                    employé(e)s</Option>
                                                <Option name="numberPerson" key={3} value="3">entre 20-30
                                                    employé(e)s</Option>
                                            </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row className={"row_politique"} gutter={[10, 0]}>
                                <Col offset={4} span={1}>
                                    <Checkbox></Checkbox>
                                </Col>
                                <Col className={"col-politique"} style={{color: "RGB(185, 185, 185)"}} span={15}>
                                    <span
                                        className={"spn2"}>Webinar please doit traiter vos donnèes conformément a la</span>
                                    <a> Politique de
                                        confidentialité. </a>
                                    <span className={"pol"}>En cliquant sur le bouton d'activation ci dessous j'accepte</span><a className={"pol"}> Condition
                                    de
                                    service, </a>
                                    <span className={"pol"}>la</span><a className={"pol"}> Politique de confidentialité </a><span className={"pol"}>en</span><a className={"pol"}> l'Accord de
                                    traitement des donnèes </a>
                                    <span className={"pol"}>et je confirme que je passe commande pour des services pour mon entreprise ou pour d'autre objectifs
                                professionnels</span>
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
