import React, { useState,useEffect,useRef } from 'react';

export const CalendarConstraints = ()=>{

    const calendar = () => {
        return (
            {
                activeCalendar:false,
                activeCalendarEvents:{},
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
    const calendarInfoModal = () => {
        return (
            {
                info:{},
            }
        )
    }
    const showDivsConditions = () =>{
        return({
            elementSelected: 0,
            clickDeleteIcon:true,
            showElementSelected:false,
            rubDeleteItems:false
        })
    }
    const loadingDeleteShowVideo =()=>{
        return({
            loadingDelete:false
        })
    }
    return({
        calendar,
        calendarVisibleModal,
        showDivsConditions,
        loadingDeleteShowVideo,
        calendarInfoModal
    })

}