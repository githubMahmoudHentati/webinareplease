import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Switch,List} from 'antd'
import '../compteSettings.scss'

const SocialTools=()=>{
    const [typePost, setTypePost] = useState([
        {
            type:"Facebook post",
            switch :true
        },
        {
            type:"Youtube post",
            switch :false
        },
        {
            type:"Linkedlin post",
            switch :false
        },
        {
            type:"Twitter post",
            switch :false
        },
        {
            type:"Instagram post",
            switch :false
        }
    ]);

    return(
        <Row  gutter={[0, 25]}>
            <Col span={24}>
                <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Envoi des publications sur les réseau sociaux</span>
            </Col>
            <Col span={24}>

                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={typePost}
                    renderItem={(item,index) => (
                        <List.Item>
                            <Row justify={"space-between"}>
                            <Col >
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "500"}}>{item.type}</span>
                            </Col>
                            <Col>
                                <Switch checked={item.switch}  />
                            </Col>
                        </Row>
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
    )
}