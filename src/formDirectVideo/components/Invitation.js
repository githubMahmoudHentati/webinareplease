import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu , Select , Divider , Tag , Tooltip , Popover , Checkbox} from 'antd'
import {  InfoCircleFilled , PlusOutlined , MinusCircleOutlined , ExportOutlined , DiffOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import EditableTagGroup from "./EditableTagGroup";
import '../formDirectVideo.scss'
import {useSelector} from "react-redux";
const { Option } = Select;
let index = 0;




function Invitation(){
    const [name , SetName] = useState('')
    const [items , SetItems] = useState(['Groupe 01' , 'Groupe 02' , 'Groupe 03' , 'Groupe 04'])
    const [visible , SetVisible] = useState(false)
    const [visbleRegle , SetVisibleRegle] = useState(false);
    const [visibleInscription , SetVisibleInscription] = useState(false)
    const [visibleRappelJ7 , SetVisibleRappelJ7 ] = useState(false)
    const [visibleRappelJ1 , SetVisibleRappelJ1 ] = useState(false)
    const [visibleRappelH1 , SetVisibleRappelH1 ] = useState(false)

    const [visibleInscription2 , SetVisibleInscription2] = useState(false)
    const [visibleRappelJ72 , SetVisibleRappelJ72 ] = useState(false)
    const [visibleRappelJ12 , SetVisibleRappelJ12 ] = useState(false)
    const [visibleRappelH12 , SetVisibleRappelH12 ] = useState(false)

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
    //handle Click checkbox invitation popover one
    const onChangeInscription = (e) =>{
        SetVisibleInscription(e.target.checked)
    }
    // handle click checkbox rappel j7
    const onChangeRappelJ7 = (e) =>{
        SetVisibleRappelJ7(e.target.checked)
    }
    //handle click checkbox rappel j1
    const onChangeRappelJ1 = (e) =>{
        SetVisibleRappelJ1(e.target.checked)
    }
    // handle click checkbox rappel h1
    const onChangeRappelH1 = (e) =>{
        SetVisibleRappelH1(e.target.checked)
    }
    //handle Click checkbox invitation popover two
    const onChangeInscription2 = (e) =>{
        SetVisibleInscription2(e.target.checked)
    }
    // handle click checkbox rappel j7
    const onChangeRappelJ72 = (e) =>{
        SetVisibleRappelJ72(e.target.checked)
    }
    //handle click checkbox rappel j1
    const onChangeRappelJ12 = (e) =>{
        SetVisibleRappelJ12(e.target.checked)
    }
    // handle click checkbox rappel h1
    const onChangeRappelH12 = (e) =>{
        SetVisibleRappelH12(e.target.checked)
    }



    return(
        <div className={"Invitation"}>
            <div className={"title_invitation"}><h3 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Envoi des invitations</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Groupe d'emails   <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                <Select
                    showArrow
                    className={"selectGroupGmail"}
                    mode="multiple"
                    style={{ width: 240 }}
                    placeholder="Choisir un groupe"
                    dropdownRender={menu => (
                        <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
                                <a
                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                    onClick={addItem}
                                >
                                    <PlusOutlined /> Ajouter
                                </a>
                            </div>
                        </div>
                    )}
                >
                    {items.map(item => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div2"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>E-mails   <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></span>
                <div className={"AddTags"} style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"solid 1px rgba(0, 0, 0, 0.15)":"1px solid rgba(255, 255, 255, 0.15)"}}>
                <EditableTagGroup />
                </div>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div2"}>
                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Régles d'envoi </span>
                <div className={"div_Email_accée"}>
                     <p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Emails d'inscription et d'accès</p>
                    <div className={"div_ajout_régle"}>

                        {visibleInscription === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Inscription</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Dès la programmation du webinar</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"color: rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelJ7 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Rappel J-7</span></div>
                                <div className={"p_ajout_régle"}><p style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"p_ajout_régle"}>7 jours avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelJ1 === true
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Rappel J-1</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>1 jour avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelH1 === true
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
                                    <Checkbox style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={onChangeInscription}>Invitation pour inscription</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelJ7}>Rappel J-7</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelJ1}>Rappel J-1</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"RGBA(0, 0, 0, 0.65)":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelH1}>Rappel H-1</Checkbox>
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

                        {visibleInscription2 === true
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
                            visibleRappelJ72 === true
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
                            visibleRappelJ12 === true
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
                            visibleRappelH12 === true
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
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbx1"} onChange={onChangeInscription2}>Invitation pour inscription</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelJ72}>Rappel J-7</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelJ12}>Rappel J-1</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}} className={"chbox2"} onChange={onChangeRappelH12}>Rappel H-1</Checkbox>
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