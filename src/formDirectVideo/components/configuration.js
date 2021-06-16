import React, { useState,useEffect,useRef } from 'react';
import {
    Row,
    Col,
    Input,
    Button,
    Card,
    Tabs,
    Breadcrumb,
    Menu,
    Switch,
    Radio,
    Checkbox,
    Select,
    Space,
    List,
    Avatar,
    Form,
    Tooltip
} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { PlusSquareOutlined,EditOutlined,MinusCircleOutlined , InfoCircleFilled } from '@ant-design/icons';
import {Hooks} from '../utils/hooks'
import {ModalSpeaker} from './modalspeacker'
import {useDispatch, useSelector} from "react-redux";
import {setConfigurationOnchange, setModalSpeaker, setOnchange} from "../store/formDirectVideoAction";
import EditableTagGroupConfiguration from "./EditableTagGroupConfiguration";

const { Option } = Select;

export const Configuration =()=>{
    const dispatch = useDispatch()
    const [itemListHeight, setItemListHeight] = useState(null);
    const values = useSelector((state)=> state.FormDirectVideoReducer)
    
    const itemListRef   = useRef(null);
    
    const {configurationOnChangeSwitch,addSpeaker,editSpeaker,deleteSpeaker,onChangeCheckbox,configurationOnChangeButton}= Hooks()

    console.log("values",values)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const CheckboxGroup = Checkbox.Group;
    const { Option } = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    const handleChangeTags = (value) =>{
        console.log(`selected ${value}`);
    }
    const selectProps = {
        mode:"tags",
        placeholder: "Tags Mode",
        dropdownClassName:`custom-dropdown`,
        className:`custom-select`
    };
    

    useEffect ( () => {
        itemListRef.current&&setItemListHeight(itemListRef.current.offsetHeight)
    }, [itemListRef]);

    useEffect(async () => {
        console.log("testswitch",values.configuration.SpeakerList.length>0)
        values.configuration.SpeakerList.length>1&&
        dispatch(setConfigurationOnchange({configurationNameChange:"switchSpeaker", configurationValueChange:true}));
    }, []);
        console.log("testxxx",values.configuration.switchSpeaker)


    return(
        <Row gutter={[0, 50]} className={"Configuration"}>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span className={"config_direct"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Configuration de la page du direct</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Programme du direct</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Input.TextArea Rows={5}
                                                placeholder={"hh:mm - hh:mm\nTitre et description du sujet"}>

                                </Input.TextArea>
                            </Col>
                        </Row>
                    </Col>
                    <Col  span={24}>
                        <Row gutter={[10, 15]}>
                            <Col className={"col-forms"}>
                                <span style={{
                                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85"
                                }}>Intervenants</span>
                            </Col>
                            <Col>
                                <Switch checked={values.configuration.switchSpeaker} name="switchSpeaker"  onChange={(checked,event)=>configurationOnChangeSwitch(checked,event,"switchSpeaker")}/>
                            </Col>
                            {values.configuration.SpeakerList.length>1&&values.configuration.switchSpeaker &&
                             <Col span={24}>
                                <Row>
                                    <List
                                        className="list-speaker"
                                        className={`list-speaker ${values.configuration.SpeakerList.length>3?"scrolling":""}`}
                                        itemLayout="horizontal"
                                        dataSource={values.configuration.SpeakerList}
                                        renderItem={(item,indexItem) => (
                                            <List.Item   actions={indexItem != 0?[
                                                <span key="list-loadmore-edit"><EditOutlined
                                                    onClick={() => editSpeaker(item.name, item.lastName, item.title, item.email, indexItem)}
                                                    style={{fontSize: "21px",color:darkMode===false}}/></span>,
                                                <span key="list-loadmore-more"><MinusCircleOutlined
                                                    style={{fontSize: "21px",color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}
                                                    onClick={() => deleteSpeaker(indexItem)}/></span>
                                            ]:
                                            [<span style={{marginLeft:"48px"}}/>]} >
                                                <List.Item.Meta
                                                    className={indexItem!=0&&"col-item-list"}
                                                    avatar={<Avatar src={item.logoSpeaker.thumbUrl?item.logoSpeaker.thumbUrl:
                                                        "https://www.trustedclothes.com/blog/wp-content/uploads/2019/02/anonymous-person-221117.jpg"} />}
                                                    title={
                                                        <div ref = { itemListRef }>
                                                            <Row >
                                                                <Col xl={8}lg={10}md={14}sm={16} xs={17}>
                                                                    <span style={{textAlign: 'left', fontSize: "17px", fontFamily: "system-ui"}}>
                                                                        {item.name}  {item.lastName}</span>
                                                                </Col>
                                                                <Col offset={1} >
                                                                    <span style={{textAlign: 'left', fontSize: "15px", fontFamily: "system-ui",
                                                                        fontWeight:"lighter"}}>{item.title}</span>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Row>
                             </Col>
                            }
                            <Col className={"button-SpeackAadd"} span={24}>
                                {values.configuration.modalSpeaker &&
                                <ModalSpeaker isVisible={values.configuration.modalSpeaker}/>
                                }
                                {values.configuration.switchSpeaker&&values.configuration.SpeakerList.length>1&&
                                <Button onClick={addSpeaker} icon={<PlusSquareOutlined/>}>Ajouter un
                                    intervenant</Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                }}>Option Interactives du direct</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox value="chat"style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Chat(nom modéré)</p></Checkbox>
                                    <Checkbox value="comments" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Commentaires (modérés)</p></Checkbox>
                                    <Checkbox value="likeMention" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Mention j'aime</p></Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                }}>Options multimédia du direct </span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox  value="richeMediaDiffusion"style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Diffusion Richmedia
                                        <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></p></Checkbox>
                                    <br/>
                                    <br/>
                                    <Checkbox  value="attachments"style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Fichiers joints
                                        <InfoCircleFilled style={{color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/></p></Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span className={"config_direct"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Configuration vidéo</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"col-forms"}>
                                        <span style={{
                                                color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                        }}>Archivage automatique du direct</span>
                                    </Col>
                                    <Col>
                                        <Switch name="directAutomaticArchiving"onChange={(checked,event)=>configurationOnChangeSwitch(checked,event,"directAutomaticArchiving")}
                                        />
                                        <Tooltip placement="right" title={"Votre direct sera automatiquement archivé et disponible visualisation vidéo à la demande"}>
                                        <InfoCircleFilled style={{cursor:"pointer" , color:darkMode===false?"rgba(0, 0, 0, 0.15)":"rgba(255, 255, 255, 0.85"}} className={"infosIcon"}/>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                            {values.configuration.directAutomaticArchiving&&
                            <Col span={24} className={"col-forms"}>
                                <Radio.Group value={values.configuration.videoMode}name="videoMode"onChange={onChangeCheckbox}>
                                    <Space direction="vertical">
                                        <Radio  onChange={configurationOnChangeButton} value="notVisibleVideo">
                                            <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Vidéo non visible</p></span></Radio>
                                        <Radio checked={values.configuration.visibleVideo} onChange={configurationOnChangeButton} value="visibleVideo">
                                            <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}><p>Vidéo visible</p></span></Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>
                                }
                            {values.configuration.directAutomaticArchiving && values.configuration.videoMode==="visibleVideo"&&
                            <Col span={24} style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}} className={"col-forms"}>
                                <span>Thèmes</span>
                            </Col>
                            }
                            {values.configuration.directAutomaticArchiving && values.configuration.videoMode==="visibleVideo"&&
                                <Col offset={1} span={23} >
                                <Input placeholder={'www.empreinte.com/titrelive'}></Input>
                                </Col>
                            }
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Tags</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                    <Select className={"selectTags"} mode="tags" style={{ width: '100%' , minHeight:"32px" }} placeholder="Tags Mode" onChange={handleChangeTags}  {...selectProps} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};