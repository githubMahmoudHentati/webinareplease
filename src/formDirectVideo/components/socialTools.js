import React from 'react';
import {Row,Col,Switch,List,DatePicker,Button} from 'antd'
import {DownOutlined,CloseOutlined,PlusOutlined} from '@ant-design/icons';
import empreint from "../../assets/logo-empreinte.svg"
import {useDispatch, useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import moment from "moment";
import {
    setActivePlan,
    setActivePost,
    setAddPlan,
    setClosePlan,
    setDatePlan,
    setDatePlanByPost
} from "../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';
import defaultImg from '../../assets/webinarplease-thumb.jpg'


export const SocialTools=()=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values,disablePastDate}=Hooks()
    const { t} = useTranslation();

    const addPlan =async (index)=>{
        dispatch(setAddPlan({addPlanIndex:index}))
    }
    const activePost=(checked,index)=>{
        dispatch(setActivePost({activePostChecked:checked,activePostIndex:index}))
        !checked && dispatch(setDatePlanByPost({dateIndexByPost:index}))

    }

    const activePlan=(indexPost,indexPlan)=>{
        dispatch(setActivePlan({indexPost,indexPlan}))
    }

    const closePlan =(indexPost,indexPlan)=>{
        dispatch(setClosePlan({closePlanIndexPost:indexPost,closePlanIndexPlan:indexPlan}))
    }

    const datePlan=(moment,indexPost,indexPlan,typeDate,dateValue)=>{
        dispatch(setDatePlan({dateIndexPost:indexPost,dateIndexPlan:indexPlan,typeDate:typeDate,dateValue:moment}))
    }

    return(
        <Row  gutter={[0, 0]}>
            <Col span={24}>
            </Col>
            <Col span={24} className={"col_socialMedia"}>
                <p style={{
                    color:darkMode===false?"":"rgba(255, 255, 255, 0.85"
                }}>
                    {t("formDirectVideo.PostingOnMedia")}
                </p>
                <List

                    dataSource={values.socialTools}
                    renderItem={(item,index) => (
                        <List.Item style={{width: "100%", display: "flex", flexDirection: "row"}}>
                            <Row gutter={[0, 20]} style={{width:"100%"}}>
                                <Col span={24} >
                                    <Row justify={"space-between"}>
                                        <Col span={12} className={"col-name-socialMedia"}>
                                            {item.logo}
                                            <span style={{
                                                marginLeft:"3%",
                                                color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                            }}>{item.type}</span>
                                        </Col>
                                        <Col>
                                            <Switch onChange={(checked)=>activePost(checked,index)} checked={item.switch}/>
                                        </Col>
                                    </Row>
                                </Col>
                                {item.switch === true &&
                                <Col style={{marginBottom: "2%"}} span={24}>
                                    <Row gutter={[0, 24]} justify={"space-between"}>
                                        <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:8}}>
                                            <Row gutter={[0, 20]}>
                                                <Col span={24}>
                                                    <span className={"spn_planification"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.PlanPublication")}</span>
                                                </Col>
                                                {values.socialTools[index].plan.map((element, indexPlan) => {
                                                        return (
                                                            <Col className={"col-planification"} span={24} style={{border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>
                                                                <Row gutter={[0, 2]}>
                                                                    <Col span={24}>
                                                                        <Row justify={"space-between"} className={"row_plannification_social"}>
                                                                            <Col span={12}>
                                                                                <Row>
                                                                                    <Col>
                                                                                        <DownOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{activePlan(index,indexPlan)}}/>
                                                                                    </Col>
                                                                                    <Col offset={2}>
                                                                                        <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}> {t("formDirectVideo.Planning")} {indexPlan +1}</span>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            <Col>
                                                                                <CloseOutlined onClick={()=>closePlan(index,indexPlan)} className={"close_icon_planification"}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    {element.active &&
                                                                    <Col span={24} className={"colDatePickerSocial"}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.StartingDate")}</span>
                                                                            </Col>
                                                                            <Col span={24}>

                                                                                <DatePicker getPopupContainer={() => document.querySelector(".datePicker1SocialTools")}  className={"datePicker1SocialTools"} defaultValue={element.startDate ? moment(element.startDate,'YYYY-MM-DD') : ''} style={{width: "100%"}}
                                                                                            disabledDate={(current)=>disablePastDate(current,index,indexPlan,"startDate")}
                                                                                            onChange={(moment,dateValue)=>{datePlan(moment,index,indexPlan,"startDate",dateValue)}}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    }
                                                                    {element.active &&
                                                                    <Col span={24} className={"colDatePickerSocial"}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.EndingDate")}</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker getPopupContainer={() => document.querySelector(".datePicker2SocialTools")} className={"datePicker2SocialTools"} defaultValue={element.endDate ? moment(element.endDate,'YYYY-MM-DD') : ''} style={{width: "100%"}}
                                                                                            disabledDate={(current)=>disablePastDate(current,index,indexPlan,"endDate")}
                                                                                            onChange={(moment,dateValue)=>{datePlan(moment,index,indexPlan,"endDate",dateValue)}}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    }
                                                                </Row>
                                                            </Col>
                                                        )
                                                    }
                                                )}
                                                <Col style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }} span={24} className={"col-planification_button"}>
                                                    <Button className={"btn_add_planning"}  style={{width:"100%" , background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" ,color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"dashed 1px rgba(255, 255, 255, 0.15)"}}  onClick={() => addPlan(index)} icon={<PlusOutlined/>}>
                                                        {t("formDirectVideo.AddingPlanning")}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 24}} lg={{span:14}}  style={{border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>
                                            <Row gutter={[0, 10]} style={{border: "1px solid RGBA(0, 0, 0, 0.15)", padding: "2%"}}>
                                                <Col span={24}>
                                                    <Row justify={"space-between"}>
                                                        <Col span={12}>
                                                            <Row justify={"start"}
                                                                 style={{display: "flex", alignItems: "center"}}>
                                                                <Col style={{background:darkMode===false?"":"rgba(255, 255, 255, 0.85)",padding:"5px",border:darkMode===false?" solid 1px rgba(0, 0, 0, 0.15)":" solid 1px rgba(255, 255, 255, 0.15)"}}>
                                                                    <img style={{width: "24px", height: "24px"}}
                                                                         src={empreint} alt={""}/>
                                                                </Col>
                                                                <Col offset={1} className={"col_Empreinte"}>
                                                                    <span className={"spn1"} style={{
                                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                                    }}>Empreinte.com</span><br/><span className={"spn2"} style={{
                                                                    color:darkMode===false?"rgba(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.25)"
                                                                }}>{t("formDirectVideo.AboutOneMn")}</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            {item.logo}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24} className={"col_texte_empreinte"}>
                                                    {values.general.liveDescription}
                                                </Col>
                                                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                                                    <img
                                                        src={values.general.fileList && values.general.fileList.length ?
                                                            values.general.fileList[0].thumbUrl : defaultImg }
                                                        style={{height: "100%", width: "100%"}} alt={""}/>
                                                </Col>
                                                <Col span={24}  className={"social-description"}>
                                                    <span className={"FundamentalsofWebinar social-description-text"} >{values.general.liveTitle ? values.general.liveTitle : t("formDirectVideo.BaseWebinaire")}</span><br/>
                                                    <span className={"social-description-text"} style={{
                                                        color:"var(--white_color)"
                                                    }}>{values.general.liveTitle ? values.general.liveLink+"/"+values.general.liveTitle : 'Empreinte.com'}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                }
                            </Row>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}