import React, {useEffect} from 'react';
import {Breadcrumb,Alert} from "antd";
import {ArrowLeftOutlined, HomeOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import { useSelector} from "react-redux";
import "../Calendar.scss"
import { useTranslation } from 'react-i18next';
import HooksCalendar from "../utils/hooks";


function HeaderCalendar() {

    const history = useHistory();
    // use Selector redux

    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    // use Selector redux
    const conditions = useSelector((state) => state.ShowVideosReducerReducer.showdivscondition)

    const {t} = useTranslation();
    // handle click arrow calendar
    const {handleClickArrowCalendar,handleClickAnnulerAlert} = HooksCalendar()

    const stickyElm = document.querySelector('.MesDirects-sticky')
    const rootEl = document.querySelector('.App')
    // const observer = new IntersectionObserver(
    //     ([e]) => rootEl.classList.toggle('is-pinned', e.intersectionRatio < 1),
    //     {threshold: [1]}
    // );
    //
    // useEffect(() => {
    //     if(stickyElm) {
    //         // debugger
    //         observer.observe(stickyElm)
    //     }
    // }, );

    return (
        <div>

            <div className="BreadcrumbDiv">
                <Breadcrumb style={{
                    color: darkMode === false ? "" : "#ffffff",
                    fontSize: "14px",
                    fontFamily: "SF Pro Display",
                    fontWeight: "normal"
                }}>
                    <Breadcrumb.Item href="" style={{color: darkMode === false ? "" : "#ffffff"}} onClick={() => {
                        history.push("/")
                    }}>
                        <HomeOutlined className={"home_icon"} />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{color: darkMode === false ? "" : "#ffffff"}}>{t("Calendar.Calendar")}</Breadcrumb.Item>
                </Breadcrumb>

            </div>
            {/*./Breadcrumb*/}
            <div className={"MesDirects-sticky"}>
                <div className={`MesDirects ${!darkMode ? "light" : "dark"}`}>
                    <div className={"div_retour"}><ArrowLeftOutlined style={{color: darkMode === false ? "" : "white"}}
                                                                     className={"arrow"}
                                                                     onClick={handleClickArrowCalendar}/> <h4
                        style={{color: darkMode === false ? "" : "white"}}
                        className={"h4"}>{t("Calendar.Calendar")}</h4></div>
                </div>
            </div>
            {/*./TousMedia*/}

            {
                conditions.clickDeleteIcon === false
                    ?
                    <div className="div_alert">
                        <Alert
                            id="ant-alert"
                            message={t("ShowVideo.DeleteSelectedItem")}
                            banner
                            action={
                                <a href="#/" disabled={conditions.rubDeleteItems===true}  className="btn_annuler" size="small" type="text" onClick={handleClickAnnulerAlert}>
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
