
import React from 'react';
import { Steps, Button, message , Select , Radio  , Form, Input} from 'antd';
import {AppleFilled } from '@ant-design/icons';
import {FormSignUp} from "../../signUp/components/formSignUp";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {HooksSignUp} from "../../signUp/utils/hooks"
import {Hooks} from "../utils/hooks";
import {useDispatch} from "react-redux";
import {setPackagePayementAction} from "../store/PackagePayementAction";
import '../PackagePayement.scss'
import {setSignUpConstraintDataOnchange, setSignUpOnchange} from "../../signUp/store/signUpAction";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';
const { Step } = Steps;
const { Option } = Select;


function ChoicePackage(){
    const { t} = useTranslation();
    const steps = [
        {
            title: t("PackagePayment.Packages"),
            content: 'First-content',
        },
        {
            title: t("PackagePayment.CNewAccout"),
            content: 'Second-content',
        },
        {
            title: t("PackagePayment.Payment"),
            content: 'Last-content',
        },
    ];
    const [form] = Form.useForm();
    const history = useHistory();
    const { handleClickCardZero, handleClickCardOne , handleClickCardTwo , values , handlePackagePayementInput , handlePackagePayementSelect} = Hooks()
    const dispatch = useDispatch()
    const stripe = useStripe(); // Stripe Hooks
    const elements = useElements(); // Stripe Hooks
    const {valuesSignUp,handleSubmitSignUp} = HooksSignUp()
    const clientSecret = valuesSignUp.constSubscription.clientSecret;
    // next step
    const nextToSignUp = () => {
        dispatch(setSignUpOnchange({
            SignUpNameChange: "subscriptionId",
            SignUpValueChange: values.packagePayement.activeCard-1
        }));
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
        valuesSignUp.constraintData.current===1&&dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "signUpError",
            constraintDataValueChange: false
        }))
    };
    // handle Payement
    const handlePayer = async () =>{

        // Create payement intent on the server
        // Confirm the payement on the client
        if (!stripe || !elements){
            return;
        }
        if ( values.packagePayement.activeCard===2){
            setTimeout(()=>{
                stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method:{
                            card:elements.getElement(CardElement)
                        }
                    }
                )

                message.success(t("PackagePayment.CNewAccout"))
            },2500)
        }else if(values.packagePayement.activeCard===3){
            setTimeout(()=>{
                stripe.confirmCardPayment(
                    clientSecret, {
                        payment_method:{
                            card:elements.getElement(CardElement),
                            billing_details: {
                                name: values.packagePayementInput.email,
                            },
                        }
                    }
                )

                message.success(t("PackagePayment.CNewAccout"))
            },2500)
        }


    }

    return(
        <Form
            form={form}
            labelCol={{ span:4}}
            wrapperCol={{ span: 16 }}
            layout="horizontal"
            name="product-form"
            className={"product-form-payment"}
            onFinish={handleSubmitSignUp}
        >
            <div className = {steps[valuesSignUp.constraintData.current].content === 'Second-content' ? "ChoicePackage-form" : "ChoicePackage"}>
                <Steps className={"steps-choice"} current={valuesSignUp.constraintData.current} style={{height: "5%", display: "flex", alignItems: 'center'}}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title}/>
                    ))}
                </Steps>
                <div className="steps-content">
                    {steps[valuesSignUp.constraintData.current].content === 'First-content'
                        ?
                        <div className="choix_Forfait">
                            <div className="header_Forfait">
                                {t("PackagePayment.ChoosePackage")}
                            </div>
                            {/*./header_Forfait*/}

                            <div className="card_Forfait">
                                <div id={values.packagePayement.activeCard===1?"activeCard":""} className="Card0_Forfait" onClick={()=>handleClickCardZero()}>
                                    <div>
                                        <Radio className="btn_Radio" checked={values.packagePayement.checkedRadioButtonZero}></Radio>
                                        <h3 >{t("PackagePayment.Basic")}</h3>
                                        <p >{t("PackagePayment.IdealForTeams")}</p>
                                    </div>
                                    <div>
                                        <h2 >{values.packagePayement.packFree}</h2>
                                        <li >{t("PackagePayment.AccommodatesUpFive")}</li>
                                        <li >{t("PackagePayment.Meetings")}</li>
                                        <li >{t("PackagePayment.OneOneMeet")}</li>
                                    </div>
                                </div>{/*./Card1_Forfai*/}

                                <div id={values.packagePayement.activeCard===2?"activeCard":""} className="Card1_Forfait" onClick={()=>handleClickCardOne()}>
                                    <div>
                                        <Radio className="btn_Radio" checked={values.packagePayement.checkedRadioButtonOne}></Radio>
                                        <h3 >Pro</h3>
                                        <p >{t("PackagePayment.IdealForTeams")}</p>
                                    </div>
                                    <div>
                                        <h2 >{values.packagePayement.packPro}€</h2>
                                        <li >{t("PackagePayment.Accommodates100")}</li>
                                        <li > {t("PackagePayment.UnlimitedGroupMeetings")}</li>
                                        <li >{t("PackagePayment.CapacityOnCloud")}</li>
                                    </div>
                                </div>{/*./Card1_Forfai*/}

                                {/*./Card1_Forfai*/}
                                <div id={values.packagePayement.activeCard===3?"activeCard":""} className="Card2_Forfait" onClick={()=>handleClickCardTwo()}>
                                    <div className={"Card2_Forfait_div1"}>
                                        <Radio className="btn_Radio" checked={values.packagePayement.checkedRadioButtonTwo}></Radio>
                                        <h3 >Pay As You Go</h3>
                                        <p >{t("PackagePayment.PayUse")}</p>
                                    </div>
                                    <div className={"Card2_Forfait_div2"}>
                                        <h2 >{values.packagePayement.packASYouGo}€</h2>
                                        <div>
                                            <h5 >{t("PackagePayment.MeetingDuration")}</h5>
                                            <Select defaultValue="1 Heure" >
                                                <Option value="1 Heure">1 {t("PackagePayment.Hour")}</Option>
                                            </Select>
                                        </div>
                                        <div>
                                            <h5 >{t("PackagePayment.PartiNumber")}</h5>
                                            <Select defaultValue="20 Participants" >
                                                <Option value="20 Participants">20 {t("formDirectVideo.Participants")}</Option>
                                            </Select>
                                        </div>
                                    </div>

                                </div>{/*./Card2_Forfait*/}
                            </div>
                            {/*./card_Forfait*/}
                        </div>
                        :
                        steps[valuesSignUp.constraintData.current].content === 'Second-content'
                            ?
                            <div className="form_signup">
                                <div className="header_Forfait">
                                    {t("FormConnexion.SignUp")}
                                </div>
                                {/*./header_Forfait*/}
                                <div className={"divsignup"}>
                                        <FormSignUp/>
                                </div>
                            </div>
                            :
                            steps[valuesSignUp.constraintData.current].content === 'Last-content'
                                ?
                                <div className="PayementDiv">

                                    <div className="header_Forfait">
                                        {t("PackagePayment.PayPackage")}
                                    </div>
                                    {/*./header_Forfait*/}

                                    <div className="champsPayement">

                                        <div className="div1_champsPayement">
                                            <div className="texte_div1_champsPayement">
                                                <span>{t("PackagePayment.PayWebinarPleasePro")}</span>
                                                <h3>{values.packagePayement.packStripe}</h3>
                                            </div>
                                            <div className="icon_div1_champsPayement"><span
                                                className="icon-logo-webinar"></span></div>
                                        </div>

                                        <div className="div2_champsPayement">
                                            <Button><AppleFilled/>{t("PackagePayment.Payer")}</Button>
                                            <div className={"divpayerparcarte"}>{t("PackagePayment.CreditCardPay")}</div>
                                            <div className={"form_Input"}>
                                                <Form>
                                                    <Form.Item
                                                        className={"formItem"}
                                                        label="Email"
                                                        name="email"
                                                        rules={[{required: true, message: t("PackagePayment.InputMail")}]}
                                                    >
                                                        <Input name="email" className={"input"}
                                                               onChange={handlePackagePayementInput}/>
                                                    </Form.Item>


                                                    <Form.Item
                                                        className={"formItem"}
                                                        label={t("PackagePayment.CardDetails")}
                                                        name="carddetails"
                                                        rules={[{required: true, message: t("PackagePayment.InputAddress")}]}
                                                    >
                                                        <CardElement
                                                            id={"card-element"} name="carddetails" className={"input"}
                                                            onChange={handlechange}
                                                            options={{
                                                                hidePostalCode:true
                                                            }}
                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        className={"formItem"}
                                                        label={t("PackagePayment.CardOwnerName")}
                                                        name="nom"
                                                        rules={[{
                                                            required: true,
                                                            message: t("PackagePayment.InputUserName")
                                                        }]}
                                                    >
                                                        <Input name="nom" className={"input"}
                                                               onChange={handlePackagePayementInput}/>
                                                    </Form.Item>

                                                    <Form.Item
                                                        className={"formItem"}
                                                        label={t("PackagePayment.pays")}
                                                        name="pays"
                                                        rules={[{
                                                            required: true,
                                                            message: t("PackagePayment.InputCountry")
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
                                                            message: t("PackagePayment.InputZipCode")
                                                        }]}
                                                    >
                                                        <Input name="postalCode" placeholder={t("CompteSettings.ZipCode")}
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

                    <div className = {steps[valuesSignUp.constraintData.current].content === 'Second-content' ? "steps-action-form" : "steps-action"}>
                        {valuesSignUp.constraintData.current === 0 && (
                            <Button onClick={()=>{history.push("/")}} style={{margin: '0 8px'}}>
                                {t("CompteSettings.Cancel")}
                            </Button>
                        )}
                        {valuesSignUp.constraintData.current > 0 && (
                            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                                {t("PackagePayment.Back")}
                            </Button>
                        )}
                        {valuesSignUp.constraintData.current === 1 && (
                            <Button  onClick={()=>{
                                !valuesSignUp.constraintData.confidentialityOption?document.documentElement.style.setProperty('--box-signup', "red"):
                                    document.documentElement.style.setProperty('--box-signup', "#d9d9d9")
                            }} loading={valuesSignUp.constraintData.loadingSignUp} type="primary" htmlType="submit">{t("PackagePayment.RegisterNow")}</Button>
                        )}
                        {valuesSignUp.constraintData.current ===0 && (
                            <Button
                                type="primary" onClick={nextToSignUp}
                                disabled={values.packagePayement.activeCard === 0}>
                                {t("PackagePayment.SaveAndContinue")}
                            </Button>
                        )}
                        {valuesSignUp.constraintData.current === steps.length - 1 && (
                            <Button type="primary" onClick={() =>handlePayer()}>
                                {t("PackagePayment.Payer")}
                            </Button>
                        )}

                    </div>
                </div>

                {/*./steps-content*/}

            </div>
        </Form>
    );

}
export default ChoicePackage