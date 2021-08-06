import React, {useState, useEffect} from 'react';
import "../Calendar.scss";
import {Calendar} from 'antd';
import {useSelector} from "react-redux";
import CalendarEvents from "./CalendarEvents";
import GetCalendar from "./GetCalendar";
import HooksCalendar from '../utils/hooks.js'

let x = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width

export function CalendarFile() {
    const {activeCalendarEvents, calendarEvent, calendarValues, GetCalendarDataNow} = HooksCalendar();
    const calendarProps = useSelector((state) => state.CalendarReducer)
    return (
        <div className={"CalendarFile"}>
            {
                x.matches &&
                calendarProps.calendar.activeCalendar &&
                <CalendarEvents calendarEvent={calendarEvent} calendarValues={calendarValues}
                                GetCalendarDataNow={GetCalendarDataNow}/>
            }

            <div className={ ( !x.matches || (x.matches && ! calendarProps.calendar.activeCalendar ) ? '' : 'hidden-calendar')}>
                <GetCalendar  />
            </div>
        </div>
    );
}
