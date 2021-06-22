import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setFilterVideosActions} from "../store/showVideosAction"
import {ShowVideosReducerReducer} from "../store/showVideosReducer";

export  const Hooks=()=> {

    const dispatch = useDispatch()
    //Filter Data
    const values = useSelector((state) => state.ShowVideosReducerReducer.FilterVideos)
    //Data of Query
    const DataVideos = useSelector((state)=> state.ShowVideosReducerReducer.ListVideos)
    //Pagination Props
    const paginationProps=useSelector((state)=> state.ShowVideosReducerReducer.paginationProps)
    //Sorter Table Props
    const sorterProps = useSelector((state)=> state.ShowVideosReducerReducer.sorterProps)




    //******************Function Data Table************************//

    /*Function Input*/
    const handleSearchRow = (event) => {
        if(event.key === 'Enter') {
            console.log("handleSearchRow", event.target.value, event.target.name)
            dispatch(setFilterVideosActions({
                FilterVideosNameChange: event.target.name,
                FilterVideosValueChange: event.target.value
            }));
        }

    };
    /*Function Select*/
    const handleHeaderSelect = (value,action) => {
        console.log("handleHeaderSelect",action.name, action.value)
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: action.name,
            FilterVideosValueChange: action.value
        }));
    };
    /*Function DatePicker */
    const handleChangeDatePicker = (name, momentValue , dateStringValue) => {
        console.log("handleChangeDatePicker",name ,dateStringValue )
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: name,
            FilterVideosValueChange: dateStringValue
        }));
    }
    /*Filtrer Videos*/
    const handleFiltrerVideos = () =>{
     console.log("handleFiltrerVideos" , values)

    }

    return({
        handleSearchRow,
        handleHeaderSelect,
        handleChangeDatePicker,
        handleFiltrerVideos,
        DataVideos,
        paginationProps,
        values,
        sorterProps
    })


}