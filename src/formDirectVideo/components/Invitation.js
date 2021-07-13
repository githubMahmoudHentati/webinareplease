import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu , Select , Divider , Tag , Tooltip , Popover , Checkbox , Form} from 'antd'
import {  InfoCircleFilled , PlusOutlined , MinusCircleOutlined , ExportOutlined , DiffOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import '../formDirectVideo.scss'
import {useSelector} from "react-redux";
import {setConfigurationOnchange} from "../store/formDirectVideoAction";
import {Hooks} from "../utils/hooks";
const { Option } = Select;
let index = 0;




function Invitation(){
    const [name , SetName] = useState('')
    const [items , SetItems] = useState(['Groupe 01' , 'Groupe 02' , 'Groupe 03' , 'Groupe 04'])
    const [visible , SetVisible] = useState(false)
    const [visbleRegle , SetVisibleRegle] = useState(false);

    const [emails , SetEmails] = useState(false);

    const {values,InvitationOnChangeChecked,invitationOnChangeSelect}=Hooks()
    console.log("invitation",values)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)


    // take value of option select
    const onNameChange = event => {
        SetName(event.target.value)
    };
    // ajouter option dans le select
    const addItem = () => {

            SetItems([...items, name ])
            SetName('')
    };

     // handle visible popover one
   const handleVisibleChange = visible => {
        SetVisible(visible)
    };
    // handle visible popover two
    const handleVisibleChangeRegle = visible => {
        SetVisibleRegle(visible)
    };

    // Validation des emails
    const checkEmail = (rule, value, callback) => {
        let isValid = []
        if (value.length) {
            value.map(ele => {
                console.log("isValidEmail(ele)",isValidEmail(ele))
                isValidEmail(ele) === false &&
                    callback('Veuillez entrer une adresse email valide');
            })
        }
    }
    const selectProps = {
        mode:"tags",
        placeholder: "someone@example.com",
        dropdownClassName:`custom-dropdown`,
        className:`custom-select`
    };
    const isValidEmail = function(mail){
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+((?:\.[a-zA-Z0-9-]+)(?:\.[a-zA-Z0-9-]+)*)+(?:[a-zA-Z0-9-]+)*$/.test(mail)
    }
    const handleChangeEmailsInvitation = (value) =>{
        SetEmails(value);
    }
    // Validation des emails



    return(
        <div className={"Invitation"}>
            <div className={"title_invitation"}><h3 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Envoi des invitations</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Groupe d'emails   <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                <Form.Item name="emailsGroup" className={"form-item-style"}
                >
                    <Select
                        name="emailsGroup"
                        onChange={(value, event) => {
                            invitationOnChangeSelect(value, event, "emailsGroup")
                        }}
                        showArrow
                        className={"selectGroupGmail"}
                        mode="multiple"
                        style={{width: 240}}
                        placeholder="Choisir un groupe"
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{margin: '4px 0'}}/>
                                <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                                    <Input style={{flex: 'auto'}} value={name} onChange={onNameChange}/>
                                    <a
                                        style={{flex: 'none', padding: '8px', display: 'block', cursor: 'pointer'}}
                                        onClick={addItem}
                                    >
                                        <PlusOutlined/> Ajouter
                                    </a>
                                </div>
                            </div>
                        )}
                    >
                        {items.map(item => (
                            <Option key={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div2"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>E-mails   <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                       <Form.Item
                           style={{width:"100%"}}
                           name="emails"
                           rules={[
                               {validator: checkEmail} ,
                               {
                                   required: true,
                                   message: 'Ce champ est requis!',
                               },]}
                       >
                           <Select value={[]} name="emails" onChange={(value,event)=>invitationOnChangeSelect(value, event, "emails")} {...selectProps} />
                       </Form.Item>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div3"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Régles d'envoi </span>
                <div className={"div_Email_accée"}>
                     <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Emails d'inscription et d'accès</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.visibleInscription === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Inscription</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Dès la programmation du webinar</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"color: rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelJ7 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Rappel J-7</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>7 jours avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelJ1 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Rappel J-1</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>1 jour avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelH1 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Rappel H-1</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>1 jour avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        <Tooltip placement="bottom" title={" Ajouter une règle"}>
                        <Popover

                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox value="visibleInscription"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>Invitation pour inscription</Checkbox>
                                    <Checkbox value="visibleRappelJ7"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel J-7</Checkbox>
                                    <Checkbox value="visibleRappelJ1"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel J-1</Checkbox>
                                    <Checkbox value="visibleRappelH1"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel H-1</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Ajouter une règle</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list1*/}


                <div className={"div_Email_accée list2"}>
                    <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Emails pour les inscrits</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.visibleInscription2 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Confirmation d'inscription</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>Juste après l'inscription</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        {
                            values.invitation.addRules.visibleRappelJ72 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>A participé</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.visibleRappelJ12 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Non venu</span></div>
                                    <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.visibleRappelH12 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Non venu</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }


                        <Tooltip placement="bottom" title={" Ajouter une règle"}>
                        <Popover
                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox value = "visibleInscription2" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>Invitation pour inscription</Checkbox>
                                    <Checkbox value = "visibleRappelJ72" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel J-7</Checkbox>
                                    <Checkbox value = "visibleRappelJ12" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel J-1</Checkbox>
                                    <Checkbox value = "visibleRappelH12" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>Rappel H-1</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visbleRegle}
                            onVisibleChange={handleVisibleChangeRegle}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Ajouter une règle</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list2*/}



            </div>{/*./groupEmail*/}


        </div>
    )
}
export default Invitation