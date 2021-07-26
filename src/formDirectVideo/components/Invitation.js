import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu , Select , Divider , Tag , Tooltip , Popover , Checkbox , Form , message} from 'antd'
import {  InfoCircleFilled , PlusOutlined , MinusCircleOutlined , ExportOutlined , DiffOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import EditableTagGroup from "./EditableTagGroup";
import '../formDirectVideo.scss'
import {useSelector} from "react-redux";
import {setConfigurationOnchange} from "../store/formDirectVideoAction";
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

const { Option } = Select;
let index = 0;




function Invitation(){
    const [name , SetName] = useState('')
    const { t, i18n } = useTranslation();
    const [items , SetItems] = useState([t("formDirectVideo.Groupe 01") , t("formDirectVideo.Groupe 02") , t("formDirectVideo.Groupe 03") , t("formDirectVideo.Groupe 04")])
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

        if(name===""){
            message.error(t("formDirectVideo.veuillez remplir le champ pour ajouter un groupe"));
        }else{
            SetItems([...items, name ])
            SetName('')
        }

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
                    callback(t("formDirectVideo.Veuillez entrer une adresse email valide"));
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
            <div className={"title_invitation"}><h3 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Envoi des invitations")}</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Groupe d'emails")}   <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
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
                        placeholder={t("formDirectVideo.Choisir un groupe")}
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
                                        <PlusOutlined/> {t("formDirectVideo.Ajouter")}
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
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Régles d'envoi")} </span>
                <div className={"div_Email_accée"}>
                     <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Emails d'inscription et d'accès")}</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.visibleInscription === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Inscription")}</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Dès la programmation du webinar")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"color: rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelJ7 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Rappel J-7")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>{t("formDirectVideo.7 jours avant le début")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelJ1 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Rappel J-1")}</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.1 jours avant le début")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.visibleRappelH1 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Rappel H-1")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>{t("formDirectVideo.1 Heure avant le début")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        <Tooltip placement="bottom" title={t("formDirectVideo.Ajouter une règle")}>
                        <Popover

                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox value="visibleInscription"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Invitation pour inscription")}</Checkbox>
                                    <Checkbox value="visibleRappelJ7"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel J-7")}</Checkbox>
                                    <Checkbox value="visibleRappelJ1"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel J-1")}</Checkbox>
                                    <Checkbox value="visibleRappelH1"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel H-1")}</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Ajouter une règle")}</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list1*/}


                <div className={"div_Email_accée list2"}>
                    <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Emails pour les inscrits")}</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.visibleInscription2 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Confirmation d'inscription")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>{t("formDirectVideo.Juste après l'inscription")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        {
                            values.invitation.addRules.visibleRappelJ72 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.A participé")}</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Juste après la fin")}</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.visibleRappelJ12 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Non venu")}</span></div>
                                    <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>{t("formDirectVideo.Juste après la fin")}</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.visibleRappelH12 === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Non venu")}</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Juste après la fin")}</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }


                        <Tooltip placement="bottom" title={t("formDirectVideo.Ajouter une règle")}>
                        <Popover
                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox value = "visibleInscription2" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Invitation pour inscription")}</Checkbox>
                                    <Checkbox value = "visibleRappelJ72" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel J-7")}</Checkbox>
                                    <Checkbox value = "visibleRappelJ12" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel J-1")}</Checkbox>
                                    <Checkbox value = "visibleRappelH12" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Rappel H-1")}</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visbleRegle}
                            onVisibleChange={handleVisibleChangeRegle}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Ajouter une règle")}</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list2*/}



            </div>{/*./groupEmail*/}


        </div>
    )
}
export default Invitation