import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {useHistory} from "react-router-dom";
import UseActionMenu from './ActionMenuVideosTable';
import {useSelector} from "react-redux";
import { useDispatch} from "react-redux";
import {setPaginationProps} from "../store/showVideosAction";
import * as constantMedia from "../utils/data";
import {ShowVideosReducerReducer} from "../store/showVideosReducer";
import {Hooks} from "../utils/hooks";


const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function UseDataTableVideos({ columns, dataSource, updateEntityPath } , fetch_elments_selected) {

    // Read Data from Hooks
    const {DataVideos , paginationProps}=Hooks()

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



    const  onSelectChange = selectedRowKeys  => {
        setSelectedRowKeys(selectedRowKeys);
        console.log(`selected : ${selectedRowKeys}`);
        fetch_elments_selected(selectedRowKeys.length);
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
        dispatch(setPaginationProps({PaginationPropsNameChange:"pageSize",PaginationPropsValueChange:pagination.pageSize}));
        dispatch(setPaginationProps({PaginationPropsNameChange:"order",PaginationPropsValueChange:sorter&&sorter.order}));
        dispatch(setPaginationProps({PaginationPropsNameChange:"columnKey",PaginationPropsValueChange:sorter&&sorter.columnKey}));
        dispatch(setPaginationProps({PaginationPropsNameChange:"current",PaginationPropsValueChange:sorter&&pagination.current}));
    };


    const DataTable = () => (
        <div className="DataTable" style={{backgroundColor:darkMode===false?"#ffffff":"#011529"}}>
            <Table
                style={{backgroundColor:darkMode===false?"#ffffff":"#011529"}}
                rowKey={record => record.id}
                rowSelection={rowSelection}
                columns={updatedColumns}
                dataSource={dataSource.content}
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