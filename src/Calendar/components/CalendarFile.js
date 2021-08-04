import React, {useState, useEffect} from 'react';
import "../Calendar.scss";
import {Calendar} from 'antd';
import {useSelector} from "react-redux";
import CalendarEvents from "./CalendarEvents";
import HooksCalendar from '../utils/hooks.js'
import {Hooks} from '../../showVideos/utils/hooks.js'
import CalendarModal from "./CalendarModal";

let x = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width

export function CalendarFile() {
    const {activeCalendarEvents,calendarEvent,
        calendarValues, DateCellRender, monthCellRender,
        OnPanelChange, handleCancel, handleDelete, modalInfo, handleStatusEvents, GetCalendarDataNow}
        = HooksCalendar();
    const calendarProps = useSelector((state) => state.CalendarReducer)
    const VisibleModal = useSelector((state) => state.CalendarReducer);
    console.log("VisibleModal", VisibleModal)
    //show Modal

    return (
        <div className={"CalendarFile"}>
            {
                x.matches ?
                    activeCalendarEvents && calendarProps.calendar.activeCalendar ?
                        <CalendarEvents calendarEvent={calendarEvent} calendarValues={calendarValues}
                                        GetCalendarDataNow={GetCalendarDataNow}/>
                        :
                        <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                                  onPanelChange={OnPanelChange}/>
                    :
                    <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                              onPanelChange={OnPanelChange}/>
            }
            <CalendarModal handleCancel={handleCancel}
                           visible={VisibleModal.calendarVisible.visible}
                           modalInfo={modalInfo}
                           handleDelete={handleDelete}
                           handleStatusEvents={handleStatusEvents}
            ></CalendarModal>
        </div>
    );
}
