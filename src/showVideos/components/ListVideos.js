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
    const [record ,  setRecord] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    //const [actionColumnView] = useActionMenuTable({ selectedRow, updateEntityPath , record });
    const history = useHistory();
    // use Selector redux
    const [order , SetOrder]=useState(null) // setOrder
    const [Current , SetCurrent] = useState(null) // set pagination current

    // dispatch order Table
    useEffect(()=>{
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"order",PaginationPropsValueChange:order},
        ));
    },[order])
    // dispatch current Table
    useEffect(()=>{
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"current",PaginationPropsValueChange:Current},
        ))
    },[Current])
    // dispatch page Size Table
    useEffect(()=>{
        dispatch(setPaginationProps(
            {PaginationPropsNameChange:"pageSize",PaginationPropsValueChange:pageSize},
        ))
    },[pageSize])


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

     //old version
     /*setSelectedRowKeys(selectedCheck);
     dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:selectedCheck}));
     dispatch(setshowDivsConditions({showDivsConditionsName:"elementSelected",showDivsConditionsValue:selectedCheck.length}));*/

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

    const handleSingleDelete = () => {
        console.log('handleSingleDelete, selected:', selectedRow);
    };

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
                // rowClassName={record => !record.enabled && "disabled-row"}

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