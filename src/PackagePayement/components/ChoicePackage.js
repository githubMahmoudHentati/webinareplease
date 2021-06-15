
import React,{useState , useEffect , useMemo} from 'react';
import { Steps, Button, message , Select , Radio  , Form, Input} from 'antd';
import {AppleFilled } from '@ant-design/icons';
import {FormSignUp} from "../../signUp/components/formSignUp";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

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

    const stripe = useStripe();
    const elements = useElements();

    const [current, setCurrent] = useState(0);
    const [activeCard , SetActiveCard] = useState(0);
    const [checkedRadioButtonOne , SetCheckedRadioButtonOne] = useState(false)
    const [checkedRadioButtonTwo , SetCheckedRadioButtonTwo] = useState(false)
    const [packPro , SetPackPro] = useState('99€');
    const [packASYouGo , SetPackASYouGo] = useState('12€')
    const [packStripe , SetPackStripe] = useState('')


    const next = () => {
        setCurrent(current + 1);

        if(activeCard===1){
            SetPackStripe(packPro)
        }else if(activeCard===2){
            SetPackStripe(packASYouGo)
        }

    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const handleClickCardOne = () =>{
        SetActiveCard(1);
        SetCheckedRadioButtonOne(true)
        SetCheckedRadioButtonTwo(false)
    }
    const handleClickCardTwo = () =>{
        SetActiveCard(2)
        SetCheckedRadioButtonOne(false)
        SetCheckedRadioButtonTwo(true)
    }
    const onChange =(e)=>{
        console.log('radio checked', e);
    }

    return(
      <div className="ChoicePackage">
          <Steps current={current} style={{ height:"5%" , display:"flex", alignItems:'center' }}>
              {steps.map(item => (
                  <Step key={item.title} title={item.title} />
              ))}
          </Steps>
          <div className="steps-content">
              {steps[current].content === 'First-content'
                  ?
                  <div className="choix_Forfait">
                      <div className="header_Forfait">
                          Choisissez votre forfait
                      </div>{/*./header_Forfait*/}

                      <div className="card_Forfait">
                          <div id={activeCard===1?"activeCard":""} className="Card1_Forfait" onClick={()=>handleClickCardOne()}>
                              <Radio className="btn_Radio" checked={checkedRadioButtonOne}></Radio>
                              <h3 >Pro</h3>
                              <p >Idéal pour les équipes</p>
                              <h2 >{packPro}</h2>
                              <li >Accueille jusqu’à 100 participants</li>
                              <li > Réunions en groupe illimitées</li>
                              <li >1 Go d’enregistrement sur le cloud</li>
                          </div>{/*./Card1_Forfai*/}
                          <div id={activeCard===2?"activeCard":""} className="Card2_Forfait" onClick={()=>handleClickCardTwo()}>
                              <Radio className="btn_Radio" checked={checkedRadioButtonTwo}></Radio>
                              <h3 >Pay As You Go</h3>
                              <p >Payer à votre utilisation</p>
                              <h2 >{packASYouGo}</h2>
                              <div>
                                  <h5 >Durée de la réunion</h5>
                                  <Select defaultValue="1 Heure" >
                                      <Option value="1 Heure">1 Heure</Option>
                                  </Select>
                              </div>
                              <div>
                                  <h5 >Nombre de participants</h5>
                                  <Select defaultValue="20 Participants" >
                                      <Option value="20 Participants">20 Participants</Option>
                                  </Select>
                              </div>

                          </div>{/*./Card2_Forfait*/}
                      </div>{/*./card_Forfait*/}
                  </div>
                  :
                  steps[current].content === 'Second-content'
                      ?
                      <div className="form_signup">
                          <div className="header_Forfait">
                              Inscrivez-vous
                          </div>{/*./header_Forfait*/}
                          <div className={"form"}><FormSignUp className={"vh"}/></div>
                      </div>
                      :
                      steps[current].content === 'Last-content'
                          ?
                          <div className="PayementDiv">

                              <div className="header_Forfait">
                                  Payez votre forfait
                              </div>{/*./header_Forfait*/}

                              <div className="champsPayement">

                                  <div className="div1_champsPayement">
                                      <div className="texte_div1_champsPayement">
                                      <span>Payer Webinar please Pro</span>
                                      <h3>{packStripe}</h3>
                                      </div>
                                      <div className="icon_div1_champsPayement"><span className="icon-logo-webinar"></span></div>
                                  </div>

                                  <div className="div2_champsPayement">
                                      <Button><AppleFilled />Pay</Button>
                                      <div className={"divpayerparcarte"}>Ou payer par carte bancaire</div>
                                      <div className={"form_Input"}>

                                          <Form>


                                              <Form.Item
                                                  className={"formItem"}
                                                  label="Email"
                                                  name="email"
                                                  rules={[{ required: true, message: 'Please input your email!' }]}
                                              >
                                                  <Input  className={"input"}/>
                                              </Form.Item>


                                              <Form.Item
                                                  className={"formItem"}
                                                  label="Card details"
                                                  name="carddetails"
                                                  rules={[{ required: true, message: 'Please input your adress!' }]}
                                              >
                                                 <CardElement  className={"input"}/>
                                              </Form.Item>

                                              <Form.Item
                                                  className={"formItem"}
                                                  label="Nom du titulaire de la carte"
                                                  name="nom"
                                                  rules={[{ required: true, message: 'Please input your username!' }]}
                                              >
                                                  <Input  className={"input"}/>
                                              </Form.Item>

                                              <Form.Item
                                                  className={"formItem"}
                                                  label="Nom du titulaire de la carte"
                                                  name="nom"
                                                  rules={[{ required: true, message: 'Please input your username!' }]}
                                              >
                                                  <Select defaultValue="France" >
                                                      <Option value="France">France</Option>
                                                  </Select>
                                                  <Input placeholder={"Code postal"}  className={"input"}/>
                                              </Form.Item>

                                          </Form>

                                      </div>
                                  </div>

                              </div>

                          </div>
                          :
                          null

              }


          </div>{/*./steps-content*/}
          <div className="steps-action">
              {current === 0 && (
                  <Button style={{ margin: '0 8px' }} >
                      Annuler
                  </Button>
              )}
              {current > 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Retour
                  </Button>
              )}
              {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()} disabled={activeCard===0}>
                      Enregistrer et continuer
                  </Button>
              )}
              {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                      Payer
                  </Button>
              )}

          </div>
      </div>
    );

}
export default ChoicePackage