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

function ShowVideos() {

    const dispatch = useDispatch()
    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    //Data of Query
    const DataVideos = useSelector((state)=> state.ShowVideosReducerReducer.ListVideos)
    console.log("DataVideos" , DataVideos)
    // use Query to fetch Data
    const {loading:calendar_loadingNow, data: GetCalendarDataNow}
        = useQuery(graphQL_shema().Get_Lives, {
        fetchPolicy:  "cache-and-network",
        variables: { input : {
                "limit": 10,
                "offset": 0,
                "order_dir": "ASC",
                "order_column": 3,
                "search_word":" ",
                "status":"live"
            } },
        context: { clientName: "second" },
        onCompleted :(data)=>{

            console.log("helloWorld :" , data.getLives.data)
            dispatch(setshowVideosActions(data.getLives.data));
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
            dataIndex: "id",
            key: 0,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
            width:'2%',
        },
        {
            title: 'Aperçu',
            dataIndex: 'logo',
            key:1,
            render: image => <img  src={image} className={"img_aperçu"}/>,
        },
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 2,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 3,
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Etat',
            dataIndex: 'status',
            key: 'tags',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],

        },

    ];


     const data = {
        totalElements:20,
        content:DataVideos
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