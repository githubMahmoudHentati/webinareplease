import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Switch,Radio,Checkbox,Select,Space,List, Avatar} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { PlusSquareOutlined,EditOutlined,MinusCircleOutlined } from '@ant-design/icons';
import {Hooks} from '../utils/hooks'
import {ModalSpeaker} from './modalspeacker'

export const Configuration =()=>{
    const [SpeakerList, setSpeakerList] = useState([{Psuedo: "Nom et Prénom", title:"Titre"},{Psuedo: "Mahmoud Hentati", title:"Développeur"},{Psuedo: "Taha aizedine", title:"Développeur"},{Psuedo: "Ahmed Berriche", title:"Développeur"}]);
    const [itemListHeight, setItemListHeight] = useState(null);

    const itemListRef   = useRef(null);
    const {onChangeSwitch,handleOk,handleCancel,values}= Hooks()

    console.log("values",values)

    const CheckboxGroup = Checkbox.Group;
    const { Option } = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    console.log("itemListRef",itemListHeight)

    useEffect ( () => {
        console.log("itemListRef",itemListHeight)
        setItemListHeight(itemListRef.current.offsetHeight)

    }, [itemListRef]);

    return(
        <Row gutter={[0, 50]}>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui"}}>Configuration de la page du direct</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Programme du direct</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <Input.TextArea Rows={5}
                                                placeholder={"hh:mm - hh:mm\nTitre et description du sujet"}></Input.TextArea>
                            </Col>
                        </Row>
                    </Col>
                    <Col  span={24}>
                        <Row gutter={[10, 15]}>
                            <Col className={"col-forms"}>
                                <span style={{
                                    fontSize: "15px",
                                    fontFamily: "system-ui",
                                    fontWeight: "bold"
                                }}>Intervenants</span>
                            </Col>
                            <Col>
                                <Switch onChange={onChangeSwitch}/>
                            </Col>
                            {SpeakerList &&
                             <Col span={24}>
                                <Row>
                                    <List
                                        style={{height:`172px`}}
                                        className={`list-speaker ${SpeakerList.length>3?"scrolling":""}`}
                                        itemLayout="horizontal"
                                        dataSource={SpeakerList}
                                        renderItem={item => (
                                            <List.Item   actions={[<span key="list-loadmore-edit"><EditOutlined /></span>, <span key="list-loadmore-more"><MinusCircleOutlined /></span>]} >
                                                <List.Item.Meta
                                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                    title={
                                                        <div ref = { itemListRef }>
                                                            <Row >
                                                                <Col span={6}>
                                                                    <span style={{textAlign: 'left', fontSize: "17px", fontFamily: "system-ui"}}>{item.Psuedo}</span>
                                                                </Col>
                                                                <Col >
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
                            {values.modalSpeaker &&
                            <Col className={"button-SpeackAadd"} span={24}>
                                <ModalSpeaker handleOk={handleOk} handleCancel={handleCancel} isVisible={values.modalSpeaker}/>
                                <Button icon={<PlusSquareOutlined/>}>Ajouter un intervenant</Button>
                            </Col>
                            }
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    fontSize: "16px",
                                    fontFamily: "system-ui"
                                }}>Option Interactives du direct</span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox>Chat(nom modéré)</Checkbox>
                                    <Checkbox>Commentaires (modérés)</Checkbox>
                                    <Checkbox>Mention j'aime</Checkbox>
                                </CheckboxGroup>
                            </Col>
                            }
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    fontSize: "16px",
                                    fontFamily: "system-ui"
                                }}>Options multimédia du direct </span>
                            </Col>
                            <Col span={24} className={"col-forms"}>
                                <CheckboxGroup>
                                    <Checkbox>Diffusion Richmedia</Checkbox>
                                    <Checkbox>Fichiers joints</Checkbox>
                                </CheckboxGroup>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 25]}>
                    <Col span={24} className={"col-forms"}>
                        <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui"}}>Configuration vidéo</span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 15]}>
                            <Col span={24}>
                                <Row gutter={[10, 0]}>
                                    <Col className={"col-forms"}>
                                        <span style={{
                                                fontSize: "15px",
                                                fontFamily: "system-ui",
                                                fontWeight: "bold"
                                        }}>Archivage automatique du direct</span>
                                    </Col>
                                    <Col>
                                        <Switch/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value={1}><span style={{textAlign: 'left', fontSize: "13px", fontFamily: "system-ui"}}>Vidéo non visible</span></Radio>
                                        <Radio value={2}><span style={{textAlign: 'left', fontSize: "13px", fontFamily: "system-ui"}}>Vidéo visible</span></Radio>
                                    </Space>
                                </Radio.Group>
                            </Col>
                            <Col span={24}>
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
                                <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Tags</span>
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