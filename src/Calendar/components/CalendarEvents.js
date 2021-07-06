import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Badge, Button, Modal, Tag} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

function CalendarEvents({calendarEvent , calendarValues , GetCalendarDataNow}) {
    const [visible , SetVisible] = useState(false);
    let calenderEventClick = calendarEvent
    let calendarCompareMoment =  calendarValues.map(item => moment(item.date.date).isSame(calenderEventClick , 'day'))
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    !darkMode&&document.documentElement.style.setProperty('--modal_background', "white")


    const getListData= (calenderEventClick)=>{
        let listData =[];
        if (calendarValues) {

            calendarValues.forEach((element) => {
                switch ((calenderEventClick.month()+"-"+calenderEventClick.date())) {
                    case (moment(element.date.date , ).month()+"-"+moment(element.date.date ,).date()):
                        listData=[...listData,{id:(element.id),type:element.type , content:element.content,style:element.date.isAMomentObject,date:element.date.date}]
                        break;
                }
            })
        }
        return listData || [];
    }

    const listData =    getListData(calenderEventClick); // get Calender event

    //show Modal
    const onShowModal=()=>{
        SetVisible(true)
    }
    // Cancel modal
    const handleCancel = () => {
        SetVisible(false)
    }

console.log("kdjfksdfgkdjsksdjfhksdjfhksdjf",listData)
    return(
        <div className={"div_global_calendar"}>
            <span className={"spn_Date_event"}>{calendarEvent.format('DD / MM / YYYY')}</span>

            {
                calendarCompareMoment && calendarCompareMoment.includes(true)
                    ?
                       listData.map(item => {
                                return (
                                    <div className={"div_calendarevent"}>
                                        <span className={"span_time"}>{moment(item.date.date).format('hh:mm:ss')}</span>
                                        <Tag className={"btn_error tag_moment"}
                                             color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && '#EBEBEB'}
                                             onClick={() => onShowModal()}>
                                            <Badge
                                                color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'gray'}
                                                text={item.content} style={{color: "#007fcb", borderRadius: "2px", opacity:!item.style&&"0.3"}}/>
                                        </Tag>

                                        <Modal
                                            visible={visible}
                                            title={<Badge style={{fontSize: "16px", fontWeight: "500"}} color='green'
                                                          text={'Lorem ipsum dolor sit amet, consectetuer'}/>}
                                            onCancel={handleCancel}
                                            footer={[
                                                <div className={"footer_modal_Avenir"}>
                                                    <div><Button><DeleteOutlined/> Supprimer</Button></div>

                                                    <div>
                                                        <Button key="back" onClick={handleCancel}>
                                                            Annuler
                                                        </Button>
                                                        <Button key="submit" type="primary">
                                                            Visualiser
                                                        </Button>
                                                    </div>

                                                </div>
                                            ]}
                                        >
                                            <div className={"body_Modal"}>
                                                <div className={"div_image_modal"}><img
                                                    src={"https://i.pinimg.com/originals/e2/bd/0e/e2bd0e31dcc375ad97ce3fe652456afa.jpg"}/>
                                                </div>
                                                <div className={"div_time_calendar"}>
                                                    <div className={"type_btn"}><Tag
                                                        color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'gray'}>{item.type}</Tag>
                                                    </div>
                                                    <div className={"div2_time_calendar"}>
                                                        <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                                                            <CalendarOutlined/> 13-05-2121</p>
                                                        <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                                                            <ClockCircleOutlined/> 16:30:00</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
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