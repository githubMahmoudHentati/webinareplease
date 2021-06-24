import React,{useState } from 'react';
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

import {GraphQLFetchData} from "./utils/graphQLFetchData";

function ShowVideos() {

    const {DeleteItemsMutation}=GraphQLFetchData()

    function DeleteItemsAPIFunction(){
        DeleteItemsMutation()
    }

    // Read Data from Hooks
    const {DataVideos, loadingSpinner}=Hooks(DeleteItemsAPIFunction)
    const dispatch = useDispatch()

    // Column AND DATA Table
     const columns = [

        {
            title: 'Id',
            dataIndex: "id",
            key: 0,
            sorter: (a, b) => a.id.length - b.id.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Aperçu',
            dataIndex: 'logo',
            key:0,
            render: image => <img  src={image} className={"img_aperçu"}/>,
        },
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 0,
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Date',
            dataIndex: 'liveDate',
            key: 0,
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Etat',
            dataIndex: 'status',
            key: 0,
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend','ascend'],
            render: status => (
                <>
                    {
                        status === 1
                          ?
                          <Tag color={"green"}><span>En cours</span></Tag>
                          :
                            status === 0
                            ?
                              <Tag color={"geekblue"}><span>Archivé</span></Tag>
                              :
                                status === -1
                                  ?
                                  <Tag color={"blue"}><span>A venir</span></Tag>
                                  :
                                  null
                    }

                </>
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
           <HeaderVideos/>
           <DataTable />
       </PrincipalPage>
        </Spin>
    );
}

export default ShowVideos;