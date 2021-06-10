import React ,{Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Checkbox , Select} from 'antd'
import '../signUp.scss'
import {UserOutlined,UnlockOutlined,EyeTwoTone,EyeInvisibleOutlined} from '@ant-design/icons';
const { Option } = Select;

export const FormSignUp =({child1,child2})=>{

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

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
                                        <Input placeholder={"Nom"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Prénom :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"Prénom"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>E-mail :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"E-mail"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Téléphone :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"Numéro de téléphone"}></Input>
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
                                        <Input placeholder={"Adresse"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Ville :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"Ville"}></Input>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"text-form"} span={5}>
                                        <span>Code postal :</span>
                                    </Col>
                                    <Col span={19}>
                                        <Input placeholder={"Code postal"}></Input>
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
                                        <Input placeholder={"Société"}></Input>
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
                                            showSearch
                                            style={{ width: "100%" }}
                                            placeholder="Entre 5 - 10 employé(e)s"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="5">5</Option>
                                            <Option value="10">10</Option>
                                            <Option value="20">20</Option>
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
