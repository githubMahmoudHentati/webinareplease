import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Switch,Radio,Checkbox,Select,Space,List, Avatar,Form} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { PlusSquareOutlined,EditOutlined,MinusCircleOutlined } from '@ant-design/icons';
import {Hooks} from '../utils/hooks'
import {ModalSpeaker} from './modalspeacker'
import {useDispatch, useSelector} from "react-redux";
import {setModalSpeaker, setSwitchSpeaker} from "../store/formDirectVideoAction";


export const Configuration =()=>{
    const dispatch = useDispatch()
    const [itemListHeight, setItemListHeight] = useState(null);
    const values = useSelector((state)=> state.FormDirectVideoReducer)


    const itemListRef   = useRef(null);
    const {onChangeSwitch,addSpeaker,editSpeaker,deleteSpeaker}= Hooks()

    console.log("values",values)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const CheckboxGroup = Checkbox.Group;
    const { Option } = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    console.log("itemListRef",itemListHeight)

    useEffect ( () => {
        console.log("itemListRef",itemListHeight)
        itemListRef.current&&setItemListHeight(itemListRef.current.offsetHeight)
    }, [itemListRef]);

    useEffect(async () => {
        console.log("testswitch",values.SpeakerList.length>0)
        values.SpeakerList.length>1&&dispatch(setSwitchSpeaker(true));
    }, []);
        console.log("testxxx",values.switchSpeaker)


    return(
        <Row gutter={[0, 50]}>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Configuration de la page du direct</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Programme du direct</span>
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
                                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                    fontSize: "15px",
                                    fontFamily: "system-ui",
                                    fontWeight: "bold"
                                }}>Intervenants</span>
                            </Col>
                            <Col>
                                <Switch name="switchSpeaker" defaultChecked={values.switchSpeaker} onChange={onChangeSwitch}/>
                            </Col>
                            {values.SpeakerList.length>1&&values.switchSpeaker &&
                             <Col span={24}>
                                <Row>
                                    <List
                                        className="list-speaker"
                                        className={`list-speaker ${values.SpeakerList.length>3?"scrolling":""}`}
                                        itemLayout="horizontal"
                                        dataSource={values.SpeakerList}
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
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={
                                                        <div ref = { itemListRef }>
                                                            <Row >
                                                                <Col xl={8}lg={10}md={14}sm={16} xs={17}>
                                                                    <span style={{textAlign: 'left', fontSize: "17px", fontFamily: "system-ui"}}>{item.name}  {item.lastName}</span>
                                                                    <span style={{textAlign: 'left', fontSize: "17px", fontFamily: "system-ui"}}>{item.name}  {item.lastName}</span>
                                                                </Col>
                                                                <Col offset={1} >
                                                                    <span style={{textAlign: 'left', fontSize: "15px", fontFamily: "system-ui",fontWeight:"lighter"}}>{item.title}</span>
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
                                {values.modalSpeaker &&
                                <ModalSpeaker isVisible={values.modalSpeaker}/>
                                }
                                {values.switchSpeaker&&values.SpeakerList.length>1&&
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
                                    fontSize: "16px",
                                    fontFamily: "system-ui"
                                }}>Option Interactives du direct</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Chat(nom modéré)</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Commentaires (modérés)</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Mention j'aime</Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                    fontSize: "16px",
                                    fontFamily: "system-ui"
                                }}>Options multimédia du direct </span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Diffusion Richmedia</Checkbox>
                                    <Checkbox style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Fichiers joints</Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Configuration vidéo</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"col-forms"}>
                                        <span style={{
                                                color:darkMode===false?"":"rgba(255, 255, 255, 0.85",
                                                fontSize: "15px",
                                                fontFamily: "system-ui",
                                                fontWeight: "bold"
                                        }}>Archivage automatique du direct</span>
                                    </Col>
                                    <Col>
                                        <Switch name="directAutomaticArchiving"onChange={onChangeSwitch}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value={1}><span style={{textAlign: 'left', fontSize: "13px", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Vidéo non visible</span></Radio>
                                        <Radio value={2}><span style={{textAlign: 'left', fontSize: "13px", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Vidéo visible</span></Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>
                            <Col span={24} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>
                                Thèmes
                            </Col>
                            <Col offset={1} span={23}>
                                <Input placeholder={'www.empreinte.com/titrelive'}></Input>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85"}}>Tags</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Choisir des Tags" >
                                    {children}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};