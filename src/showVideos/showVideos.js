import React, {useEffect, useState} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import GlobalHeader from "../utils/components/header"
import {Card, Tag , message} from "antd";
import * as constantMedia from './utils/data';
import{PrincipalPage} from "../utils/components/principalPage";
import {useSelector , useDispatch} from "react-redux";
import {setDarkMode} from "../utils/redux/actions";
import {setshowVideosActions, setShowVideoConstraintDataOnchange} from "./store/showVideosAction";
import {ShowVideosReducerReducer} from "./store/showVideosReducer";
import {graphQL_shema} from "./utils/graphQL";
import {Hooks} from "./utils/hooks";
import { Spin } from 'antd';
import './showVideos.scss'
import { useQuery } from "@apollo/react-hooks";
import { useTranslation } from 'react-i18next';


import {GraphQLFetchData} from "./utils/graphQLFetchData";

function ShowVideos() {
    const { t, i18n } = useTranslation();
    const sorter = (a, b) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);
    const {paginationProps ,  values, GETDATEVIDEO }=Hooks()

    const {DeleteItemsMutation}=GraphQLFetchData()

    function DeleteItemsAPIFunction(){
        DeleteItemsMutation()
    }

    // Read Data from Hooks
    const {DataVideos, loadingSpinner , conditions}=Hooks(DeleteItemsAPIFunction)
    const dispatch = useDispatch()
    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner

    // fonction pour compter les lignes sélectionnées de tableau
    const fetch_element_selected = (selected) => {
        SetSelectedRow(selected);
    }

    const displayDate = (date) =>{
        if(date)
        return(<><span> {date.split(' ')[0]}</span><br /><span>{date.split(' ')[1]}</span></>)
        else return ""
    }
    console.log("valuesCredentiels-showVideos",localStorage.getItem('jwtToken'))

    // Column AND DATA Table
     const columns = [

        {
            title: 'Id',
            dataIndex: "id",
            key: '0',
            className: "columnId",
            sortOrder:paginationProps.columnKey === "0" &&  paginationProps.order,
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("ShowVideo.Overview"),
            dataIndex: 'logo',
            key:'4',
            className: "columnFeed",
            render: image =>
                <div className={"div_apercu"}>
                <img  src={image} className={"img_aperçu"}/>
                </div>,
        },
        {
            title: t("ShowVideo.Titre"),
            dataIndex: 'title',
            key: '1',
            className: "columnTitle",
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder:paginationProps.columnKey === "1" &&  paginationProps.order,
            render:(titre , record) =>{
                return(
                    <div className="div_titre"><span>{record.title}</span></div>
                )
            },
        },
        {
            title: 'Date',
            dataIndex: 'liveDate',
            key: '2',
            className: "columnDate",
            sorter: (a, b) => a.date - b.date,
            sortOrder:paginationProps.columnKey === "2" &&  paginationProps.order,
            render:(date , record) =>{
                return(
                    <div className="div_date">{displayDate(record.liveDate)}</div>
                )
            },
        },
        {
            title: t("ShowVideo.State"),
            dataIndex: 'status',
            key: '3',
            className: "columnState",
            sorter: (a, b) => a.status - b.status,
            sortOrder:paginationProps.columnKey === "3" &&  paginationProps.order,
            render: status => (
                <div className={"div-status"}>
                    {
                        status === 1
                          ?
                          <Tag color={"green"}><span>{t("ShowVideo.InProgress")}</span></Tag>
                          :
                            status === 0
                            ?
                              <Tag color={"geekblue"}><span>{t("ShowVideo.Archived")}</span></Tag>
                              :
                                status === -1
                                  ?
                                  <Tag color={"blue"}><span>{t("ShowVideo.ComingSoon")}</span></Tag>
                                  :
                                  null
                    }

                </div>
            ),
        },

    ];
useEffect(()=>{
    GETDATEVIDEO()
},[])
     const data = {
         totalElements:DataVideos.recordsFiltered,
         content:DataVideos.data,
         enabled:conditions.clickDeleteIcon === true ? true : false
    }

    // fontion pour afficher le tableau de n'interface
    const {
        DataTable,
        currentPage,
        pageSize,
        resetPagination,
    } = UseDataTableVideos({
        columns: columns,
        dataSource: data,
        updateEntityPath: 'update-product',
    });
    return(
        <Spin  size="middle"  spinning={loadingSpinner.loading}>
       <PrincipalPage>
           <div className={"showVideo"}>
               <div className={"div1_showVideo"}>
           <HeaderVideos/>
               </div>
               <div className={"div2_showVideo"}>
           <DataTable />
               </div>
           </div>
       </PrincipalPage>
        </Spin>
    );
}

export default ShowVideos;