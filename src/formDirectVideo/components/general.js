import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Switch, Radio, Checkbox, DatePicker, Form,TimePicker} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, InboxOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import {DraggerUpload} from "./DraggerUpload";
import moment from "moment";


export const Generals =({})=>{

    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const requiredFieldRule = [{required: true, message: 'Champs requis'}];

    const isValidPassword = (password) => {

        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(password)
    }
    const {generalOnChangeByName,generalOnChange,generalOnChangeButton,startGetDisabledMinutes,startGetDisabledHours,disablePastDate,values}= Hooks()
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
                        <DraggerUpload/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Titre du direct</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Form.Item name="liveTitle" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <Input name="liveTitle" onChange={generalOnChange} placeholder={"Titre du vidéo"}></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Description du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Form.Item name="liveDescription" className={"form-item-style"}
                        >
                            <Input.TextArea name="liveDescription" onChange={generalOnChange}
                                            placeholder={"Description du vidéo"}></Input.TextArea>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Lien de partage du direct</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Row justify={"space-between"} style={{width: '100%'}} gutter={[0, 0]}>
                            <Col xxl={22} xl={21} lg={20} md={19} sm={17} xs={14}>
                                <Form.Item name="liveTitle" className={"form-item-style"}
                                >
                                    <Input name="liveTitle" onChange={generalOnChange}
                                           placeholder={'www.empreinte.com/titrelive'}></Input>
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button style={{
                                    backgroundColor: darkMode === false ? "" : "#141414",
                                    border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)",
                                    color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                                }}>Copier</Button>
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
                        <Form.Item name="liveAction" className={"form-item-style"}
                        >
                            <Switch checked={values.general.liveAction} name="liveAction" value="liveAction"
                                    onChange={(checked, event) => {
                                        generalOnChangeByName(checked, event, "liveAction")
                                    }}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            {values.general.liveAction &&
            <Col span={24}>
                <Row gutter={[20, 10]}>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Date de début</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Heure de début</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>Durée</span>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="startDate" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <DatePicker initialValues={values.general.startHour && moment(values.general.startHour, 'YYYY-MM-DD')}
                                disabledDate={disablePastDate} placeholder="Choisir une date de début" onChange={(value,event)=>{generalOnChangeByName(value,event,"startDate")}} name="startDate"style={{width: "100%"}}></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item  name="startHour" className={"form-item-style"}
                                    rules={requiredFieldRule}
                        >
                            <TimePicker placeholder="Choisir une heure de début" name="startHour" onChange={(value,event)=>{generalOnChangeByName(value,event,"startHour")}}  style={{width: "100%"}}
                                        disabledHours={()=>startGetDisabledHours(values)}
                                        disabledMinutes={startGetDisabledMinutes}
                            ></TimePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="period" className={"form-item-style"}
                        >
                            <TimePicker placeholder="Choisir une periode" name="period" onChange={(value,event)=>{generalOnChangeByName(value,event,"period")}}  style={{width: "100%"}}></TimePicker>
                        </Form.Item>
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
                                    <Radio onChange={generalOnChangeButton} name="liveAccess" value="liveAccess" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Accès sécurisé</Radio>
                                </Radio.Group>
                            </Col>
                            {values.general.directAccessMode === "liveAccess" &&
                            <Col offset={3} span={21}>
                                <Form.Item
                                    className={"form-item-style"}
                                    name="pwd"
                                    rules={[
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (isValidPassword(value)) {
                                                    return Promise.resolve('value');
                                                }
                                                return Promise.reject('Minimum 8 caractéres avec au moins une majiscule, un chiffre et un caractère spéciale');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        onChange={generalOnChange}
                                        className={"spn2"}
                                        name="pwd"
                                        placeholder="Mot de passe"
                                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>
                            </Col>
                            }
                            {values.general.directAccessMode === "liveAccess" &&
                            <Col offset={3} span={21}>
                                <Form.Item name="securedPasswordOption"  className={"form-item-style"}
                                >
                                <Checkbox onChange={generalOnChangeButton} value="securedPasswordOption" name="securedPasswordOption" style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>Générer
                                    un mot de passe sécurisé</Checkbox>
                                </Form.Item>
                            </Col>
                            }
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
