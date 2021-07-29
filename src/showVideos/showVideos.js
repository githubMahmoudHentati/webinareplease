import React, {useEffect, useState} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import GlobalHeader from "../utils/components/header"
import {Card, Tag , message} from "antd";
import * as constantMedia from './utils/data';
import{PrincipalPage} from "../utils/components/principalPage";
import {useSelector , useDispatch} from "react-redux";
import {setDarkMode} from "../utils/redux/actions";
import {setshowVideosActions} from "./store/showVideosAction";
import {ShowVideosReducerReducer} from "./store/showVideosReducer";
import {useLazyQuery,useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./utils/graphQL";
import {Hooks} from "./utils/hooks";
import { Spin } from 'antd';
import './showVideos.scss'
import { useTranslation } from 'react-i18next';

import {GraphQLFetchData} from "./utils/graphQLFetchData";

function ShowVideos() {
    const { t, i18n } = useTranslation();

    const sorter = (a, b) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);

    useEffect(()=>{
        //window.scrollTo(0, 0);// scroll window with the pagination
    })

    const {DeleteItemsMutation}=GraphQLFetchData()

    function DeleteItemsAPIFunction(){
        DeleteItemsMutation()
    }

    // Read Data from Hooks
    const {DataVideos, loadingSpinner}=Hooks(DeleteItemsAPIFunction)
    const dispatch = useDispatch()
    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner

    // fonction pour compter les lignes sélectionnées de tableau
    const fetch_element_selected = (selected) => {
        SetSelectedRow(selected);
    }
    console.log("valuesCredentiels-showVideos",localStorage.getItem('jwtToken'))

    // Column AND DATA Table
     const columns = [

        {
            title: 'Id',
            dataIndex: "id",
            key: '1',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: t("ShowVideo.Overview"),
            dataIndex: 'logo',
            key:'2',
            render: image =>
                <div className={"div_apercu"}>
                <img  src={image} className={"img_aperçu"}/>
                </div>,
        },
        {
            title: t("ShowVideo.Titre"),
            dataIndex: 'title',
            key: '3',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
            render:(titre , record) =>{
                return(
                    <div className="div_titre"><span>{record.title}</span></div>
                )
            },
        },
        {
            title: 'Date',
            dataIndex: 'liveDate',
            key: '4',
            sorter: (a, b) => a.date - b.date,
            sortDirections: ['descend','ascend'],
            render:(date , record) =>{
                return(
                    <div className="div_date">{record.liveDate}</div>
                )
            },
        },
        {
            title: t("ShowVideo.State"),
            dataIndex: 'status',
            key: '5',
            sorter: (a, b) => a.status - b.status,
            sortDirections: ['descend','ascend'],
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

     const data = {
        totalElements:DataVideos.recordsFiltered,
        content:DataVideos.data
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