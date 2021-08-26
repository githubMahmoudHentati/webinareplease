import React, {useState, useEffect} from 'react';
import {Input,Button,Select , Divider  , Tooltip , Popover , Checkbox , Form , message} from 'antd'
import {  InfoCircleFilled , PlusOutlined , MinusCircleOutlined , ExportOutlined , DiffOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import '../formDirectVideo.scss'
import {useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import { useTranslation } from 'react-i18next';

import moment from "moment";
import 'moment-timezone';
import {GraphQLFetchDataForm} from "../utils/graphQLFetchDataForm";






function Invitation(){
    const { Option } = Select;
    const [name , SetName] = useState('')
    const { t} = useTranslation();
    const [items , SetItems] = useState([t("formDirectVideo.Group01") , t("formDirectVideo.Group02") , t("formDirectVideo.Group03") , t("formDirectVideo.Group04")])
    const [visible , SetVisible] = useState(false)
    const [visbleRegle , SetVisibleRegle] = useState(false);
    const [hoursDiffCalls , SetHoursDiffCalls] = useState(null);
    const [daysDiffCalls, SetDaysDiffCalls] = useState(null);

    const {values,InvitationOnChangeChecked,invitationOnChangeSelect ,handleClickDelete }=Hooks()
    const {getMailsGroupList}=GraphQLFetchDataForm(values)
    let ParisMoment = moment().tz("Europe/Paris")
    useEffect(() => {

            SetHoursDiffCalls(values.general.startHour?moment(values.general.startHour,'HH:mm').diff(ParisMoment,"hours"):0)
            SetDaysDiffCalls(values.general.startDate&&values.general.startHour?moment(values.general.startDate+"Z"+values.general.startHour,'YYYY-MM-DDZHH:mm').diff(ParisMoment,"days"):0)
            getMailsGroupList()
    }, []);

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)


    // take value of option select
    const onNameChange = event => {
        SetName(event.target.value)
    };
    // ajouter option dans le select
    const addItem = () => {

        if(name===""){
            message.error(t("formDirectVideo.GroupAdding"));
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

    const checkEmail = () => {

        let verificationMails=[]
        if (values.invitation.emails.length>0) {
            values.invitation.emails.map(ele => {
                if (!isValidEmail(ele))
                {
                    verificationMails=[...verificationMails,isValidEmail(ele)]
                }
            })
            if (verificationMails.includes(false))
                return false
            else
                return true

        }else
            return true

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

    // Validation des emails



    return(
        <div className={"Invitation"}>
            <div className={"title_invitation"}><h3 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.SendInvitations")}</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85", marginBottom: 6}}>{t("formDirectVideo.EmailsGroup")}<InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                <Form.Item name="emailsGroup" className={"form-item-style"}
                >
                    <Select
                        name="emailsGroup"
                        onChange={(value, event) => {
                            invitationOnChangeSelect(value, event, "emailsGroup")
                        }}
                        showArrow
                        className={"selectGroupGmail"}
                        getPopupContainer={() => document.querySelector(".selectGroupGmail")}
                        mode="multiple"
                        style={{width: 240}}
                        placeholder={t("formDirectVideo.ChooseGroup")}
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{margin: '4px 0'}}/>
                                <div style={{display: 'flex', flexWrap: 'nowrap', padding: 8}}>
                                    <Input style={{flex: 'auto'}} value={name} onChange={onNameChange}/>
                                    <a href="#/"
                                        style={{flex: 'none', padding: '8px', display: 'block', cursor: 'pointer'}}
                                        onClick={addItem}
                                    >
                                        <PlusOutlined/> {t("formDirectVideo.Add")}
                                    </a>
                                </div>
                            </div>
                        )}
                    >
                        {values.invitation.listMailsGroup.map(item => (
                            <Option value={item.name}key={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div2"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85", marginBottom: 6}}>{t("formDirectVideo.Emails")}  <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                       <Form.Item
                           style={{width:"100%"}}
                           name="emails"
                           rules={[
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (checkEmail(value)) {
                                           return Promise.resolve('value');
                                       }
                                       return Promise.reject(t("formDirectVideo.EnterValidEmailAddress"));
                                   },
                               }),
                           ]}
                       >
                           <Select
                               onInputKeyDown={(e) => {
                                   if (e.target.value.length === 0) {
                                       e.stopPropagation()
                                   }
                               }}
                               value={[]}
                               name="emails"
                               onChange={(value,event)=>invitationOnChangeSelect(value, event, "emails")}
                               {...selectProps}
                           />
                       </Form.Item>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div3"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85", marginBottom: 6}}>{t("formDirectVideo.SendingRules")} </span>
                <div className={"div_Email_accée"}>
                     <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.RegistrationAccessEmails")}</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.afterPrograming === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><span className="icon-sign_up icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Inscription")}</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.WebinarIsScheduled")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} name={"minusDelete"}  onClick={()=>handleClickDelete(1)}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.beforeWeek === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><span className="icon-access icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.ReminderJ7")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"p_ajout_régle"}>{t("formDirectVideo.7DBeforeTheStart")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"}  onClick={()=>handleClickDelete(2)}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.beforeDay === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><span className="icon-access icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.ReminderJ1")}</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.1DBeforeTheStart")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(3)}/></div>
                            </div>
                            :
                            null
                        }

                        {values.invitation.addRules.beforeHour === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><span className="icon-access icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.ReminderH1")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>{t("formDirectVideo.1HBeforeTheStart")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(4)}/></div>
                            </div>
                            :
                            null
                        }
                        <Tooltip placement="bottom" title={t("formDirectVideo.AddRule")}>
                        <Popover
                            getPopupContainer={() => document.querySelector(".popover1")}
                            className={"popover popover1"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox checked={values.invitation.addRules.afterPrograming === true} value="afterPrograming"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.RegistrationInv")}</Checkbox>
                                    <Checkbox disabled={daysDiffCalls<7} checked={values.invitation.addRules.beforeWeek === true} value="beforeWeek"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.ReminderJ7")}</Checkbox>
                                    <Checkbox disabled={daysDiffCalls<1} checked={values.invitation.addRules.beforeDay === true} value="beforeDay"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.ReminderJ1")}</Checkbox>
                                    <Checkbox disabled={hoursDiffCalls<1}checked={values.invitation.addRules.beforeHour === true} value="beforeHour"style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.ReminderH1")}</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.AddRule")}</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list1*/}


                <div className={"div_Email_accée list2"}>
                    <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.RegEmail")}</p>
                    <div className={"div_ajout_régle"}>

                        {values.invitation.addRules.afterSubscription === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><span className="icon-like icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.ConfirmReg")}</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"p_ajout_régle"}>{t("formDirectVideo.AfterReg")}</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(5)}/></div>
                            </div>
                            :
                            null
                        }
                        {
                            values.invitation.addRules.isParticiped === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><span className="icon-applause icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Participated")}</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.AfterTheEnd")}</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(6)}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.notVisualized === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><span className="icon-no_view icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.NoCome")}</span></div>
                                    <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"p_ajout_régle"}>{t("formDirectVideo.AfterTheEnd")}n</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(7)}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            values.invitation.addRules.replay === true
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><span className="icon-replay icon_ajout_régle" style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.25)"}}></span><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.Replay")}</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.JustAfterTheEnd")}</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"}} className={"icon2_ajout_régle"} onClick={()=>handleClickDelete(8)}/></div>
                                </div>
                                :
                                null
                        }


                        <Tooltip placement="bottom" title={t("formDirectVideo.AddRule")}>
                        <Popover
                            getPopupContainer={() => document.querySelector(".popover2")}
                            className={"popover popover2"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox checked={values.invitation.addRules.afterSubscription === true} value = "afterSubscription" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"chbx1"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.confirmInscription")}</Checkbox>
                                    <Checkbox checked={values.invitation.addRules.isParticiped === true} value = "isParticiped" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.paticipated")}</Checkbox>
                                    <Checkbox checked={values.invitation.addRules.notVisualized === true} value = "notVisualized" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.notCome")}</Checkbox>
                                    <Checkbox checked={values.invitation.addRules.replay === true} value = "replay" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} className={"chbox2"} onChange={InvitationOnChangeChecked}>{t("formDirectVideo.Replay")}</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visbleRegle}
                            onVisibleChange={handleVisibleChangeRegle}
                        >
                            <Button style={{  background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" , border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)" }} ><PlusSquareOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} /> <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>{t("formDirectVideo.AddRule")}</span></Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list2*/}



            </div>{/*./groupEmail*/}


        </div>
    )
}
export default Invitation