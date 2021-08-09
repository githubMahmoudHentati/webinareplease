import React, {useState, useEffect} from 'react';
import "../Calendar.scss";
import {Calendar} from 'antd';
import {useSelector} from "react-redux";
import CalendarEvents from "./CalendarEvents";
import GetCalendar from "./GetCalendar";
import HooksCalendar from '../utils/hooks.js'
import useWindowDimensions from "../../utils/components/getWindowDimensions";

export function CalendarFile() {
    const {activeCalendarEvents, calendarEvent, calendarValues, GetCalendarDataNow} = HooksCalendar();
    const calendarProps = useSelector((state) => state.CalendarReducer)
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
        </div>
    );
}
