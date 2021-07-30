import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu, Form} from 'antd'
import '../formDirectVideo.scss'
import {ArrowLeftOutlined,CloseOutlined,CheckOutlined} from '@ant-design/icons';
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
import {LiveSubmit} from "./liveSubmit.js";
import { useTranslation } from 'react-i18next';


export const IframeDirectVideo =()=>{
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    let matchesMedia = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width
    const formPage= useSelector((state)=>state.ShowVideosReducerReducer.formPage);
    const [formLive, setFormLive] = useState([]);
    const setFormLiveAction=(e)=>{
        setFormLive(e)
    }
    console.log("directMenu",directMenu)
    const SelectMenu = ()=>{
        switch(directMenu){
            case 0:
                return <Generals/>
            case 1:
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
    const { t, i18n } = useTranslation();

    return(
        <LiveSubmit  setFormLiveAction={setFormLiveAction}>
                    <Col span={24}>
                            {
                               matchesMedia.matches
                                   ?
                                directMenu === 5
                                    ?
                                        <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 7}} lg={{span:4}}>
                                            <MenuForms />
                                        </Col>
                                     : //directMenu=5
                                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 15}} lg={{span:12}}>
                                                <SelectMenu formLive={formLive}/>
                                            </Col>
                                      : //matchesMedia.matches
                                   <Row gutter={[30, 20]}>
                                       <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 7}} lg={{span:4}}>
                                           <MenuForms />
                                       </Col>
                                       <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 15}} lg={{span:12}}>
                                           <SelectMenu formLive={formLive}/>
                                       </Col>
                                   </Row>
                            }
                    </Col>
        </LiveSubmit>
    )
}