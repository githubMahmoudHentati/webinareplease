import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Switch,Radio,Checkbox} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

export const Generals =()=>{
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    };

    return(
        <Row gutter={[0, 30]}>
            <Col span={24} className={"col-forms"}>
                <span style={{textAlign:'left',fontSize:"20px",fontWeight: "bold"}}>Paramètres généraux</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}}>Ajouter une vignette</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}}>Titre du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                       <Input placeholder={"Titre du vidéo"}></Input>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}}>Titre du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Input.TextArea placeholder={"Description du vidéo"}></Input.TextArea>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}}>Lien de partage du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Row  justify={"space-between"} style={{width:'100%'}}gutter={[0, 0]} >
                            <Col xxl={22} xl={21} lg={20} md={19} sm={17} xs={14}>
                                <Input placeholder={'www.empreinte.com/titrelive'}></Input>
                            </Col>
                            <Col >
                                <Button>Copier</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[10, 0]}>
                    <Col className={"col-forms"} >
                        <span style={{fontSize: "14px", fontWeight: "bold"}}>Planifier le direct</span>
                    </Col>
                    <Col >
                        <Switch/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}}>Modes d'accès ay direct</span>
                    </Col>
                    <Col span={24} >
                        <Row >
                            <Col lg={3} xs={10} style={{alignItems:"flex-start"}} className={"col-forms"}>
                                <Radio>Acccès libre</Radio>
                            </Col>
                            <Col  lg={21} xs={14} >
                                <Row gutter={[0, 20]}>
                                    <Col span={24} className={"col-forms"}>
                                        <Radio>Accès sécurisé</Radio>
                                    </Col>
                                    <Col span={24} className={"col-forms"}>
                                        <Input placeholder={'Taper votre mot de passe'}></Input>
                                    </Col>
                                    <Col span={24} className={"col-forms"}>
                                        <Checkbox >Générer un mot de passe sécurisé</Checkbox>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>

        </Row>
    )
}
