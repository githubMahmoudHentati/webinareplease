import {Table, Tag, Space, Badge, Button} from 'antd';
import React, { useState,useEffect,useRef } from 'react';
import '../compteSettings.scss'
import {EyeOutlined,DownloadOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";
import {setPaginationAbonnement} from "../store/accountSettingsAction";
import { useDispatch} from "react-redux";

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 0;

export const SubscriptionTable=()=>{

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    const  {values} = Hooks()

    const columns = [
    {
        title: 'Facture',
        dataIndex: 'bill',
        key: 'bill',
    },
    {
        title: 'Emise le',
        dataIndex: 'issuedTime',
        key: 'issuedTime',
    },
    {
        title: 'Intitulé',
        dataIndex: 'entitled',
        key: 'entitled',
    },
    {
        title: 'Statut',
        key: 'status',
        dataIndex: 'status',
        render: text => <Badge color="#f50" text={text} />,

    },
    {
        title: 'Montant',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Détail',
        key: 'details',
        render: (text, record) => (
            <Space size="middle">
                <a><EyeOutlined /></a>
                <a><DownloadOutlined /></a>
            </Space>
        ),
    },
    {
        title: '',
        dataIndex: 'payment',
        key: 'payment',
        render: (text,record) => <Button  className={"button-payment"} disabled={record.status==="soldée"?true:false}> Payer</Button> ,
    },
];

    const data = {
        totalElements:values.billCount,
        content:values.bills
    }


    const handleTableChange = (pagination, filters, sorter, extra) => {
        console.log('paginationCompteSetting:', pagination, filters, sorter, extra );
        setCurrentPage(pagination.current - 1);

        dispatch(setPaginationAbonnement({PaginationAbonnementNameChange:"pageSize",PaginationAbonnementValueChange:pagination.pageSize}));
        dispatch(setPaginationAbonnement({PaginationAbonnementNameChange:"current",PaginationAbonnementValueChange:sorter&&pagination.current}));

    };


    return(
        <Table
            columns={columns}
            dataSource={data.content}
            rowKey={record => record.id}
            onChange={handleTableChange}
            pagination={{
                pageSize: values.paginationAbonnement.pageSize,
                current: currentPage + 1,
            }}
            scroll={{ y: 240 }}
        />
    )
}