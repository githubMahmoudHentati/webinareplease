import React,{useState , useEffect} from 'react';
import { Steps, Button, message , Select , Radio } from 'antd';
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
    const [current, setCurrent] = useState(0);
    const [activeCard , SetActiveCard] = useState(0);
    const [checkedRadioButtonOne , SetCheckedRadioButtonOne] = useState(false)
    const [checkedRadioButtonTwo , SetCheckedRadioButtonTwo] = useState(false)
    const next = () => {
        setCurrent(current + 1);
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
          <Steps current={current}>
              {steps.map(item => (
                  <Step key={item.title} title={item.title} />
              ))}
          </Steps>
          <div className="steps-content">

              <div className="choix_Forfait">
                  <div className="header_Forfait">
                     Choisissez votre forfait
                  </div>{/*./header_Forfait*/}

                  <div className="card_Forfait">
                       <div id={activeCard===1?"activeCard":""} className="Card1_Forfait" onClick={()=>handleClickCardOne()}>
                           <Radio className="btn_Radio" checked={checkedRadioButtonOne}></Radio>
                           <h3 >Pro</h3>
                           <p >Idéal pour les équipes</p>
                           <h2 >99€</h2>
                               <li >Accueille jusqu’à 100 participants</li>
                               <li > Réunions en groupe illimitées</li>
                               <li >1 Go d’enregistrement sur le cloud</li>
                       </div>{/*./Card1_Forfai*/}
                      <div id={activeCard===2?"activeCard":""} className="Card2_Forfait" onClick={()=>handleClickCardTwo()}>
                          <Radio className="btn_Radio" checked={checkedRadioButtonTwo}></Radio>
                          <h3 >Pay As You Go</h3>
                          <p >Payer à votre utilisation</p>
                          <h2 >12€</h2>
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
              </div>{/*./choix_Forfait*/}

          </div>{/*./steps-content*/}
          <div className="steps-action">
              {current >= 0 && (
                  <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                      Annuler
                  </Button>
              )}
              {current < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                      Enregistrer et continuer
                  </Button>
              )}
              {current === steps.length - 1 && (
                  <Button type="primary" onClick={() => message.success('Processing complete!')}>
                      Enregistrer
                  </Button>
              )}

          </div>
      </div>
    );

}
export default ChoicePackage