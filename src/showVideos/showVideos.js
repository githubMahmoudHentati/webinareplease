import React,{useState , useEffect} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import GlobalHeader from "../utils/components/header"
import { Card } from "antd";
import * as constantMedia from './utils/data';
import{PrincipalPage} from "../utils/components/principalPage";
import {useSelector} from "react-redux";

function ShowVideos() {

    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    // fonction pour compter les lignes sélectionnées de tableau
    const fetch_element_selected = (selected) => {
        SetSelectedRow(selected);
    }

    // fontion pour afficher le tableau de n'interface
    const {
        DataTable,
        currentPage,
        pageSize,
        resetPagination,
    } = UseDataTableVideos({
        columns: constantMedia.columns,
        dataSource: constantMedia.data,
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