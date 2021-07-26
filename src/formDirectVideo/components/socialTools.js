import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Switch,List,DatePicker,Button} from 'antd'
import {DownOutlined,CloseOutlined,PlusOutlined,TwitterOutlined,InstagramOutlined} from '@ant-design/icons';
import empreint from "../../assets/logo-empreinte.svg"
import fb from "../../assets/fb.svg"
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {useDispatch, useSelector} from "react-redux";
import{Hooks} from "../utils/hooks";
import {setActivePlan, setActivePost, setAddPlan, setClosePlan} from "../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';


export const SocialTools=()=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values}=Hooks()
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
                    {t("formDirectVideo.Envoi des publications sur les réseaux sociaux")}
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
                                                    <span className={"spn_planification"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.Planifier  la publication")}</span>
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
                                                                                        <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}> {t("formDirectVideo.Planification")} {indexPlan +1}</span>
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
                                                                                <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.Date de début")}</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker style={{width: "100%"}}/>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    }
                                                                    {element.active &&
                                                                    <Col span={24}>
                                                                        <Row gutter={[0, 10]}>
                                                                            <Col span={24}>
                                                                                <span className={"spn-planification"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.Date de fin")}</span>
                                                                            </Col>
                                                                            <Col span={24}>
                                                                                <DatePicker style={{width: "100%"}}/>
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
                                                        {t("formDirectVideo.Ajouter une planification")}
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
                                                                }}>{t("formDirectVideo.Environ 1mn")}</span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col>
                                                            {item.logo}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col span={24} className={"col_texte_empreinte"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                                    Torquem detrexit hosti exercirlus quid ex ea voluptate et accurate
                                                    disseredum.
                                                </Col>
                                                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                                                    <img
                                                        src={"//test-tv.webtv-solution.com/web/data/vignettes/logoSAB2NjY3ZTg5MmItNGI0MS00YjIyLTgwZGYtNmNkY2NjZTRhZTVishutterstock562442005.jpg"}
                                                        style={{height: "100%", width: "100%"}}/>
                                                </Col>
                                                <Col span={24}>
                                                    <span className={"FundamentalsofWebinar"} style={{
                                                        color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                                    }}>{t("formDirectVideo.Fundamentals of Webinar")}</span><br/>
                                                    <span className={"Empriente.com"} style={{
                                                        color:darkMode===false?"RGBA(0, 0, 0, 0.25)":"rgba(255, 255, 255, 0.85)"
                                                    }}>Empriente.com</span>
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