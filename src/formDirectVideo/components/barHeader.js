import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {ArrowLeftOutlined,CloseOutlined,CheckOutlined,VideoCameraOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Hooks} from "../utils/hooks";

export const BarHeader =()=>{
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const history = useHistory()
    const {values}=Hooks()

    return(
        <Row style={{width: "100%"}} justify={"space-between"}>
            <Col>
                <Row gutter={[15, 0]}>
                    <Col style={{display: "flex", alignItems: "center"}}>
                        <ArrowLeftOutlined
                            onClick={() => {
                                history.push("/showVideos")
                            }}
                            style={{
                                fontSize: 'medium',
                                cursor: 'medium',
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                            }}
                        />
                    </Col>
                    <Col>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                            fontSize: "medium",
                            fontFamily: "Arial, Helvetica, sans-serif;",
                                        }}> Ajouter un direct
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row gutter={[15, 0]}>
                    <Col>
                        <Button style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" , background:darkMode===false?"":"rgba(255, 255, 255, 0.04)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} icon={<CloseOutlined />}> annuler</Button>
                    </Col>
                    <Col>
                        <Button style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",background:darkMode===false?"":"rgba(255, 255, 255, 0.04)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} icon={values.general.directPlan?<VideoCameraOutlined />:<CheckOutlined />} type={"primary"}>{values.general.directPlan?<span>Diffuser</span>:<span>Valider</span>}</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}