import React, {useState, useEffect} from 'react';
import {Breadcrumb, Button,Alert} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "../Calendar.scss"
import {CalendarReducer} from "../store/calendarReducer";
import Calendar from "../Calendar";
import {setCalendarOnchange, setCalendarVisibleOnchange,setLoadingDeleteCalendarVideo,setShowDivsConditions} from "../store/calendarAction";
import { useTranslation } from 'react-i18next';
import Hooks from '../utils/hooks.js'
import HooksCalendar from "../utils/hooks";

let x = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width



function HeaderCalendar() {
    const dispatch = useDispatch()
    const history = useHistory();
    // use Selector redux
    const {itemsRunAPI}=Hooks();
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    // use Selector redux
    const calendarProps = useSelector((state) => state.CalendarReducer)
    const conditions = useSelector((state) => state.ShowVideosReducerReducer.showdivscondition)
    console.log("calendarProps", calendarProps)
    const {t, i18n} = useTranslation();
    // handle click arrow calendar
    const {handleClickArrowCalendar,handleClickAnnulerAlert} = HooksCalendar()
    return (
        <div className={"HeaderCalendar"}>

            <div className="BreadcrumbDivHeaderCalendrier">
                <Breadcrumb style={{
                    color: darkMode === false ? "" : "#ffffff",
                    fontSize: "14px",
                    fontFamily: "SF Pro Display",
                    fontWeight: "normal"
                }}>
                    <Breadcrumb.Item href="" style={{color: darkMode === false ? "" : "#ffffff"}} onClick={() => {
                        history.push("/")
                    }}>
                        <span>{t("Calendar.Home")}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="" style={{color: darkMode === false ? "" : "#ffffff"}} onClick={() => {
                        history.push("/")
                    }}>
                        <span>{t("Calendar.direct")}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{color: darkMode === false ? "" : "#ffffff"}}>{t("Calendar.Calendar")}</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            {/*./Breadcrumb*/}

            <div className="MesDirectsHeaderCalendrier"
                 style={{backgroundColor: darkMode === false ? "RGBA(0, 0, 0, 0.04)" : "#1D1D1D"}}>
                <div className={"div_retour"}><ArrowLeftOutlined style={{color: darkMode === false ? "" : "white"}}
                                                                 className={"arrow"}
                                                                 onClick={handleClickArrowCalendar}/> <h4
                    style={{color: darkMode === false ? "" : "white"}} className={"h4"}>{t("Calendar.Calendar")}</h4></div>
            </div>
            {/*./TousMedia*/}
            {console.log("conditions.clickDeleteIcon",conditions.clickDeleteIcon)}
            {
                conditions.clickDeleteIcon === false
                    ?
                    <div className="div_alert">
                        <Alert
                            id="ant-alert"
                            message={t("ShowVideo.DeleteSelectedItem")}
                            banner
                            action={
                                <a disabled={conditions.rubDeleteItems===true}  className="btn_annuler" size="small" type="text" onClick={handleClickAnnulerAlert}>
                                    {t("ShowVideo.Cancel")}
                                </a>
                            }
                        />
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default HeaderCalendar;
