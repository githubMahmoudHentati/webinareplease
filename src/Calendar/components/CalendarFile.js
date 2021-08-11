import React, {useState, useEffect} from 'react';
import "../Calendar.scss";
import {ConfigProvider} from 'antd';
import {useSelector} from "react-redux";
import CalendarEvents from "./CalendarEvents";
import GetCalendar from "./GetCalendar";
import HooksCalendar from '../utils/hooks.js'
import useWindowDimensions from "../../utils/components/getWindowDimensions";

import CalendarModal from "./CalendarModal";
export function CalendarFile() {
    const {activeCalendarEvents, calendarEvent, calendarValues, GetCalendarDataNow,
        handleDelete, handleStatusEvents, handleCancel } = HooksCalendar();
    const calendarProps = useSelector((state) => state.CalendarReducer)
    const CalendarReducer = useSelector((state) => state.CalendarReducer);
    let modalInfo=CalendarReducer.calendarInfo.info;
    var  x  = useWindowDimensions();
    return (
        <div className={"CalendarFile"}>
            {
                x.matches &&
                calendarProps.calendar.activeCalendar &&
                <CalendarEvents calendarEvent={calendarEvent} calendarValues={calendarValues}
                                GetCalendarDataNow={GetCalendarDataNow}/>
            }
            <div className={ "CalendarFile__list " + ( !x.matches || (x.matches && !calendarProps.calendar.activeCalendar ) ? '' : 'hidden-calendar')}>
                <GetCalendar  />
            </div>

            {
                  <CalendarModal handleCancel={handleCancel}
                               visible={CalendarReducer.calendarVisible.visible}
                               modalInfo={modalInfo}
                               handleDelete={()=>handleDelete(modalInfo.id)}
                               handleStatusEvents={()=>handleStatusEvents(modalInfo)}
                ></CalendarModal>
            }
        </div>
    );
}
