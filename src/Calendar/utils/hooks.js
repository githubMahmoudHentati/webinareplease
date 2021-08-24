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
//import 'moment/locale/fr';
import i18n from '../../i18n/index';
var itemsRunAPI;

const HooksCalendar=(callback)=> {
    const [deletedItems, setDeletedItems] = useState([]);
    const [allow, setAllow] = useState(false);
    const [dateTime, setDateTime] = useState(moment());
    const dispatch = useDispatch();
    const [activeCalendarEvents, SetActiveCalendarEvents] = useState(false);
    const [calendarEvent, SetCalendarEvents] = useState({});
    const [modalInfo, setModalInfo] = useState({});
    const [mode, setMode] = useState('month');
    const calendarProps = useSelector((state) => state.CalendarReducer)
    const calendarValues = calendarProps.calendar.calendarValues;
    const {success_Delete, error_Delete} = StatusMessage()
    const idLive = localStorage.getItem('idLive')?localStorage.getItem('idLive'): '';
    const statusLive = localStorage.getItem('statusLive')?localStorage.getItem('statusLive'):'';
    const history = useHistory();
    var  x  = useWindowDimensions()
    let  itemsDeleted;
    const {updateLive} = Hooks();
    useEffect(async ()=>{
        await OnPanelChange(moment(new Date()), 'month')
    }, [])
    const OnPanelChange = async (date, mode) => {
        let month_number = date.month() + 1
        let month_before = month_number === 1 ? "12" : (date.month() < 9) ? "0" + (month_number - 1).toString() : (month_number - 1).toString();
        let year_before = month_before === "12" ? date.year() - 1 : date.year();
        let month = (date.month() < 9) ? "0" + month_number.toString() : month_number.toString();
        let year = date.year()
        let month_after = month_number === 12 ? "01" : (date.month() < 9) ? "0" + (month_number + 1).toString() : (month_number + 1).toString();
        let year_after = month_after == "01" ? date.year() + 1 : date.year()
        let query= {variables: {"dates": [year_before + "-" + month_before, year + "-" + month, year_after + "-" + month_after]}}
        setMode(mode)
        if (mode === 'year'){
            query={variables: {"dates": [year.toString()]}}
            setAllow(false)
        }
        else{
            setAllow(true)
        }
        await setDateTime(date)
        QueryCalendar(query, mode === 'year' ? year :   date)
    }
    const [DeleteItemMutation] = useMutation(graphQL_shema().Delete_Items, {
        variables: {idLive: deletedItems},
        context: {clientName: "second"},
        onCompleted: async (data) => {

            if (data.deleteLive.code === "200") {
                success_Delete();
                await OnPanelChange(moment(new Date()), 'month')
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
    const [QueryCalendar, {loading: calendar_loading, data: GetCalendarData}]
        = useLazyQuery(graphQL_shema().Get_Calendar_Data, {
        fetchPolicy: "cache-and-network",
        context: {clientName: "second"},
        onCompleted: async (data) => {
            if (data.getCalendar) {
                await data.getCalendar.map(element => {
                    moment(element.date.date,).month() === dateTime.month() ? element.date.isAMomentObject = true : element.date.isAMomentObject = false
                });
                await dispatch(setCalendarOnchange({
                    CalendarNameChange: "calendarValues",
                    CalendarValueChange: data.getCalendar
                }))
            }
            setAllow(true)
        }
    })
    const [GetDiffusionLive]
        = useMutation(graphQL_shema().Get_Diffusion_Live, {
        context: {clientName: "second"},
        onCompleted: async (data) => {
            let diffusionData=data.getDiffusionLink
            if (diffusionData) {
                if(diffusionData.code===200 ){
                    if( statusLive===0){
                        history.push('/webinarStudioLive')
                    }else{
                        window.open(diffusionData.visLink,'_blank')
                    }
                }
            }
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
         dispatch(setCalendarOnchange({
            CalendarNameChange: "calendarValues",
            CalendarValueChange: items
        }))

        // liste des items supprimer
        itemsDeleted =calendarValues.filter(item => {
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
        return  listData || [];
    }
    const getTagElm = (listData,value , isCurrentMoment, isYearMode) =>{
        return (<div  onClick={(e)=> isYearMode ? e.preventDefault() : selectDate(value)} className={'event-list '} >
            {
                (isCurrentMoment ? isCurrentMoment : allow) &&
                <ul className="event-list__events" >
                    {listData.map((item, index) => {
                        if(item){
                            const getColorTag=item.status === -1 ? 'blue' : item.status === 1 ? 'green' : item.status === 0 && 'gray'
                            return  (<div key={item.id} className={(isCurrentMoment ? "event-list__events__list-tags" : "") +  (isYearMode ? 'event-list__events__list-tags--year' : '')}>
                                {
                                    isCurrentMoment && <span className={"span_time"}>{item.time}</span>
                                }
                                <Tag className={"event-list__events__list-tags__tag "+(getColorTag ? " event-list__events__list-tags__tag--"+getColorTag : '' ) + (isYearMode ? " event-list__events__list-tags__tag--year" : '')}
                                     style={x.matches  && !calendarProps.calendar.activeCalendar ? {pointerEvents:'none'} : {}}
                                     onClick={(e)=> isYearMode ? e.preventDefault() : onShowModal(item)}>

                                    <Badge
                                        color={getColorTag}
                                        text={item.content + (isYearMode ? ' '+i18n.t('Calendar.elements') + ' ' + item.type: '' )}
                                        style={{
                                            borderRadius: "2px",
                                        }}
                                    />
                                </Tag>
                            </div>)
                        }
                    })}
                </ul>
            }

        </div>)

    }
    const DateCellRender = (value, isCurrentMoment) => {
        const listData = getListData(value);
        return  getTagElm(listData, value , isCurrentMoment)

    }
    const getCountEventsData = (value) => {
        let filtredEvents= [];
        let arrInProgress=[]
        let arrArchived=[]
        let arrComing=[]
        let totalEvents= [];
        let countInProgress=0;
        let countArchived=0;
        let countComing=0;
        if(value && Object.keys(value).length>0){
            if (calendarValues) {
                calendarValues.forEach((element) => {
                    if((moment(element.date.date,).year() + "-" + moment(element.date.date,).month()) === (value.year() + "-" + value.month() )) {
                        switch (element.status){
                            case 0 :
                                arrArchived =[...arrArchived ,element];
                                countArchived=arrArchived.length
                                break;
                            case 1:
                                arrInProgress =[...arrInProgress ,element];
                                countInProgress=arrInProgress.length
                                break;
                            default:
                                arrComing =[...arrComing ,element];
                                countComing=arrComing.length
                                break;
                        }

                    }
                })
            }
        }
        totalEvents= [
            countInProgress > 0 && {id:1, status: 1 , content: countInProgress , type: i18n.t("ShowVideo.InProgress")},
            countArchived > 0 && {id:2, status: 0 , content: countArchived, type: i18n.t("ShowVideo.Archived")},
            countComing > 0 && {id:3, status: -1 , content: countComing,  type: i18n.t("ShowVideo.ComingSoon")}
            ];
        return  totalEvents;
    }
    function monthCellRender(value) {
        const dataYearMode = getCountEventsData(value);
        return value ? (
            <div className="notes-month" onClick={()=>OnPanelChange(value, 'month')}>
                {getTagElm(dataYearMode, value, false, true)}
            </div>
        ) : null;
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
    const diffusionLive = ({id, status}) =>{
        localStorage.setItem('idLive', id);
        localStorage.setItem('statusLive', status);
        GetDiffusionLive({variables: {id: id}})
    }
    const handleStatusEvents =async (live) =>{
        if(live.status === -1){
           await updateLive(live.id)
        }else {
            await diffusionLive({id: live.id, status:live.status})
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
        dispatch(setLoadingDeleteCalendarVideo({LoadingDeleteName: "loadingDelete", LoadingDeleteValue: false}));
        //show selected element
        dispatch(setShowDivsConditions({showDivsConditionsName: "showElementSelected", showDivsConditionsValue: true}));

        dispatch(setShowDivsConditions({showDivsConditionsName: "rubDeleteItems", showDivsConditionsValue: true}));

        setTimeout(() => {
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
        DateCellRender,
        monthCellRender,
        OnPanelChange,
        handleCancel,
        modalInfo,
        GetCalendarData,
        onShowModal,
        getListData,
        handleClickArrowCalendar,
        handleClickAnnulerAlert,
        mode
    })
}

export  default HooksCalendar