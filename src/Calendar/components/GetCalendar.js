import React  from 'react'
import CalendarModal from "./CalendarModal";
import {Calendar,} from 'antd';
import {useSelector} from "react-redux";

import HooksCalendar from "../utils/hooks";

const GetCalendar=()=>{
    const { DateCellRender, monthCellRender, OnPanelChange,} = HooksCalendar()

    return <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                  onPanelChange={OnPanelChange} />;
}

export default GetCalendar