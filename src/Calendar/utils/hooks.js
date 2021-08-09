import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setCalendarOnchange,
    setCalendarVisibleOnchange,
    setLoadingDeleteCalendarVideo,
    setShowDivsConditions,
    setCalendarInfoOnchange
} from "../store/calendarAction";
import {graphQL_shema} from "./graphql";
import {useMutation} from "@apollo/react-hooks";
import {StatusMessage} from "./StatusMessage";
import {Hooks} from "../../showVideos/utils/hooks";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import moment from 'moment';
import {Badge , Tag,Calendar} from 'antd';
import {useHistory} from "react-router-dom";
import useWindowDimensions from "../../utils/components/getWindowDimensions";

var itemsRunAPI;



const HooksCalendar=(callback)=> {
    const [deletedItems, setDeletedItems] = useState([]);
    const [calendarValues, setCalendarValues] = useState([]);
    const [allow, setAllow] = useState(false);
    const [dateTime, setDateTime] = useState(moment());
    const dispatch = useDispatch();
    const [activeCalendarEvents, SetActiveCalendarEvents] = useState(false);
    const [calendarEvent, SetCalendarEvents] = useState({});
    const [modalInfo, setModalInfo] = useState({});
    const calendarProps = useSelector((state) => state.CalendarReducer)
    const {success_Delete, error_Delete} = StatusMessage()
    const history = useHistory();
    var  x  = useWindowDimensions()
    let  itemsDeleted;
    const {updateLive} = Hooks();
    const OnPanelChange = async (date, mode) => {
        let month_number = date.month() + 1
        let month_before = month_number === 1 ? "12" : (date.month() < 9) ? "0" + (month_number - 1).toString() : (month_number - 1).toString();
        let year_before = month_before === "12" ? date.year() - 1 : date.year();
        let month = (date.month() < 9) ? "0" + month_number.toString() : month_number.toString();
        let year = date.year()
        let month_after = month_number === 12 ? "01" : (date.month() < 9) ? "0" + (month_number + 1).toString() : (month_number + 1).toString();
        let year_after = month_after == "01" ? date.year() + 1 : date.year()
        if (mode === 'year')
            setAllow(false)
        else
            setAllow(true)
        await setDateTime(date)
        QueryCalendar({variables: {"dates": [year_before + "-" + month_before, year + "-" + month, year_after + "-" + month_after]}}, date)
    }
    const [DeleteItemMutation] = useMutation(graphQL_shema().Delete_Items, {
        variables: {idLive: deletedItems},
        context: {clientName: "second"},
        onCompleted: (data) => {

            if (data.deleteLive.code === "200") {
                success_Delete();
                QueryCalendar();
                handleDelayDelete(deletedItems)
            } else if (data.deleteLive.code === "400") {
                error_Delete(400)
            } else if (data.deleteLive.code === "404") {
                error_Delete(404)
            }else if (data.deleteLive.code === "401") {
                error_Delete(401)
            }
        }
    })

    const {loading: calendar_loadingNow, data: GetCalendarDataNow}
        = useQuery(graphQL_shema().Get_Calendar_Data, {
        fetchPolicy: "cache-first",
        variables: {"dates": [moment().subtract(1, 'months').format("YYYY-MM"), moment().format("YYYY-MM"), moment().add(1, 'months').format("YYYY-MM")]},
        context: {clientName: "second"},
        onCompleted: (data) => {
            setCalendarValues(data.getCalendar);
            setAllow(true)
        }
    })

    const [QueryCalendar, {loading: calendar_loading, data: GetCalendarData}]
        = useLazyQuery(graphQL_shema().Get_Calendar_Data, {
        fetchPolicy: "cache-first",
        onCompleted: async (data) => {
            if (data.getCalendar) {
                await data.getCalendar.map(element => {
                    moment(element.date.date,).month() === dateTime.month() ? element.date.isAMomentObject = true : element.date.isAMomentObject = false
                });
                setCalendarValues(data.getCalendar)
            }
            setAllow(true)
        }
    })

//******************generalInformation************************//
    const setItemsRunAPI = (ItemsRunAPI) => {
        itemsRunAPI=ItemsRunAPI
    };
    const handleDelete = async (id) => {
        deletedItems.push(id);

        setDeletedItems(deletedItems)
        dispatch(setShowDivsConditions({showDivsConditionsName: "clickDeleteIcon", showDivsConditionsValue: false}));
        setTimeout(() => {
            dispatch(setShowDivsConditions({showDivsConditionsName: "clickDeleteIcon", showDivsConditionsValue: true}));
        }, 3000)
        // Time out to Run API Delete
        setItemsRunAPI(setTimeout(()=>{
            DeleteItemMutation()

        },3000))

        dispatch(setLoadingDeleteCalendarVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:true}));
        handleCancel()
    }


    const handleDelayDelete=(ids)=>{

        let items = calendarValues.filter(item => {
            return !(ids.includes(item.id))
        })
        // dispatch list Video
        setCalendarValues(items)

        // liste des items supprimer
        itemsDeleted = calendarValues.filter(item => {
            return (ids.includes(item.id))

        })

    }

    const onShowModal = (item) => {
        //SetVisible(true)
        setModalInfo(item)
        dispatch(setCalendarVisibleOnchange({CalendarVisibleNameChange: "visible", CalendarVisibleValueChange: true}));
        dispatch(setCalendarInfoOnchange({CalendarInfoNameChange: "info", CalendarInfoValueChange: item}));
    }
    // Cancel modal
    const handleCancel = () => {
        //SetVisible(false)
        dispatch(setCalendarVisibleOnchange({CalendarVisibleNameChange: "visible", CalendarVisibleValueChange: false}));
    }
    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getTime();
    }


    const getListData = (value) => {
        let listData = [];
        if(value && Object.keys(value).length>0){
             let check = value.format('YYYY/MM/DD');
            if (calendarValues) {
                calendarValues.forEach((element) => {

                    switch ((value.year() + "-" + value.month() + "-" + value.date())) {

                        case (moment(element.date.date,).year() + "-" + moment(element.date.date,).month() + "-" + moment(element.date.date,).date()):

                            listData = [...listData, {
                                id: element.id,
                                type: element.type,
                                content: element.content,
                                style: element.date.isAMomentObject,
                                date: moment(element.date.date,).format('L'),
                                time: moment(element.date.date,).format('LTS'),
                                thumbnail: element.thumbnail,
                                status: element.status
                            }]
                            break;
                    }
                })
            }
        }
        return listData || [];

    }


    const DateCellRender = (value, isCurrentMoment) => {
        const listData = getListData(value);
        return (
            <div  style={{height:"100%" , width:'100%'}} onClick={() => selectDate(value)}>
                {
                    (isCurrentMoment ? isCurrentMoment : allow) &&
                    <ul className="events" style={{height:"100%" , width:'100%'}}>
                        {listData.map((item, index) => {

                            return (
                                <div key={item.id} className={isCurrentMoment ? "events__list-tags" : ""}>
                                        {
                                            isCurrentMoment && <span className={"span_time"}>{item.time}</span>
                                        }
                                        <Tag className={"events__list-tags__tag "}
                                             color={item.type === "à venir" ? 'blue' : item.type === "en cours" ? 'green' : item.type === "archivé" && 'red'}
                                             style={x.matches  && !calendarProps.calendar.activeCalendar ? {pointerEvents:'none'} : {}}
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

    const selectDate =async (e) => {
        await SetActiveCalendarEvents(true);
        await dispatch(setCalendarOnchange({
            CalendarNameChange: "activeCalendarEvents",
            CalendarValueChange: e
        }))
        await SetCalendarEvents(e)
        await dispatch(setCalendarOnchange({
            CalendarNameChange: "activeCalendar",
            CalendarValueChange: x.matches ? true : false
        }))
    }
    const handleStatusEvents =async (live) =>{
        if(live.status === -1){
           await updateLive(live.id)
        }else if(live.status === 0){

        }else{

        }
        await handleCancel()
    }
    const handleClickArrowCalendar = async () =>{
        if(x.matches && calendarProps.calendar.activeCalendar){
            await   dispatch(setCalendarOnchange({
                CalendarNameChange: "activeCalendar",
                CalendarValueChange: false
            }))
        }
        else {
            await  history.push('/showVideos')
        }
        await dispatch(setCalendarVisibleOnchange({CalendarVisibleNameChange:"visible",CalendarVisibleValueChange:false}));
    }
    const handleClickAnnulerAlert = () => {
        // dispatch loading Delete Button
        console.log("handle itemsRunAPI", itemsRunAPI)
        console.log("handleClickAnnulerAlert")
        dispatch(setLoadingDeleteCalendarVideo({LoadingDeleteName: "loadingDelete", LoadingDeleteValue: false}));
        //show selected element
        dispatch(setShowDivsConditions({showDivsConditionsName: "showElementSelected", showDivsConditionsValue: true}));

        dispatch(setShowDivsConditions({showDivsConditionsName: "rubDeleteItems", showDivsConditionsValue: true}));

        setTimeout(() => {
            console.log("handleClickAnnulerAlert")
            dispatch(setShowDivsConditions({showDivsConditionsName: "rubDeleteItems", showDivsConditionsValue: false}));
        }, 3000)
        // recover items deleted

        //ClearTimeOut to Run API Delete
        clearTimeout(itemsRunAPI);
        /* dispatch(setshowVideosActions({data:[...itemsDeleted , ...DataVideos.data]}));*/
    }
    return ({
        setItemsRunAPI,
        itemsRunAPI,
        handleDelete,
        handleStatusEvents,
        activeCalendarEvents,
        calendarEvent,
        calendarValues,
        DateCellRender,
        monthCellRender,
        OnPanelChange,
        handleCancel,
        modalInfo,
        GetCalendarDataNow,
        onShowModal,
        getListData,
        handleClickArrowCalendar,
        handleClickAnnulerAlert
    })
}

export  default HooksCalendar