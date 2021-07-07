import React, { useState,useEffect,useRef } from 'react';

export const CalendarConstraints = ()=>{

    const calendar = () => {
        return (
            {
                activeCalendar:false,
            }
        )
    }
    return({
        calendar
    })

}