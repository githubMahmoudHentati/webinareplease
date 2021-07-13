import React, { useState,useEffect,useRef } from 'react';

export const CalendarConstraints = ()=>{

    const calendar = () => {
        return (
            {
                activeCalendar:false,
            }
        )
    }
    const calendarVisibleModal = () => {
        return (
            {
                visible:false,
            }
        )
    }
    return({
        calendar,
        calendarVisibleModal
    })

}