import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import {useHistory} from "react-router-dom";
import UseActionMenu from './ActionMenuVideosTable';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 0;

function UseDataTableVideos({ columns, dataSource, updateEntityPath } , fetch_elments_selected) {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [record ,  setRecord] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    //const [actionColumnView] = useActionMenuTable({ selectedRow, updateEntityPath , record });
    const history = useHistory();

    const  onSelectChange = (selectedRowKeys ,  record) => {
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

    const handleTableChange = pagination => {
        console.log('pagination:', pagination);
        setCurrentPage(pagination.current - 1);
    };

    const DataTable = () => (
        <div className="DataTable">
            <Table
                rowKey={record => record.id}
                rowSelection={rowSelection}
                columns={updatedColumns}
                dataSource={dataSource.content}
                onChange={handleTableChange}
                pagination={{
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