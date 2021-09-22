import React, { useState} from 'react';
import {Row, Col} from 'antd'
import '../formDirectVideo.scss'

import {MenuForms} from './menuforms'
import {Generals} from "./general";
import {Configuration} from "./configuration";
import Invitation from "./Invitation";
import { useSelector} from "react-redux";

import {SocialTools} from "./socialTools";
import {Templetes} from "./Templetes";
import {LiveSubmit} from "./liveSubmit.js";
import useWindowDimensions from "../../utils/components/getWindowDimensions";

export const IframeDirectVideo =()=>{
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    let matchesMedia = useWindowDimensions()  // fonction js pour afficher interface seulement en 767px de width
    const [formLive, setFormLive] = useState([]);
    const setFormLiveAction=(e)=>{
        setFormLive(e)
    }
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
                                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 15}} lg={{span:12}} >
                                                <SelectMenu formLive={formLive}/>
                                            </Col>
                                      : //matchesMedia.matches
                                   <Row gutter={[50, 20]}>
                                       <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 7}} lg={{span:5}} >
                                           <MenuForms />
                                       </Col>
                                       {directMenu===4?
                                           <Col xs={{ span: 24}} sm={{ span: 24}} md={{ span: 17}} lg={{span:19}}  >
                                               <SelectMenu formLive={formLive}/>
                                           </Col>:
                                           <Col  span={12} >
                                           <SelectMenu formLive={formLive}/>
                                           </Col>
                                       }
                                   </Row>
                            }
                    </Col>
        </LiveSubmit>
    )
}