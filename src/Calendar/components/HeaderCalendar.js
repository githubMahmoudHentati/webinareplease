import React, {useState, useEffect} from 'react';
import {Breadcrumb, Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "../Calendar.scss"
import {CalendarReducer} from "../store/calendarReducer";
import Calendar from "../Calendar";
import {setCalendarOnchange} from "../store/calendarAction";
import { useTranslation } from 'react-i18next';

let x = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width


function HeaderCalendar() {
    const dispatch = useDispatch()
    const history = useHistory();
    // use Selector redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    // use Selector redux
    const calendarProps = useSelector((state) => state.CalendarReducer)

    console.log("calendarProps", calendarProps)
    const {t, i18n} = useTranslation();
    // handle click arrow calendar
    const handleClickArrowCalendar = () => {
        if (x.matches && calendarProps.calendar.activeCalendar === true) {
            dispatch(setCalendarOnchange({
                CalendarNameChange: "activeCalendar",
                CalendarValueChange: false
            }))
        } else {
            history.push('/showVideos')
        }

    }

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
                        <span>{t("calendrier.Acceuil")}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="" style={{color: darkMode === false ? "" : "#ffffff"}} onClick={() => {
                        history.push("/")
                    }}>
                        <span>{t("calendrier.direct")}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{color: darkMode === false ? "" : "#ffffff"}}>{t("calendrier.calendrier")}</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            {/*./Breadcrumb*/}

            <div className="MesDirectsHeaderCalendrier"
                 style={{backgroundColor: darkMode === false ? "RGBA(0, 0, 0, 0.04)" : "#1D1D1D"}}>
                <div className={"div_retour"}><ArrowLeftOutlined style={{color: darkMode === false ? "" : "white"}}
                                                                 className={"arrow"}
                                                                 onClick={() => handleClickArrowCalendar()}/> <h4
                    style={{color: darkMode === false ? "" : "white"}} className={"h4"}>{t("calendrier.calendrier")}</h4></div>
            </div>
            {/*./TousMedia*/}

        </div>
    );
}

export default HeaderCalendar;
