import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Switch,List,DatePicker,Button} from 'antd'
import {DownOutlined,CloseOutlined,PlusOutlined,TwitterOutlined,InstagramOutlined} from '@ant-design/icons';
import empreint from "../../assets/logo-empreinte.svg"
import fb from "../../assets/fb.svg"
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {useDispatch, useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import moment from "moment";
import {setActivePlan, setActivePost, setAddPlan, setClosePlan} from "../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';
import defaultImg from '../../assets/webinarplease-thumb.jpg'


export const SocialTools=()=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values,disablePastDate}=Hooks()
    console.log("socialTools",values.socialTools)
    const { t, i18n } = useTranslation();

    const addPlan =async (index)=>{
        dispatch(setAddPlan({addPlanIndex:index}))
    }
    const activePost=(checked,index)=>{
        dispatch(setActivePost({activePostChecked:checked,activePostIndex:index}))
    }

    const activePlan=(indexPost,indexPlan)=>{
        dispatch(setActivePlan({indexPost,indexPlan}))
    }


    const closePlan =(indexPost,indexPlan)=>{
        dispatch(setClosePlan({closePlanIndexPost:indexPost,closePlanIndexPlan:indexPlan}))
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
                                                                <Row gutter={[0, 20]}>
                                                                    <Col span={24}>
                                                                        <Row justify={"space-between"}>
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
                                                                                <CloseOutlined onClick={()=>closePlan(index,indexPlan)}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>

                                                                    {element.active &&
                                                                    <Col span={24}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.EndingDate")}</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker disabledDate={disablePastDate} value={moment(element.endDate,'YYYY-MM-DD')} style={{width: "100%"}}/>

                                                                                <DatePicker defaultValue={element.endDate ? moment(element.endDate,'YYYY-MM-DD') : ''} style={{width: "100%"}}/>

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
                                                    border: "1px solid RGBA(0, 0, 0, 0.15)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }} span={24} className={"col-planification"}>
                                                    <Button  style={{width:"100%" , background:darkMode===false?"":"rgba(0, 0, 0, 0.04)" ,color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"solid 1px rgba(255, 255, 255, 0.15)"}}  onClick={() => addPlan(index)} icon={<PlusOutlined/>}>
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
                                                                         src={empreint}/>
                                                                </Col>
                                                                <Col offset={1} className={"col_Empreinte"}>
                                                                    <span className={"spn1"} style={{
                                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                                    }}>Empreinte</span><br/><span className={"spn2"} style={{
                                                                    color:darkMode===false?"RGBA(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85)"
                                                                }}>{t("formDirectVideo.AboutOneMn")}</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            {item.logo}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24} className={"col_texte_empreinte"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                                    {values.general.liveDescription}
                                                </Col>
                                                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                                                    {console.log("fileList social",values.general.fileList)}
                                                    <img
                                                        src={values.general.fileList && values.general.fileList.length ?
                                                            values.general.fileList[0].thumbUrl : defaultImg }
                                                        style={{height: "100%", width: "100%"}}/>
                                                </Col>
                                                <Col span={24} style={{  overflow: 'hidden', 'text-overflow': 'ellipsis'}}>
                                                    <span className={"FundamentalsofWebinar"} style={{
                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                    }}>{values.general.liveTitle ? values.general.liveTitle : t("formDirectVideo.BaseWebinaire")}</span><br/>
                                                    <span className={"Empriente.com"} style={{
                                                        color:darkMode===false?"RGBA(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85)"
                                                    }}>{values.general.liveTitle ? values.general.liveLink+"/"+values.general.liveTitle : 'Empriente.com'}</span>
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