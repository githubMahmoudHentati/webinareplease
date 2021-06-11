import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {ArrowLeftOutlined,CloseOutlined,CheckOutlined,VideoCameraOutlined} from '@ant-design/icons';
import history from '../../router/history';
import {MenuForms} from './menuforms'
import {Generals} from "./general";
import {Configuration} from "./configuration";
import Invitation from "./Invitation";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {SocialTools} from "./socialTools";
import {Templetes} from "./Templetes";
import {setDarkMode} from "../../utils/redux/actions";
import {Hooks} from "../utils/hooks";


export const IframeDirectVideo =()=>{
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    const history = useHistory()
    const dispatch = useDispatch()

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    let {values}=Hooks()


    const SelectMenu = ()=>{
        switch(directMenu){
            case 0:
                return <Generals/>
            case 1:
                console.log("darkModeFormVideo",darkMode)
                return <Configuration/>
            case 2:
                return <Invitation/>
            case 3:
                return <SocialTools/>
            case 4:
                return <Templetes/>
            default:
                return <Generals/>
        }
    }
    return(
        <div>
                <Row gutter={[0, 40]}>
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize:"14px"}} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                <span >Accueil</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                                <span>Direct</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Ajouter un direct</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col span={24} className={"title-col"} style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
                        <Row style={{width:"100%"}}justify={"space-between"}>
                            <Col span={8}>
                                <Row gutter={[15, 0]}>
                                    <Col style={{display: "flex", alignItems: "center", }}>
                                        <ArrowLeftOutlined
                                            onClick={()=>{history.push("/showVideos")}}
                                            style={{fontSize: 'medium', cursor: 'medium' , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}
                                        />
                                    </Col>
                                    <Col>
                                        <span style={{
                                            color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",
                                            fontSize: "medium",
                                            fontFamily: "Arial, Helvetica, sans-serif;",
                                        }}> Ajouter un direct
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col >
                                <Row gutter={[15, 0]}>
                                    <Col>
                                        <Button icon={<CloseOutlined />}> annuler</Button>
                                    </Col>
                                    <Col>
                                        <Button icon={values.general.directPlan?<VideoCameraOutlined />:<CheckOutlined />} type={"primary"}>{values.general.directPlan?<span>Diffuser</span>:<span>Valider</span>}</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[30, 20]}>
                            <Col span={4}>
                                <MenuForms />
                            </Col>
                            <Col span={12}>
                                <SelectMenu />
                            </Col>
                        </Row>
                    </Col>
                </Row>
        </div>
    )
}