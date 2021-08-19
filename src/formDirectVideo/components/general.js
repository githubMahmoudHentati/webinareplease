import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Switch, Radio, Checkbox, DatePicker, Form,TimePicker} from 'antd'
import '../formDirectVideo.scss'
import { Upload, message } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, InboxOutlined} from '@ant-design/icons';
import {useSelector,useDispatch} from "react-redux";
import Hooks from "../utils/hooks";
import {DraggerUpload} from "./DraggerUpload";
import moment from "moment";
import useCopy from '@react-hook/copy'
import {setFormDirectLiveConstraintDataOnchange} from '../store/formDirectVideoAction'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/index';


export const Generals =({})=>{

    const dispatch = useDispatch()

    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t, i18n } = useTranslation();
    const requiredFieldRule = [{required: true, message: t('forgetPassword.FieldsRequired')}];

    const isValidPassword = () => {
console.log("pwd",values.general.pwd)
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_`!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/\◊♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(values.general.pwd)
    }
    const {generalOnChangeByName,generalOnChange,generalOnChangeButton,startGetDisabledMinutes,startGetDisabledHours,disablePastDate,values}= Hooks()
    console.log("valuespass",values)

    const {copied, copy, reset} = useCopy(
        values.general.liveLink+"/"+values.general.liveTitle
    )

    const copySuccess =async ()=>
    {
        await dispatch(setFormDirectLiveConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        copy()
        values.constraintData.leaveToast&&await message.success({
            content: i18n.t('formDirectVideo.SuccessCopyMsg'),
            duration: 2,
            style: {
                marginTop: '2vh',
            },
        })
            .then(async () =>
                await dispatch(setFormDirectLiveConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )
    }

    return(
        <Row gutter={[0, 30]}>
            <Col span={24} className={"col-forms"}>
                <span style={{textAlign:'left',fontSize:"20px", fontFamily: "SF Pro Display",fontWeight: "normal" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.GeneralSettings")}</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.AddLabel")}</span>
                    </Col>
                    <Col span={24} className={"col-forms-upload"}>
                        <DraggerUpload/>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <div style={{color:"red", fontSize:"0.75rem"}}>
                    {values.error ? t("CompteSettings.ErrorMsg"): ""}
                </div>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.LiveTitle")}</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Form.Item name="liveTitle" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <Input maxLength={100} name="liveTitle" onChange={generalOnChange} placeholder={t("formDirectVideo.VideoTitle")}></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.LiveFeedDescription")}</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Form.Item name="liveDescription" className={"form-item-style"}
                        >
                            <Input.TextArea name="liveDescription" onChange={generalOnChange}
                                            placeholder={t("formDirectVideo.VideoDescription")}></Input.TextArea>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "bold"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ShareLiveLink")}</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Row justify={"space-between"} className={"row-copy-btn"}>
                                    <Input disabled name="liveLink" onChange={generalOnChange}
                                           placeholder={'www.empreinte.com/titrelive'}
                                           value={values.general.liveLink+"/"+values.general.liveTitle}
                                    ></Input>
                                <Button className={"div-copy-btn"} style={{
                                    backgroundColor: !darkMode ? "" : "#141414",
                                    border: !darkMode ? "" : "1px solid rgba(255, 255, 255, 0.15)",
                                    color: !darkMode? "" : "rgba(255, 255, 255, 0.85)",

                                }}   onClick={copySuccess} >{t("formDirectVideo.Copier")}</Button>
                        </Row>

                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[10, 0]}>
                    <Col className={"col-forms"} >
                        <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.PlanBroadcast")}</span>
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
                        }}>{t("formDirectVideo.StartingDate")}</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>{t("formDirectVideo.StartingTime")}</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={8} className={"col_planification"}>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                        }}>{t("formDirectVideo.Duration")}</span>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="startDate" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <DatePicker initialValues={values.general.startHour && moment(values.general.startHour, 'YYYY-MM-DD')}
                                        disabledDate={(current)=>disablePastDate(current)} placeholder={t("formDirectVideo.ChooseStartDate")} onChange={(value,event)=>{generalOnChangeByName(value,event,"startDate")}} name="startDate"style={{width: "100%"}}></DatePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item  name="startHour" className={"form-item-style"}
                                    rules={requiredFieldRule}
                        >
                            <TimePicker placeholder={t("formDirectVideo.ChooseStartTime")} name="startHour" onChange={(value,event)=>{generalOnChangeByName(value,event,"startHour")}}  style={{width: "100%"}}
                                        disabledHours={()=>startGetDisabledHours(values)}
                                        disabledMinutes={startGetDisabledMinutes}
                            ></TimePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="period" className={"form-item-style"}
                        >
                            <TimePicker placeholder={t("formDirectVideo.ChooseTimeFrame")} name="period" onChange={(value,event)=>{generalOnChangeByName(value,event,"period")}}  style={{width: "100%"}}></TimePicker>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            }
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{  color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.AccessModeToStreaming")}</span>
                    </Col>
                    <Col span={24} >
                        <Row gutter={[0, 10]} >
                            <Col span={24}>
                                <Radio.Group name="directAccessMode" onChange={generalOnChange} value={values.general.directAccessMode} >
                                    <Radio onChange={generalOnChangeButton} name="freeAccess"  value="freeAccess"  style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.PublicAccess")}</Radio>
                                    <Radio onChange={generalOnChangeButton} name="liveAccess" value="liveAccess" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.SecureAccess")}</Radio>
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
                                                return Promise.reject(t("resetPassword.MinCharCapLetterMsg"));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        onChange={generalOnChange}
                                        className={"spn2"}
                                        name="pwd"
                                        placeholder={t("CompteSettings.Password")}
                                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>
                            </Col>
                            }
                            {values.general.directAccessMode === "liveAccess" &&
                            <Col offset={3} span={21}>
                                <Checkbox checked={values.general.securedPasswordOption} onChange={generalOnChangeButton} value="securedPasswordOption" name="securedPasswordOption" style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.GenSecurePassword")}</Checkbox>
                            </Col>
                            }
                        </Row>

                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
