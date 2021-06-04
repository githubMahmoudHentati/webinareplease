import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu , Select , Divider , Tag , Tooltip , Popover , Checkbox} from 'antd'
import {  InfoCircleFilled , PlusOutlined , MinusCircleOutlined , ExportOutlined , DiffOutlined , PlusSquareOutlined  } from '@ant-design/icons';
import EditableTagGroup from "./EditableTagGroup";
import '../formDirectVideo.scss'
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
            <div className={"title_invitation"}><h3>Envoi des invitations</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span>Groupe d'emails   <InfoCircleFilled className={"infosIcon"}/></span>
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
                <span>E-mails   <InfoCircleFilled className={"infosIcon"}/></span>
                <div className={"AddTags"}>
                <EditableTagGroup />
                </div>
            </div>{/*./groupEmail*/}

            <div className={"groupEmail div2"}>
                <span>Régles d'envoi </span>
                <div className={"div_Email_accée"}>
                     <p>Emails d'inscription et d'accès</p>
                    <div className={"div_ajout_régle"}>

                        {visibleInscription === false
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span>Inscription</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>Dès la programmation du webinar</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelJ7 === false
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>Rappel J-7</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>7 jours avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelJ1 === false
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>Rappel J-1</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>1 jour avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }

                        {visibleRappelH1 === false
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>Rappel H-1</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>1 jour avant le début</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        <Tooltip placement="bottom" title={" Ajouter une règle"}>
                        <Popover
                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox className={"chbx1"} onChange={onChangeInscription}>Invitation pour inscription</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelJ7}>Rappel J-7</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelJ1}>Rappel J-1</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelH1}>Rappel H-1</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visible}
                            onVisibleChange={handleVisibleChange}
                        >
                            <Button ><PlusSquareOutlined /> Ajouter une règle</Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list1*/}


                <div className={"div_Email_accée list2"}>
                    <p>Emails pour les inscrits</p>
                    <div className={"div_ajout_régle"}>

                        {visibleInscription2 === false
                            ?
                            <div className={"infos_ajout_régle"}>
                                <div className={"title_ajout_régle"}><DiffOutlined  className={"icon_ajout_régle"}/><span>Confirmation d'inscription</span></div>
                                <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>Juste après l'inscription</p></div>
                                <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                            </div>
                            :
                            null
                        }
                        {
                            visibleRappelJ72 === false
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>A participé</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            visibleRappelJ12 === false
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>Non venu</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }

                        {
                            visibleRappelH12 === false
                                ?
                                <div className={"infos_ajout_régle"}>
                                    <div className={"title_ajout_régle"}><ExportOutlined  className={"icon_ajout_régle"}/><span>Non venu</span></div>
                                    <div className={"p_ajout_régle"}><p className={"p_ajout_régle"}>Juste après la fin</p></div>
                                    <div className={"div_icon_ajout_régle"}><MinusCircleOutlined className={"icon2_ajout_régle"}/></div>
                                </div>
                                :
                                null
                        }


                        <Tooltip placement="bottom" title={" Ajouter une règle"}>
                        <Popover
                            className={"popover"}
                            content={
                                <div className={"popoverCheckbox"}>
                                    <Checkbox className={"chbx1"} onChange={onChangeInscription2}>Invitation pour inscription</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelJ72}>Rappel J-7</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelJ12}>Rappel J-1</Checkbox>
                                    <Checkbox className={"chbox2"} onChange={onChangeRappelH12}>Rappel H-1</Checkbox>
                                </div>
                            }
                            trigger="click"
                            visible={visbleRegle}
                            onVisibleChange={handleVisibleChangeRegle}
                        >
                            <Button ><PlusSquareOutlined /> Ajouter une règle</Button>
                        </Popover>
                        </Tooltip>

                    </div>
                </div>{/*./list2*/}



            </div>{/*./groupEmail*/}


        </div>
    )
}
export default Invitation