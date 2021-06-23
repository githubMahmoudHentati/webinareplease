import {Table, Tag, Space, Badge, Button} from 'antd';
import React, { useState,useEffect,useRef } from 'react';
import '../compteSettings.scss'
import {EyeOutlined,DownloadOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";


export const SubscriptionTable=()=>{

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
        render: text => <Button  className={"button-payment"}> Payer</Button>,
    },
];


    return(
        <Table columns={columns} dataSource={values.bills} />
    )
}