import React, {useState, useEffect} from 'react';
import "../Calendar.scss";
import {Calendar, Badge, Button, Modal, Tag} from 'antd';
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "../utils/graphql";
import moment from 'moment';

import CalendarEvents from "./CalendarEvents";
import {setCalendarOnchange, setCalendarVisibleOnchange} from "../store/calendarAction";
import {useTranslation} from 'react-i18next';

import {useDispatch} from "react-redux";

import imageModal from '../../assets/imageModal.jpg'

let x = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width

export function CalendarFile() {
    const dispatch = useDispatch();
    const [visible, SetVisible] = useState(false);
    const [allow, setAllow] = useState(false);
    const [calendarValues, setCalendarValues] = useState([]);
    const [dateTime, setDateTime] = useState(moment());
    const [activeCalendarEvents, SetActiveCalendarEvents] = useState(false);
    const [calendarEvent, SetCalendarEvents] = useState({});
    const [modalInfo, setModalInfo] = useState({});
    const darkMode = useSelector((state) => state.Reducer.DarkMode);
    !darkMode && document.documentElement.style.setProperty('--modal_background', "white");

    const VisibleModal = useSelector((state) => state.CalendarReducer);

    console.log("VisibleModal", VisibleModal)

    //show Modal
    const onShowModal = (item) => {
        //SetVisible(true)
        setModalInfo(item)
        dispatch(setCalendarVisibleOnchange({CalendarVisibleNameChange: "visible", CalendarVisibleValueChange: true}));
    }
    // Cancel modal
    const handleCancel = () => {
        //SetVisible(false)
        dispatch(setCalendarVisibleOnchange({CalendarVisibleNameChange: "visible", CalendarVisibleValueChange: false}));
    }
    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
    }
    const {loading: calendar_loadingNow, data: GetCalendarDataNow}
        = useQuery(graphQL_shema().Get_Calendar_Data, {
        fetchPolicy: "cache-first",
        variables: {"dates": [moment().subtract(1, 'months').format("YYYY-MM"), moment().format("YYYY-MM"), moment().add(1, 'months').format("YYYY-MM")]},
        context: {clientName: "second"},
        onCompleted: (data) => {
            console.log("call api ")

            setCalendarValues(data.getCalendar);
            setAllow(true)
        }
    })

    const [QueryCalendar, {loading: calendar_loading, data: GetCalendarData}]
        = useLazyQuery(graphQL_shema().Get_Calendar_Data, {
        fetchPolicy: "cache-first",
        onCompleted: async (data) => {
            console.log("call api lazy");
            if (data.getCalendar) {
                await data.getCalendar.map(element => {
                    moment(element.date.date,).month() === dateTime.month() ? element.date.isAMomentObject = true : element.date.isAMomentObject = false
                });
                setCalendarValues(data.getCalendar)
            }
            setAllow(true)
        }
    })
    const {t, i18n} = useTranslation();
    const OnPanelChange = async (date, mode) => {
        console.log("OnPanelChange")
        let month_number = date.month() + 1
        let month_before = month_number === 1 ? "12" : (date.month() < 9) ? "0" + (month_number - 1).toString() : (month_number - 1).toString();
        let year_before = month_before === "12" ? date.year() - 1 : date.year();
        let month = (date.month() < 9) ? "0" + month_number.toString() : month_number.toString();
        let year = date.year()
        let month_after = month_number === 12 ? "01" : (date.month() < 9) ? "0" + (month_number + 1).toString() : (month_number + 1).toString();
        let year_after = month_after == "01" ? date.year() + 1 : date.year();
        if (mode === 'year')
            setAllow(false)
        else
            setAllow(true)
        console.log("date", date, "mode", mode)
        await setDateTime(date)
        QueryCalendar({variables: {"dates": [year_before + "-" + month_before, year + "-" + month, year_after + "-" + month_after]}}, date)
    }

    const getListData = (value) => {
        let listData = [];
        let check = value.format('YYYY/MM/DD');
        if (calendarValues) {
            console.log("CalendarValue", calendarValues)

            calendarValues.forEach((element) => {

                switch ((value.year() + "-" + value.month() + "-" + value.date())) {

                    case (moment(element.date.date,).year() + "-" + moment(element.date.date,).month() + "-" + moment(element.date.date,).date()):

                        listData = [...listData, {
                            id: randomDate(new Date(2012, 0, 1), new Date()),
                            type: element.type,
                            content: element.content,
                            style: element.date.isAMomentObject,
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


    const DateCellRender = (value) => {
        const listData = getListData(value);
        console.log("allow", allow);
        return (
            <div>
                {
                    allow &&
                    <ul className="events">
                        {console.log("listData", listData)}
                        {listData.map((item, index) => {
                            console.log("itemmodal" + item.id, item)
                            return (
                                <div key={item.id}>
                                    <Tag className={"btn_error"}
                                         color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'red'}
                                         onClick={() => onShowModal(item)}>
                                        <Badge
                                            color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'gray'}
                                            text={item.content} style={{
                                            color: "#007fcb",
                                            borderRadius: "2px",
                                            opacity: !item.style && "0.3"
                                        }}/>
                                    </Tag>

                                </div>
                            )
                        })}
                    </ul>
                }

            </div>
        );
    }

    function monthCellRender(value) {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }


    function getMonthData(value) {
        if (value.month() === 8) {
            return 1394;
        }
    }

    const selectDate = (e) => {
        console.log("selectDate**************")
        SetActiveCalendarEvents(true)
        SetCalendarEvents(e)
        dispatch(setCalendarOnchange({
            CalendarNameChange: "activeCalendar",

            CalendarValueChange: true
        }))
        console.log(' CalendarValueChange')
    }

    return (
        <div className={"CalendarFile"}>
            {console.log("activeCalendarEvents", activeCalendarEvents)}
            {console.log(" x.matches", x.matches)}
            {
                x.matches ?
                    activeCalendarEvents ?
                        <CalendarEvents calendarEvent={calendarEvent} calendarValues={calendarValues}
                                        GetCalendarDataNow={GetCalendarDataNow}/>
                        :
                        <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                                  onPanelChange={OnPanelChange} onSelect={() => selectDate()}/>
                    :
                    <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}
                              onPanelChange={OnPanelChange} onSelect={selectDate}/>
            }
            <Modal
                visible={VisibleModal.calendarVisible.visible}
                title={<Badge style={{fontSize: "16px", fontWeight: "500"}} color='green'
                              text={modalInfo.content}/>}
                onCancel={handleCancel}
                footer={[
                    <div className={"footer_modal_Avenir"}>
                        <div>{modalInfo.status == -1 ?<Button><DeleteOutlined/>{t("Calendar.Delete")}</Button>:null}</div>

                        <div>
                            <Button key="back" onClick={handleCancel}>
                                {t("Calendar.Cancel")}

                            </Button>
                            <Button className={"ModalButtonPrimary"} type="primary" key="submit" >
                                {modalInfo.status == -1 ? t("Calendar.Edit") : modalInfo.status == 0 ? t("Calendar.Visualize") : t("Calendar.Broadcast")}
                            </Button>
                        </div>

                    </div>
                ]}
            >
                <div className={"body_Modal"}>
                    <div className={"div_image_modal"}><img src={modalInfo.thumbnail ? modalInfo.thumbnail : imageModal}/>
                    </div>
                    <div className={"div_time_calendar"}>
                        <div className={"type_btn"}><Tag
                            color={modalInfo.type === "à venir" ? 'blue' : modalInfo.type === "en cours" ? 'green' : modalInfo.type === "archivé" && 'gray'}>{modalInfo.type === "à venir" ? t("ShowVideo.ComingSoon") : (modalInfo.type === "en cours" ? t("ShowVideo.InProgress") : t("ShowVideo.Archived"))}</Tag>
                        </div>
                        <div className={"div2_time_calendar"}>
                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                                <CalendarOutlined/>{modalInfo.date}</p>
                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                                <ClockCircleOutlined/>{modalInfo.time}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
