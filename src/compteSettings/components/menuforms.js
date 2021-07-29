import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu} from 'antd'
import '../compteSettings.scss'
import {MailOutlined} from '@ant-design/icons';
import {useDispatch , useSelector} from "react-redux";
import {setAccountSetting} from "../../utils/redux/actions";
import { useTranslation } from 'react-i18next';

export const MenuForms =()=>{
    const dispatch = useDispatch()
    const selectedkey = useSelector((state)=> state.Reducer.accountMenu)
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t, i18n } = useTranslation();

    return (
        <Row>
            <Col span={24}>
                <Menu
                    className={"menuCompteSettings"}
                    style={{width:'100%',height:"100%" , backgroundColor:darkMode===false?"":"#141414" , borderRight:darkMode===false?"":"2px solid #1D1D1D"}}
                    selectedKeys={[selectedkey===0?'1':selectedkey===1?'2':selectedkey===2?'2':selectedkey===3?'3':'']}
                    defaultOpenKeys={['sub1']}
                >
                    <Menu.Item className={"menuItem"} key="1" onClick={()=>{dispatch(setAccountSetting(0))}}>
                        {t("description.compte")}
                    </Menu.Item>
                    <Menu.Item className={"menuItem"} key="2" onClick={()=>{dispatch(setAccountSetting(1))}}>
                        {t("description.security")}
                    </Menu.Item>
                    <Menu.Item className={"menuItem"} key="3" onClick={()=>{dispatch(setAccountSetting(3))}}>
                        {t("description.Subscription")}
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    )
}


