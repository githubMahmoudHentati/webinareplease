import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {useHistory} from "react-router-dom";
import UseActionMenu from './ActionMenuVideosTable';
import {useSelector} from "react-redux";
import { useDispatch} from "react-redux";
import {setPaginationProps , setshowDivsConditions} from "../store/showVideosAction";
import * as constantMedia from "../utils/data";
import {ShowVideosReducerReducer} from "../store/showVideosReducer";
import {Hooks} from "../utils/hooks";


const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function UseDataTableVideos({ columns, dataSource, updateEntityPath } , ) {

    // Read Data from Hooks
    const {DataVideos , paginationProps , conditions}=Hooks()

    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const valuePagination = useSelector((state)=> state.ShowVideosReducerReducer.PaginationProps)


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    // use Selector redux
    const [order , SetOrder]=useState(null) // setOrder
    const [Current , SetCurrent] = useState(null) // set pagination current

    // dispatch order Table
    useEffect(()=>{
        if(order)
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"order",PaginationPropsValueChange:order},
        ));
        else if(Current){
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"current",PaginationPropsValueChange:Current},
        ))
        if(document.querySelector(".showVideo"))
        document.querySelector(".showVideo").scrollIntoView();
    }
        else if (pageSize)
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"pageSize",PaginationPropsValueChange:pageSize},
        ))
        else return
    },[order, Current, pageSize, dispatch])
   

    const  onSelectChange = (selectedCheck)  => {  
    //uncheck checkbox  
    let filter =[]
        filter =  dataSource.content.filter(item => {
            return (!selectedCheck.includes(item.id))
        }).map(ele => ele.id)  
      
      
   selectedCheck = [...selectedRowKeys, ...selectedCheck]
   let uniqItems = [...new Set(selectedCheck)];
   let uniqItemsFilter =  uniqItems.filter(item => {
    return (!filter.includes(item))
})  
   dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:uniqItemsFilter}));
   dispatch(setshowDivsConditions({showDivsConditionsName:"elementSelected",showDivsConditionsValue:uniqItemsFilter.length}));

     setSelectedRowKeys(uniqItemsFilter);

    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    };

    const updatedColumns = [
        ...columns,
        {
            title: 'Actions',
            key: 'action',
            render: (action, record) =>{
                return(
                    <UseActionMenu record={record}/>
                )
            }

        },
    ];

    useEffect(() => {
        console.log('columns:', columns);
        console.log('datasoure:', dataSource);
        console.log('updateColumns:', updatedColumns);
    });

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination, filters, sorter, extra) => {
        console.log('paginationLives:', pagination, filters, sorter, extra );
        setCurrentPage(pagination.current - 1);
        SetOrder(sorter.order)
        SetCurrent(pagination.current)
        setPageSize(pagination.pageSize)
    };

    const DataTable = () => (
        <div className="DataTable" style={{backgroundColor:darkMode===false?"#ffffff":"#011529"}}>
            <Table
                style={{backgroundColor:darkMode===false?"#ffffff":"#011529"}}
                rowKey={record => record.id}
                rowSelection={rowSelection}
                columns={updatedColumns}
                dataSource={dataSource.content}
                rowClassName={"DataTable__custom-row"}

                onChange={handleTableChange}
                pagination={{
                    pageSize: paginationProps.pageSize,
                    current: currentPage + 1,
                    total: dataSource.totalElements,
                    showQuickJumper:true,
                    showSizeChanger:true
                }}

            />
        </div>
    );

    return{
        DataTable,
        selectedRow,
        selectedRowKeys,
        currentPage,
        pageSize,
        resetPagination,
    };

}
export default UseDataTableVideos;