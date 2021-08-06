import React  from 'react'
import CalendarModal from "./CalendarModal";
import {Calendar} from 'antd';
import {useSelector} from "react-redux";

import HooksCalendar from "../utils/hooks";

const GetCalendar=()=>{
    const VisibleModal = useSelector((state) => state.CalendarReducer);
    const { DateCellRender, monthCellRender, OnPanelChange, modalInfo,
        handleDelete, handleStatusEvents, handleCancel, } = HooksCalendar()
    return <>
        <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                  onPanelChange={OnPanelChange}/>;
        <CalendarModal handleCancel={handleCancel}
                       visible={VisibleModal.calendarVisible.visible}
                       modalInfo={modalInfo}
                       handleDelete={()=>handleDelete(modalInfo.id)}
                       handleStatusEvents={()=>handleStatusEvents(modalInfo)}
        ></CalendarModal>
    </>
}

export default GetCalendar