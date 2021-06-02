import React,{useState , useEffect} from 'react';
import UseDataTableVideos from "./components/ListVideos";
import HeaderVideos from "./components/headerVideos";
import GlobalHeader from "../utils/components/header"
import { Card } from "antd";
import * as constantMedia from './utils/data';


function ShowVideos() {

    const [selectedRow, SetSelectedRow] = useState(0); //state pour compter le nombre de ligne séléctionner


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
        <div className="showVideosDiv">
            <GlobalHeader/>
            <Card className={"card"}>
                <Card>
                <HeaderVideos selectedRow={selectedRow}/>
                <DataTable/>
                </Card>
            </Card>
        </div>
    );
}

export default ShowVideos;