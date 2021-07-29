import React, {useState, useEffect, useRef} from 'react';
import {Row, Col, Input, Button, Card, Tabs, Breadcrumb, Menu} from 'antd'
import '../formDirectVideo.scss'
import {ArrowLeftOutlined, CloseOutlined, CheckOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Hooks} from "../utils/hooks";
import {setDirectSetting} from "../../utils/redux/actions";
import {useTranslation} from 'react-i18next';

export const BarHeader = () => {
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const directMenu = useSelector((state) => state.Reducer.directMenu)
    const history = useHistory()
    const {values, matchesMedia} = Hooks()
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation();

    return (
        <Row style={{width: "100%"}} justify={"space-between"}>
            <Col>
                <Row gutter={[15, 0]}>
                    <Col style={{display: "flex", alignItems: "center"}}>
                        <ArrowLeftOutlined
                            onClick={() => {
                                if (matchesMedia.matches) {
                                    dispatch(setDirectSetting(5))
                                    if (directMenu === 5) {
                                        history.push("/showVideos")
                                    }
                                } else {
                                    history.push("/showVideos")
                                }
                            }}
                            style={{
                                fontSize: '17px',
                                cursor: 'medium',
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"
                            }}
                        />
                    </Col>
                    <Col>
                        <span style={{
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                            fontSize: "20px",
                            fontFamily: "SF Pro Display",
                            fontWeight: "500"
                        }}> {
                            matchesMedia.matches && directMenu === 5
                                ?
                                <span>{t("formDirectVideo.AddLive")}</span>
                                :
                                matchesMedia.matches && directMenu === 0
                                    ?
                                    <span>{t("formDirectVideo.General")}</span>
                                    :
                                    matchesMedia.matches && directMenu === 1
                                        ?
                                        <span>{t("formDirectVideo.Configuration")}</span>
                                        :
                                        matchesMedia.matches && directMenu === 2
                                            ?
                                            <span>{t("formDirectVideo.Invitations")}</span>
                                            :
                                            matchesMedia.matches && directMenu === 3
                                                ?
                                                <span>{t("formDirectVideo.SocialTools")}</span>
                                                :
                                                matchesMedia.matches && directMenu === 4
                                                    ?
                                                    <span>{t("formDirectVideo.Templetes")}</span>
                                                    :
                                                    <span>{t("formDirectVideo.AddLive")}</span>

                        }
                        </span>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row gutter={[15, 0]}>
                    <Col>
                        <Button onClick={() => {
                            history.push("/showVideos")
                        }} className={"btn_add_live"} style={{
                            fontFamily: "SF Pro Display",
                            fontWeight: "normal",
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                            background: darkMode === false ? "" : "rgba(255, 255, 255, 0.04)",
                            border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                        }} icon={<CloseOutlined className={"icon_add_live"}/>}> <span
                            className={"spn_add_live"}>{t("formDirectVideo.Cancel")}</span></Button>
                    </Col>
                    <Col>
                        <Button className={"btn_add_live"} htmlType="submit" style={{
                            fontFamily: "SF Pro Display",
                            fontWeight: "normal",
                            color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                            background: darkMode === false ? "" : "rgba(255, 255, 255, 0.04)",
                            border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                        }} icon={values.general.directPlan ? <CheckOutlined/> : <VideoCameraOutlined/>}
                                type={"primary"}>{values.general.directPlan ?
                            <span className={"spn_add_live"}>{t("formDirectVideo.Confirm")}</span> :
                            <span className={"spn_add_live"}>{t("formDirectVideo.Diffuser")}</span>}</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}