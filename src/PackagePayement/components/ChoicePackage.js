
import React,{useState , useEffect , useMemo} from 'react';
import { Steps, Button, message , Select , Radio  , Form, Input} from 'antd';
import {AppleFilled } from '@ant-design/icons';
import {FormSignUp} from "../../signUp/components/formSignUp";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {HooksSignUp} from "../../signUp/utils/hooks"
import {Hooks} from "../utils/hooks";
import {useDispatch} from "react-redux";
import {setPackagePayementAction} from "../store/PackagePayementAction";
import '../PackagePayement.scss'
import {setSignUpConstraintDataOnchange} from "../../signUp/store/signUpAction";
const { Step } = Steps;
const { Option } = Select;

const steps = [
    {
        title: 'Forfaits',
        content: 'First-content',
    },
    {
        title: 'Créer un compte',
        content: 'Second-content',
    },
    {
        title: 'Paiement',
        content: 'Last-content',
    },
];


function ChoicePackage(){
    const [form] = Form.useForm();

    const {handleClickCardOne , handleClickCardTwo , values , handlePackagePayementInput , handlePackagePayementSelect} = Hooks()
    const dispatch = useDispatch()

    const stripe = useStripe();
    const elements = useElements();

    const {valuesSignUp,handleSubmitSignUp} = HooksSignUp()

    console.log("valuesSignUp",valuesSignUp)

    // next step
    const nextToSignUp = () => {
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:"current",constraintDataValueChange:valuesSignUp.constraintData.current+1}))
        if(values.packagePayement.activeCard===1){
            // dispatch amount card
            dispatch(setPackagePayementAction({
                PackagePayementName: "packStripe",
                PackagePayementValue: values.packagePayement.packPro
            }));
        }else if(values.packagePayement.activeCard===2){
            // dispatch amount card
            dispatch(setPackagePayementAction({
                PackagePayementName: "packStripe",
                PackagePayementValue: values.packagePayement.packASYouGo
            }));
        }
    };
    // previous step
    const prev = () => {
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:"current",constraintDataValueChange:valuesSignUp.constraintData.current-1}))
    };

    const handlechange =(e)=>{
        console.log("handlechange",e)
    }

    return(
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            name="product-form"
            onFinish={handleSubmitSignUp}
        >
            <div className="ChoicePackage">
                <Steps current={valuesSignUp.constraintData.current} style={{height: "5%", display: "flex", alignItems: 'center'}}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="steps-content">
                    {steps[valuesSignUp.constraintData.current].content === 'First-content'
                        ?
                        <div className="choix_Forfait">
                            <div className="header_Forfait">
                                Choisissez votre forfait
                            </div>
                            {/*./header_Forfait*/}

                            <div className="card_Forfait">
                                <div id={values.packagePayement.activeCard === 1 ? "activeCard" : ""}
                                     className="Card1_Forfait" onClick={() => handleClickCardOne()}>
                                    <Radio className="btn_Radio"
                                           checked={values.packagePayement.checkedRadioButtonOne}></Radio>
                                    <h3>Pro</h3>
                                    <p>Idéal pour les équipes</p>
                                    <h2>{values.packagePayement.packPro}</h2>
                                    <li>Accueille jusqu’à 100 participants</li>
                                    <li> Réunions en groupe illimitées</li>
                                    <li>1 Go d’enregistrement sur le cloud</li>
                                </div>
                                {/*./Card1_Forfai*/}
                                <div id={values.packagePayement.activeCard === 2 ? "activeCard" : ""}
                                     className="Card2_Forfait" onClick={() => handleClickCardTwo()}>
                                    <Radio className="btn_Radio"
                                           checked={values.packagePayement.checkedRadioButtonTwo}></Radio>
                                    <h3>Pay As You Go</h3>
                                    <p>Payer à votre utilisation</p>
                                    <h2>{values.packagePayement.packASYouGo}</h2>
                                    <div>
                                        <h5>Durée de la réunion</h5>
                                        <Select defaultValue="1 Heure">
                                            <Option value="1 Heure">1 Heure</Option>
                                        </Select>
                                    </div>
                                    <div>
                                        <h5>Nombre de participants</h5>
                                        <Select defaultValue="20 Participants">
                                            <Option value="20 Participants">20 Participants</Option>
                                        </Select>
                                    </div>

                                </div>
                                {/*./Card2_Forfait*/}
                            </div>
                            {/*./card_Forfait*/}
                        </div>
                        :
                        steps[valuesSignUp.constraintData.current].content === 'Second-content'
                            ?
                            <div className="form_signup">
                                <div className="header_Forfait">
                                    Inscrivez-vous
                                </div>
                                {/*./header_Forfait*/}
                                <div>
                                        <FormSignUp/>
                                </div>
                            </div>
                            :
                            steps[valuesSignUp.constraintData.current].content === 'Last-content'
                                ?
                                <div className="PayementDiv">

                                    <div className="header_Forfait">
                                        Payez votre forfait
                                    </div>
                                    {/*./header_Forfait*/}

                                    <div className="champsPayement">

                                        <div className="div1_champsPayement">
                                            <div className="texte_div1_champsPayement">
                                                <span>Payer Webinar please Pro</span>
                                                <h3>{values.packagePayement.packStripe}</h3>
                                            </div>
                                            <div className="icon_div1_champsPayement"><span
                                                className="icon-logo-webinar"></span></div>
                                        </div>

                                        <div className="div2_champsPayement">
                                            <Button><AppleFilled/>Pay</Button>
                                            <div className={"divpayerparcarte"}>Ou payer par carte bancaire</div>
                                            <div className={"form_Input"}>

                                                <Form>


                                                    <Form.Item
                                                        className={"formItem"}
                                                        label="Email"
                                                        name="email"
                                                        rules={[{required: true, message: 'Please input your email!'}]}
                                                    >
                                                        <Input name="email" className={"input"}
                                                               onChange={handlePackagePayementInput}/>
                                                    </Form.Item>


                                                    <Form.Item
                                                        className={"formItem"}
                                                        label="Card details"
                                                        name="carddetails"
                                                        rules={[{required: true, message: 'Please input your adress!'}]}
                                                    >
                                                        <CardElement name="carddetails" className={"input"}
                                                                     onChange={handlechange}/>
                                                    </Form.Item>

                                                    <Form.Item
                                                        className={"formItem"}
                                                        label="Nom du titulaire de la carte"
                                                        name="nom"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Please input your username!'
                                                        }]}
                                                    >
                                                        <Input name="nom" className={"input"}
                                                               onChange={handlePackagePayementInput}/>
                                                    </Form.Item>

                                                    <Form.Item
                                                        className={"formItem"}
                                                        label="Nom du titulaire de la carte"
                                                        name="pays"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Please input your username!'
                                                        }]}
                                                    >
                                                        <Select defaultValue="France" name="pays"
                                                                onChange={handlePackagePayementSelect}>
                                                            <Option name="pays" value="France">France</Option>
                                                            <Option name="pays" value="Tunis">Tunis</Option>
                                                            <Option name="pays" value="Suisse">Suisse</Option>
                                                        </Select>
                                                    </Form.Item>

                                                    <Form.Item
                                                        className={"formItem"}
                                                        name="postalCode"
                                                        rules={[{
                                                            required: true,
                                                            message: 'Please input your username!'
                                                        }]}
                                                    >
                                                        <Input name="postalCode" placeholder={"Code postal"}
                                                               className={"input"}
                                                               onChange={handlePackagePayementInput}/>
                                                    </Form.Item>

                                                </Form>

                                            </div>
                                        </div>

                                    </div>

                                </div>
                                :
                                null

                    }


                </div>
                {/*./steps-content*/}
                <div className="steps-action">
                    {valuesSignUp.constraintData.current === 0 && (
                        <Button style={{margin: '0 8px'}}>
                            Annuler
                        </Button>
                    )}
                    {valuesSignUp.constraintData.current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Retour
                        </Button>
                    )}
                    {valuesSignUp.constraintData.current === 1 && (
                        <Button   loading={valuesSignUp.constraintData.loadingSignUp} type="primary" htmlType="submit">Inscrivez-vous maintenant</Button>
                    )}
                    {valuesSignUp.constraintData.current ===0 && (
                        <Button
                            type="primary" onClick={nextToSignUp}
                                disabled={values.packagePayement.activeCard === 0}>
                            Enregistrer et continuer
                        </Button>
                    )}
                    {valuesSignUp.constraintData.current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Payer
                        </Button>
                    )}

                </div>
            </div>
        </Form>
    );

}
export default ChoicePackage