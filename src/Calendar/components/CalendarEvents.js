import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Badge, Tag} from "antd";
import { useTranslation } from 'react-i18next';
import {useSelector} from "react-redux";
import CalendarModal from "./CalendarModal";
import HooksCalendar from "../utils/hooks";

function CalendarEvents({calendarEvent , calendarValues , GetCalendarDataNow}) {
    let calenderEventClick = calendarEvent
    let calendarCompareMoment =  calendarValues.map(item => moment(item.date.date).isSame(calenderEventClick , 'day'))
    const VisibleModal = useSelector((state) => state.CalendarReducer);
    const {handleDelete, handleStatusEvents, handleCancel, onShowModal, modalInfo} = HooksCalendar()
    const getListData= (calenderEventClick)=>{
        let listData =[];
        if (calendarValues && calendarValues.length) {
            calendarValues.forEach((element) => {
               if(calenderEventClick)
                switch ((calenderEventClick.year()+"-"+calenderEventClick.month()+"-"+calenderEventClick.date())) {
                    case (moment(element.date.date , ).year()+"-"+moment(element.date.date , ).month()+"-"+moment(element.date.date ,).date()):
                        listData=[...listData,{
                            id:(element.id),
                            type:element.type ,
                            content:element.content,
                            style:element.date.isAMomentObject,
                            date: moment(element.date.date,).format('L'),
                            time: moment(element.date.date,).format('LTS'),
                            thumbnail: element.thumbnail,
                            status:element.status
                        }]
                        break;
                }
            })
        }
        return listData || [];
    }

    const listData =    getListData(calenderEventClick); // get Calender event
    const { t, i18n } = useTranslation();
    return(
        <div className={"div_global_calendar"}>
            <span className={"spn_Date_event"}>{calendarEvent.format('DD / MM / YYYY')}</span>

            {
                calendarCompareMoment && calendarCompareMoment.includes(true)
                    ?
                    listData.map(item => {
                        console.log("item", item)
                        return (
                            <div className={"div_calendarevent"}>
                                <span className={"span_time"}>{moment(item.date.date).format('hh:mm:ss')}</span>
                                <Tag className={"btn_error tag_moment"}
                                     color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && '#EBEBEB'}
                                     onClick={() => onShowModal(item)}>
                                    <Badge
                                        color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'gray'}
                                        text={item.content} className={"div-calendar-content"} style={{color: "#007fcb", borderRadius: "2px", opacity:!item.style&&"0.3"}}/>
                                </Tag>
                            </div>
                        )
                    })
                    :
                    null
            }

        </div>
    )
}

export default CalendarEvents;
