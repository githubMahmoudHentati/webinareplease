import {Table, Tag, Space, Badge, Button} from 'antd';
import React, { useState,useEffect,useRef } from 'react';
import '../compteSettings.scss'
import {EyeOutlined,DownloadOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";
import {setPaginationAbonnement} from "../store/accountSettingsAction";
import { useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';

const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_PAGE_NUMBER = 0;

export const SubscriptionTable=()=>{

    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const { t, i18n } = useTranslation();

    const  {values} = Hooks()

    const columns = [
    {
        title: t("CompteSettings.Facture"),
        dataIndex: 'bill',
        key: 'bill',
        width: 80,
        fixed: 'left',
    },
    {
        title: t("CompteSettings.Emise le"),
        dataIndex: 'issuedTime',
        key: 'issuedTime',
        width: 150,
    },
    {
        title: t("CompteSettings.Intitulé"),
        dataIndex: 'entitled',
        key: 'entitled',
    },
    {
        title: t("CompteSettings.Statut"),
        key: 'status',
        dataIndex: 'status',
        render: (text,record) =>{
            return(
            record.status === true ?
                <Badge color="#4bca81" text={"Traitée"} />
                :
                <Badge color="#c23934" text={"Non traitée"} />
            )
        },

    },
    {
        title: t("CompteSettings.Montant"),
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: t("CompteSettings.Détails"),
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

        render: (text,record) =>
        {
            return(
                record.status === false ?
                 <Button  className={"button-payment"}> {t("CompteSettings.Payer")}</Button>
                    :
                    null
              )
        }

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
            scroll={{ x: 700 , y: 240 }}
        />
    )
}