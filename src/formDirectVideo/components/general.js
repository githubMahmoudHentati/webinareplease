import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Switch,Radio,Checkbox,DatePicker} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";


export const Generals =()=>{
    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

    };
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const {generalOnChangeSwitch,generalOnChange,generalOnChangeButton,values}= Hooks()
    console.log("values",values)


    return(
        <Row gutter={[0, 30]}>
            <Col span={24} className={"col-forms"}>
                <span style={{textAlign:'left',fontSize:"20px", fontFamily: "SF Pro Display",fontWeight: "normal" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Paramètres généraux</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Ajouter une vignette</span>
                    </Col>
                    <Col span={24} className={"col-forms-upload"}>
                        <Dragger {...props} style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
                            </p>
                            <p className="ant-upload-text" style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Cliquer ou faites glisser le fichier</p>
                            <p className="ant-upload-hint" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                Un seul fichier peut etre selectionné
                            </p>
                        </Dragger>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Titre du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                       <Input placeholder={"Titre du vidéo"} ></Input>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Description du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Input.TextArea placeholder={"Description du vidéo"}></Input.TextArea>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Lien de partage du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Row  justify={"space-between"} style={{width:'100%'}}gutter={[0, 0]} >
                            <Col xxl={22} xl={21} lg={20} md={19} sm={17} xs={14}>
                                <Input placeholder={'www.empreinte.com/titrelive'}></Input>
                            </Col>
                            <Col >
                                <Button style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Copier</Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[10, 0]}>
                    <Col className={"col-forms"} >
                        <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Planifier le direct</span>
                    </Col>
                    <Col >
                        <Switch  checked={values.general.directPlan} name="directPlan" value="directPlan" onChange={(checked,event)=>{generalOnChangeSwitch(checked,event,"directPlan")}}/>
                    </Col>
                </Row>
            </Col>
            {values.general.directPlan &&
            <Col span={24}>
                <Row gutter={[20, 10]}>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Date de début</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Heure de début</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Durée</span>
                    </Col>
                    <Col span={8}>
                        <DatePicker style={{width: "100%"}}></DatePicker>
                    </Col>
                    <Col span={8}>
                        <DatePicker style={{width: "100%"}}></DatePicker>
                    </Col>
                    <Col span={8}>
                        <DatePicker style={{width: "100%"}}></DatePicker>
                    </Col>
                </Row>
            </Col>
            }
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Modes d'accès au direct</span>
                    </Col>
                    <Col span={24} >
                        <Row gutter={[0, 10]} >
                            <Col span={24}>
                                <Radio.Group name="directAccessMode" onChange={generalOnChange} defaultValue={values.general.directAccessMode} >
                                    <Radio onChange={generalOnChangeButton} name="freeAccess"  value="freeAccess"  style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Acccès libre</Radio>
                                    <Radio onChange={generalOnChangeButton} name="securedAccess" value="securedAccess" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Accès sécurisé</Radio>
                                </Radio.Group>
                            </Col>
                            {values.general.directAccessMode === "securedAccess" &&
                            <Col offset={3} span={21}>
                                <Input placeholder={'Taper votre mot de passe'}></Input>
                            </Col>
                            }
                            {values.general.directAccessMode === "securedAccess" &&
                            <Col offset={3} span={21}>
                                <Checkbox style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>Générer
                                    un mot de passe sécurisé</Checkbox>
                            </Col>
                            }
                        </Row>

                    </Col>
                </Row>
            </Col>

        </Row>
    )
}
