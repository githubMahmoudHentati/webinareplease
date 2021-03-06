import React, {useState, useEffect} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import defaultThumb from "../assets/webinarplease-thumb.jpg";
import {Tag , Tooltip,Button,Image} from "antd";

import{PrincipalPage} from "../utils/components/principalPage";
import {useSelector} from "react-redux";

import {Hooks} from "./utils/hooks";
import { Spin } from 'antd';
import './showVideos.scss'

import { useTranslation } from 'react-i18next';

import {EyeOutlined , VideoCameraOutlined } from '@ant-design/icons';
import {GraphQLFetchData} from "./utils/graphQLFetchData";
import useWindowDimensions from "../utils/components/getWindowDimensions";
import {ShowVideosReducerReducer} from "./store/showVideosReducer";

function ShowVideos() {
    const { t} = useTranslation();
    //const sorter = (a, b) => (isNaN(a) && isNaN(b) ? (a || '').localeCompare(b || '') : a - b);
    const {paginationProps}=Hooks()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {DeleteItemsMutation}=GraphQLFetchData()
    const {handleClickStreamin} = Hooks()
    function DeleteItemsAPIFunction(){
        DeleteItemsMutation()
    }
    // var srcImg= defaultThumb
    var  x  = useWindowDimensions() // fonction js pour afficher interface seulement en 767px de width

    // Read Data from Hooks
    const {DataVideos, loadingSpinner , conditions}=Hooks(DeleteItemsAPIFunction)

    //const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner

    // fonction pour compter les lignes sélectionnées de tableau
    // const fetch_element_selected = (selected) => {
    //     SetSelectedRow(selected);
    // }

    const displayDate = (date) =>{
        if(date)
        return(<div><span> {date.split(' ')[0]}</span><span>{date.split(' ')[1]}</span></div>)
        else return ""
    }

    {console.log("TTTTTTTTTTTTTTTTTTTTTT",paginationProps.order)}
    // Column AND DATA Table
     const columns = [

        {
            title: 'Id',
            dataIndex: "id",
            key: '0',
            className: "columnId",

            sortOrder:paginationProps.columnKey === "0" &&  paginationProps.order,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend','ascend', 'descend',]

        },
         {
             title: t("ShowVideo.Overview"),
             dataIndex: 'logo',
             key: '4',
             className: "columnFeed",
             render: image => {
                 return (<div className={"list_lives"}>
                     <Image src={image} fallback={defaultThumb} preview={{visible: false}} />
                 </div>)
             }
        },
        {
            title: t("ShowVideo.Titre"),
            dataIndex: 'title',
            key: '1',
            className: "columnTitle",
            sorter: (a, b) => a.title - b.title,
            sortDirections: ['descend','ascend', 'descend',],
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
            sortDirections: ['descend','ascend', 'descend',],
            sorter: (a, b) => (a.status+1) - b.status,
            sortOrder:paginationProps.columnKey === "3" &&  paginationProps.order,
            render: (status , record)=> (
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
                    {
                       x.matches &&  <Tooltip title={t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser" ))}>
                            <Button className={"btn_Visualiser_diffuser "} style={{
                                backgroundColor: darkMode === false ? "" : "#1D1D1D",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }} onClick={()=>handleClickStreamin(record)}>
                                {
                                    record.status === -1 ? <VideoCameraOutlined id={"icon_vs"}/> : <EyeOutlined id={"icon_vs"}/>
                                }
                                <span id={"span_diffuser"}>{ t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser" ))}</span>

                            </Button>
                        </Tooltip>
                    }


                </div>
            ),
        },

    ];

    console.log("columns*****",columns)
     const data = {
         totalElements:DataVideos.recordsFiltered,
         content:DataVideos.data,
         enabled:conditions.clickDeleteIcon === true ? true : false
    }

    // fontion pour afficher le tableau de n'interface
    const {
        DataTable,
    } = UseDataTableVideos({
        columns: columns,
        dataSource: data,
        updateEntityPath: 'update-product',
    });
    return(
        <Spin  size="middle"  spinning={loadingSpinner.loading}>
       <PrincipalPage>
           <div className={"showVideo"}>
           <HeaderVideos/>
               <div className={"div2_showVideo"}>
           <DataTable />
               </div>
           </div>
       </PrincipalPage>
         </Spin>
    );
}

export default ShowVideos;