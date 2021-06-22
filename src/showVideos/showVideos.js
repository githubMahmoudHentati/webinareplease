import React,{useState , useEffect} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import GlobalHeader from "../utils/components/header"
import {Card, Tag} from "antd";
import * as constantMedia from './utils/data';
import{PrincipalPage} from "../utils/components/principalPage";
import {useSelector , useDispatch} from "react-redux";
import {setDarkMode} from "../utils/redux/actions";
import {setshowVideosActions} from "./store/showVideosAction";
import {ShowVideosReducerReducer} from "./store/showVideosReducer";
import {useLazyQuery,useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./utils/graphQL";
import {Hooks} from "./utils/hooks";

function ShowVideos() {
    //use Lazy Query
    //query getVideosLinks for embed Code
    const [GETDATEVIDEO ,{error,data: GetlIVES}]
        = useLazyQuery(graphQL_shema().Get_Lives, {
        onCompleted:(data)=>{
        }
    })
    // Read Data from Hooks
    const {DataVideos , paginationProps ,  values }=Hooks()

    console.log("helooooooooooooooooooo",values)

    const dispatch = useDispatch()
    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    // use Query to fetch Data
    const {loading:calendar_loadingNow, data: GetCalendarDataNow}
        = useQuery(graphQL_shema().Get_Lives, {
        fetchPolicy:  "cache-and-network",
        variables: { input : {
                "limit": paginationProps.pageSize,
                "offset": values.search !== '' ? 0 :(paginationProps.current-1)*10,
                "order_dir": paginationProps.order,
                "order_column": paginationProps.columnKey,
                "search_word":values.search,
                "date":values.date,
                "status":""
            } },
        context: { clientName: "second" },
        onCompleted :(data)=>{
            dispatch(setshowVideosActions(data.getLives));
        }
    })


    // fonction pour compter les lignes sélectionnées de tableau
    const fetch_element_selected = (selected) => {
        SetSelectedRow(selected);
    }

    // Column AND DATA Table
     const columns = [

        {
            title: 'Id',
            dataIndex: "Id",
            key: 0,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
            width:'2%',
        },
        {
            title: 'Aperçu',
            dataIndex: 'Logo',
            key:1,
            render: image => <img  src={image} className={"img_aperçu"}/>,
        },
        {
            title: 'Titre',
            dataIndex: 'Title',
            key: 2,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Date',
            dataIndex: 'liveDate',
            key: 3,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Etat',
            dataIndex: 'Status',
            key: 4,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
            render: Status => (
                <>
                    {
                      Status === 1
                          ?
                          <Tag color={"green"}><span>En cours</span></Tag>
                          :
                          Status === 0
                            ?
                              <Tag color={"geekblue"}><span>Archivé</span></Tag>
                              :
                              Status === -1
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
    },fetch_element_selected);

    return(
       <PrincipalPage>
           <HeaderVideos selectedRow={selectedRow}/>
           <DataTable />
       </PrincipalPage>
    );
}

export default ShowVideos;