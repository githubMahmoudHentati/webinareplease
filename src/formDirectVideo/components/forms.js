import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../formDirectVideo.scss'
import {MailOutlined} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const Forms =()=>{
    const { TabPane } = Tabs;
    const { t, i18n } = useTranslation();

    return (
        <Row>
            <Col span={24}>
                <Menu
                    style={{width:'100%',height:"100%"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                >

                    <div className={"titre-menu"}>
                        <span
                            style={{
                                fontSize: "14px",
                                color: "RGBA(0, 0, 0, 0.85)",
                                textAlign: "left",
                                fontFamily: "Ping Fang SC",
                                fontWeight: "bold"
                            }}>
                            {t("formDirectVideo.Paramètres généraux")}
                        </span>

                    </div>

                    <Menu.Item key="1">
                        {t("formDirectVideo.Géneral")}
                    </Menu.Item>
                    <div className={"titre-menu"}>
                    <span style={{
                        fontSize: "14px",
                        color: "RGBA(0, 0, 0, 0.85)",
                        textAlign: "left",
                        fontFamily: "Ping Fang SC",
                        fontWeight: "bold"
                    }}>{t("formDirectVideo.Paramètres généraux")}</span>
                    </div>
                    <Menu.Item key="2">
                        {t("formDirectVideo.Configuration")}
                    </Menu.Item>

                    <Menu.Item key="3">
                        {t("formDirectVideo.Invitations")}
                    </Menu.Item>

                    <Menu.Item key="4">
                        {t("formDirectVideo.Outils social")}
                    </Menu.Item>

                    <Menu.Item key="5">
                        {t("formDirectVideo.Templetes")}
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


