import {Table, Tag, Space, Badge, Button} from 'antd';
import React, { useState,useEffect,useRef } from 'react';
import '../compteSettings.scss'
import {EyeOutlined,DownloadOutlined} from '@ant-design/icons';


export const SubscriptionTable=()=>{

const columns = [
    {
        title: 'Facture',
        dataIndex: 'charge',
        key: 'charge',
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

const data = [
    {
        key: '1',
        charge: '102402',
        issuedTime: '01/01/2021',
        entitled: 'Forfait pro',
        amount: "99$",
        status: "Nom Non  traité",
        payment:""
    },
    {
        key: '1',
        charge: '102402',
        issuedTime: '01/01/2021',
        entitled: 'Forfait pro',
        amount: "99$",
        status: "Nom Non  traité",
        payment:""
    },
    {
        key: '1',
        charge: '102402',
        issuedTime: '01/01/2021',
        entitled: 'Forfait pro',
        amount: "99$",
        status: "Nom Non  traité",
        payment:""
    },
];

    return(
        <Table columns={columns} dataSource={data} />
    )
}