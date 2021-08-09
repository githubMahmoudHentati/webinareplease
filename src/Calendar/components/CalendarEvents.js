import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Badge, Tag} from "antd";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import CalendarModal from "./CalendarModal";
import HooksCalendar from "../utils/hooks";

function CalendarEvents({ calendarValues , GetCalendarDataNow}) {
    const CalendarReducer = useSelector((state) => state.CalendarReducer);
    let calenderEventClick = CalendarReducer.calendar.activeCalendarEvents;
    let modalInfo=CalendarReducer.calendarInfo.info;
    let calendarCompareMoment =  calendarValues.map(item => moment(item.date.date).isSame(calenderEventClick , 'day'))
    const {handleDelete, handleStatusEvents, handleCancel, onShowModal, getListData, DateCellRender} = HooksCalendar()
    const getFormatCalendar = () =>{
        if(calenderEventClick) return calenderEventClick.format('DD / MM / YYYY')
        else return ''
    }
    return(
        <div className={"div_global_calendar"}>
            <span className={"spn_Date_event"}>{getFormatCalendar()}</span>
            {
                DateCellRender(calenderEventClick, calendarCompareMoment)
            }
            <CalendarModal handleCancel={handleCancel}
                           visible={CalendarReducer.calendarVisible.visible}
                           modalInfo={modalInfo}
                           handleDelete={()=>handleDelete(modalInfo.id)}
                           handleStatusEvents={()=>handleStatusEvents(modalInfo)}
            ></CalendarModal>

        </div>
    )
}

export default CalendarEvents;
