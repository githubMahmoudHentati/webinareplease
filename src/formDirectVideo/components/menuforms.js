import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {MailOutlined} from '@ant-design/icons';
import {setDirectSetting} from "../../utils/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

export const MenuForms =()=>{
    const dispatch = useDispatch()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const selectedkey = useSelector((state)=> state.Reducer.directMenu)
    const { t, i18n } = useTranslation();

    return (
        <Row className={"row_menu"}>
            <Col span={24} >
                <Menu
                    style={{width:'100%',height:"100%" , backgroundColor:darkMode===false?"":"#141414" , borderRight:darkMode===false?"":"2px solid #1D1D1D"}}
                    defaultSelectedKeys={[selectedkey===0?'1':selectedkey===1?'2':selectedkey===2?'3':selectedkey===3?'4':selectedkey===4?'5':'']}
                    defaultOpenKeys={['sub1']}
                    className="TabMenuForm"
                >

                    <div className={"titre-menu"}>
                        <span
                            style={{
                                color:darkMode===false?"RGBA(0, 0, 0, 0.85)":"rgba(255, 255, 255, 0.85)",
                                fontSize: "14px",
                                textAlign: "left",
                                fontFamily: "SF Pro Display",
                                fontWeight: "500"

                            }}>
                            {t("formDirectVideo.GeneralSettings")}
                        </span>

                    </div>

                    <Menu.Item className={"menuItem itemMenu"} onClick={()=>{dispatch(setDirectSetting(0))}} key="1">
                        {t("formDirectVideo.General")}
                    </Menu.Item>
                    <div className={"titre-menu"}>
                    <span style={{
                        color:darkMode===false?"RGBA(0, 0, 0, 0.85)":"rgba(255, 255, 255, 0.85)",
                        fontSize: "14px",
                        textAlign: "left",
                        fontFamily: "SF Pro Display",
                        fontWeight: "500"
                    }}>{t("formDirectVideo.OptionalSettings")}</span>
                    </div>
                    <Menu.Item className={"menuItem itemMenu"} onClick={()=>{dispatch(setDirectSetting(1))}} key="2">
                        {t("formDirectVideo.Configuration")}
                    </Menu.Item>

                    <Menu.Item className={"menuItem itemMenu"} onClick={()=>{dispatch(setDirectSetting(2))}} key="3">
                        {t("formDirectVideo.Invitations")}
                    </Menu.Item>

                    <Menu.Item className={"menuItem itemMenu"} onClick={()=>{dispatch(setDirectSetting(3))}} key="4">
                        {t("formDirectVideo.SocialTools")}
                    </Menu.Item>

                    <Menu.Item className={"menuItem itemMenu"} onClick={()=>{dispatch(setDirectSetting(4))}} key="5">
                        {t("formDirectVideo.Templates")}
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


