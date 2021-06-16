import React ,{Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox , Select} from 'antd'
import '../signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";
const { Option } = Select;

export const FormSignUp =({child1,child2})=>{

    const {signUpOnChange,signUpOnChangeSelect,values}= Hooks()
    console.log("signUp",values)
    return(
        <Row gutter={[0, 40]} className={'col-signUp'}>

            <Col style={{textAlign: 'center', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}} span={24}>
                {child1}
            </Col>
            <Col span={24}>
                <Row gutter={[0, 30]}>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Nom :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="name" onChange={signUpOnChange} name="name"  placeholder={"Nom"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Prénom :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="lastName" onChange={signUpOnChange} placeholder={"Prénom"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>E-mail :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="email" onChange={signUpOnChange} placeholder={"E-mail"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Téléphone :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="phone" onChange={signUpOnChange} placeholder={"Numéro de téléphone"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"text-form"} span={5}>
                                <span>Mot de passe :</span>
                            </Col>
                            <Col span={19}>
                                <Input.Password
                                    name="password" onChange={signUpOnChange}
                                    placeholder="input password"
                                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Adresse :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="address" onChange={signUpOnChange} placeholder={"Adresse"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Ville :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="city" onChange={signUpOnChange} placeholder={"Ville"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Code postal :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="zipCode" onChange={signUpOnChange} placeholder={"Code postal"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Société :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input name="society" onChange={signUpOnChange} placeholder={"Société"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Nombre d'employé :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Select
                                            name="employeeNumberID" onChange={signUpOnChangeSelect}
                                            showSearch
                                            style={{ width: "100%" }}
                                            placeholder="Entre 5 - 10 employé(e)s"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option name="employeeNumberID" key ={1} value="1">entre 5-10 employé(e)s</Option>
                                            <Option name="employeeNumberID" key ={2} value="2">entre 10-20 employé(e)s</Option>
                                            <Option name="employeeNumberID"  key ={3}  value="3">entre 20-30 employé(e)s</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col offset={5} span={1}>
                                <Checkbox></Checkbox>
                            </Col>
                            <Col style={{color: "RGB(185, 185, 185)"}} span={18}>
                                <span>Webinar please doit traiter vos donnèes conformément a la</span> <a> Politique de
                                confidentialité. </a>
                                <span>En cliquant sur le bouton d'activation ci dessous j'accepte</span><a> Condition de
                                service, </a>
                                <span>la</span><a> Politique de confidentialité </a><span>en</span><a> l'Accord de
                                traitement des donnèes </a>
                                <span>et je confirme que je passe commande pour des services pour mon entreprise ou pour d'autre objectifs
                                professionnels</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        {child2}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
