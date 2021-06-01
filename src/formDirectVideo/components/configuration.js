import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Switch,Radio,Checkbox,Select} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export const Configuration =()=>{
    const CheckboxGroup = Checkbox.Group;
    const { Option } = Select;
    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

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
                    <Col span={24}>
                        <Row gutter={[10, 0]}>
                            <Col className={"col-forms"}>
                                <span style={{
                                    fontSize: "15px",
                                    fontFamily: "system-ui",
                                    fontWeight: "bold"
                                }}>Intervenants</span>
                            </Col>
                            <Col>
                                <Switch/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    fontSize: "14px",
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
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[0, 10]}>
                            <Col className={"col-forms"} span={24}>
                                <span style={{
                                    fontSize: "14px",
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