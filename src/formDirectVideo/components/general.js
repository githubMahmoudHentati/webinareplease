import React, {useEffect,useRef} from 'react';
import {Row, Col, Input, Button, Switch, Radio, Checkbox, DatePicker, Form,TimePicker} from 'antd'
import '../formDirectVideo.scss'
import {message,Avatar } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone,LoadingOutlined} from '@ant-design/icons';
import {useSelector,useDispatch} from "react-redux";
import Hooks from "../utils/hooks";
import {DraggerUpload} from "./DraggerUpload";
import moment from "moment";
import useCopy from '@react-hook/copy'
import {setFormDirectLiveConstraintDataOnchange} from '../store/formDirectVideoAction'
import { useTranslation } from 'react-i18next';
import defaultThumb from "../../assets/webinarplease-thumb.jpg";
import {ShowVideosReducerReducer} from "../../showVideos/store/showVideosReducer";


export const Generals =()=>{

    const livePlanRef = useRef(null);
    const pwdShowRef = useRef(null);
    const idLive = localStorage.getItem('idLive')?localStorage.getItem('idLive'):'';

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const disableSwitch = useSelector((state)=> state.ShowVideosReducerReducer.paginationProps)
    const { t, i18n } = useTranslation();
    const requiredFieldRule = [{required: true, message: t('forgetPassword.FieldsRequired')}];
     console.log('hshshshshshsh45654654',disableSwitch.statusLive)
    const isValidPassword = () => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()^_!"#$%&'*+£,-./:;{}<>=|~?·•¯‾|¦‌‍†‡§¶©®™&@/♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫])[A-Za-z\d@$!%*?&()^_`!"#$%&'*+£,-./:;{}<>=|~?·•¯‾_ |¦‌‍†‡§¶©®™&@/♠♣♥♦←↑→↓↔áÁâÂàÀåÅãÃäÄæÆçÇéÉêÊèÈëËíÍîÎìÌïÏñÑóÓôÔòÒøØõÕöÖœŒšŠßðÐÞúÚûÛùÙüÜýÝÿŸ¤€$¢£¥ƒαΑβΒγΓδΔεΕζΖηΗθΘιΙκΚλΛμΜνΝξΞοΟπΠρΡσςΣτΤυΥφΦχΧψΨωΩ°µ < >≤≥=≈≠≡±−+×÷⁄%‰¼½¾¹²³ºªƒ″∂∏∑√∞¬∩∫]{8,}$/.test(values.general.pwd)
    }
    const {generalOnChangeByName,generalOnChange,generalOnChangeButton,startGetDisabledMinutes,startGetDisabledHours,disablePastDate,values,scrollToRef}= Hooks(form)

    const {copy} = useCopy(
        values.general.liveLink+"/"+values.general.liveTitle
    )

    const copySuccess =async ()=>
    {
          dispatch(setFormDirectLiveConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        await copy()
        values.constraintData.leaveToast&&await message.success({
            content: i18n.t('formDirectVideo.SuccessCopyMsg'),
            duration: 2,
            style: {
                marginTop: '2vh',
            },
        })
            .then(async () =>
                 dispatch(setFormDirectLiveConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )
    }

    useEffect(() => {
        values.constraintData.scrollIntoView&&disableSwitch.statusLive === -1 &&values.general.liveAction &&scrollToRef(livePlanRef)
    }, [values.general.liveAction]);

    useEffect(() => {
        values.constraintData.scrollIntoView&&values.general.directAccessMode === "liveAccess" &&scrollToRef(pwdShowRef)
    }, [values.general.directAccessMode]);

    // useEffect(() => {
    //     return () => {
    //         dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"scrollIntoView",constraintDataValueChange:false}))
    //     }
    // }, []);

    return(
        <Row gutter={[0, 30]} className={"row_general"}>
            <Col span={24} className={"col-forms"}>
                <span style={{textAlign:'left',fontSize:"20px", fontFamily: "SF Pro Display",fontWeight: "normal" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.GeneralSettings")}</span>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.AddLabel")}</span>
                    </Col>
                    <Col className="col-upload-square">
                        <Avatar className={"col-upload-square--avatar"} shape="square" style={{
                            background: darkMode === false ? "RGB(231, 247, 255)" : "#141414",
                            border: darkMode === false ? "1px solid RGB(231, 247, 255)" : "1px solid rgba(255, 255, 255, 0.15)",
                            color: darkMode === false ? "RGB(0, 127, 203)" : "rgba(255, 255, 255, 0.85)"
                        }}
                                src={values.loading?<LoadingOutlined style={{ fontSize: 50,marginTop:"50px" }}/>:values.general.fileList && values.general.fileList.length ?
                                    values.general.fileList[0].thumbUrl :defaultThumb}

                        />
                        {console.log("values.general.fileList",values.general.fileList[0])}
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
                        <span style={{fontSize:"14px",fontWeight: "500",color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.LiveTitle")}</span>
                        <span className="require">*</span>
                    </Col>
                    <Col span={24} className={"col-forms"}>
                        <Form.Item name="liveTitle" className={"form-item-style"}
                                   rules={requiredFieldRule}
                        >
                            <Input autocomplete="off" maxLength={100} name="liveTitle" onChange={generalOnChange} placeholder={t("formDirectVideo.VideoTitle")}></Input>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[0, 10]} >
                    <Col className={"col-forms"} span={24}>
                        <span style={{fontSize:"14px",fontWeight: "500",color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.LiveFeedDescription")}</span>
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
                        <span style={{fontSize:"14px",fontWeight: "500",color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ShareLiveLink")}</span>
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
                            <Switch  checked={disableSwitch.statusLive === 1 || disableSwitch.statusLive === 0 ? false : values.general.liveAction} name="liveAction" value="liveAction"
                                    onChange={(checked, event) => {
                                        generalOnChangeByName(checked, checked, "liveAction")
                                    }}/>

                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            {disableSwitch.statusLive === -1  && values.general.liveAction &&
            <Col span={24} ref={livePlanRef}>
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

                            <DatePicker getPopupContainer={() => document.querySelector(".DatePickerGeneral")} className={"DatePickerGeneral"} initialValues={values.general.startHour && moment(values.general.startHour, 'YYYY-MM-DD')}
                                        disabledDate={(current)=>disablePastDate(current)} placeholder={t("formDirectVideo.ChooseStartDate")} onChange={(value,event)=>{generalOnChangeByName(value,event,"startDate")}} name="startDate"style={{width: "100%"}}></DatePicker>

                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item  name="startHour" className={"form-item-style"}
                                    rules={requiredFieldRule}
                        >
                            <TimePicker getPopupContainer={() => document.querySelector(".timePicker1")} className={"timePicker1"} placeholder={t("formDirectVideo.ChooseStartTime")} name="startHour" onChange={(value,event)=>{generalOnChangeByName(value,event,"startHour")}}  style={{width: "100%"}}
                                        disabledHours={()=>startGetDisabledHours(values)}
                                        disabledMinutes={startGetDisabledMinutes}
                                        format = {'HH:mm'}
                            ></TimePicker>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="period" className={"form-item-style"}
                        >
                            <TimePicker getPopupContainer={() => document.querySelector(".timePicker2")} className={"timePicker2"} placeholder={t("formDirectVideo.ChooseTimeFrame")} name="period" onChange={(value,event)=>{generalOnChangeByName(value,event,"period")}}  style={{width: "100%"}}></TimePicker>
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
                            <Col offset={3} span={21} ref={pwdShowRef}>
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
