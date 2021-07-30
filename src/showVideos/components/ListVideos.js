import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import UseActionMenu from "./ActionMenuVideosTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setPaginationProps,
  setshowDivsConditions,
} from "../store/showVideosAction";
import { Hooks } from "../utils/hooks";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUMBER = 1;

function UseDataTableVideos({ columns, dataSource, updateEntityPath }) {
  // Read Data from Hooks
  const { DataVideos, paginationProps, conditions } = Hooks();

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.Reducer.DarkMode);
  const valuePagination = useSelector(
    (state) => state.ShowVideosReducerReducer.paginationProps
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  //const [actionColumnView] = useActionMenuTable({ selectedRow, updateEntityPath , record });
  // use Selector redux

  const onSelectChange = (selectedCheck) => {
    //uncheck checkbox
    let filter = [];
    filter = dataSource.content
      .filter((item) => {
        return !selectedCheck.includes(item.id);
      })
      .map((ele) => ele.id);
    //filter the current state
    /*let filterState = selectedRowKeys.filter((item) => {
        return dataSource.content.includes(item.id);
      })*/
    //concatenate state and selectedcheckboxes
    selectedCheck = [...valuePagination.id, ...selectedCheck];
    //remove some items
    let uniqItems = [...new Set(selectedCheck)];
    let uniqItemsFilter = uniqItems.filter((item) => {
      return !filter.includes(item);
    });
    dispatch(
      setPaginationProps({
        PaginationPropsNameChange: "id",
        PaginationPropsValueChange: uniqItemsFilter,
      })
    );
    dispatch(
      setshowDivsConditions({
        showDivsConditionsName: "elementSelected",
        showDivsConditionsValue: uniqItemsFilter.length,
      })
    );

    setSelectedRowKeys(uniqItemsFilter);
  };
  const rowSelection = {
    selectedRowKeys: valuePagination.id,
    onChange: onSelectChange,
  };

  const updatedColumns = [
    ...columns,
    {
      title: "Actions",
      key: "action",
      render: (action, record) => {
        return <UseActionMenu record={record} />;
      },
    },
  ];

  const resetPagination = () => {
    setCurrentPage(DEFAULT_PAGE_NUMBER);
  };

  const handleTableChange = async(pagination, filters, sorter, extra) => {
    console.log("paginationLives:", pagination, filters, sorter, extra);
  //  setCurrentPage(pagination.current);
   // SetOrder(sorter.order);
  //  setPageSize(pagination.pageSize);
  /************set data to store***************** */
    //dispath sort
    if(valuePagination.order !== sorter.order)
  await  dispatch(
      setPaginationProps({
        PaginationPropsNameChange: "order",
        PaginationPropsValueChange: sorter.order === false ?  "" : sorter.order,
      })
    );
    //dispatch current page
    if(valuePagination.current !== pagination.current)
   { await dispatch(
      setPaginationProps({
        PaginationPropsNameChange: "current",
        PaginationPropsValueChange: pagination.current,
      })
    );
    if(document.querySelector(".showVideo"))
    document.querySelector(".showVideo").scrollIntoView();}
    //dispatch size page
    if(valuePagination.pageSize !== pagination.pageSize)
    await dispatch(
      setPaginationProps({
        PaginationPropsNameChange: "pageSize",
        PaginationPropsValueChange: pagination.pageSize,
      })
    );
    if(valuePagination.columnKey !== sorter.columnKey)
    await dispatch(
      setPaginationProps({
        PaginationPropsNameChange: "columnKey",
        PaginationPropsValueChange: (sorter.columnKey),
      })
    );
    
  };
  const DataTable = () => (
    <div
      className="DataTable"
      style={{ backgroundColor: darkMode === false ? "#ffffff" : "#011529" }}
    >
      <Table
        style={{ backgroundColor: darkMode === false ? "#ffffff" : "#011529" }}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={updatedColumns}
        dataSource={dataSource.content}
        rowClassName={"DataTable__custom-row"}
        onChange={handleTableChange}
        pagination={{
          pageSize: paginationProps.pageSize,
          current: valuePagination.current ,
          total: dataSource.totalElements,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
    </div>
  );

  return {
    DataTable,
    selectedRow,
    selectedRowKeys,
    pageSize,
    resetPagination,
  };
}
export default UseDataTableVideos;
