import React  from 'react'
import CalendarModal from "./CalendarModal";
import {Calendar} from 'antd';
import {useSelector} from "react-redux";

import HooksCalendar from "../utils/hooks";

const GetCalendar=()=>{
    const CalendarReducer = useSelector((state) => state.CalendarReducer);
    let modalInfo=CalendarReducer.calendarInfo.info;
    const { DateCellRender, monthCellRender, OnPanelChange,
        handleDelete, handleStatusEvents, handleCancel, } = HooksCalendar()
    return <>
        <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                  onPanelChange={OnPanelChange}/>;
        <CalendarModal handleCancel={handleCancel}
                       visible={CalendarReducer.calendarVisible.visible}
                       modalInfo={modalInfo}
                       handleDelete={()=>handleDelete(modalInfo.id)}
                       handleStatusEvents={()=>handleStatusEvents(modalInfo)}
        ></CalendarModal>
    </>
}

export default GetCalendar