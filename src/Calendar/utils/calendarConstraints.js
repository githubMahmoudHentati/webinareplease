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
        loadingDeleteShowVideo
    })

}