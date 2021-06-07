import React,{useState , useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    BellFilled,
    BellOutlined,
    UserOutlined,
    UnlockOutlined,
    LogoutOutlined,
    PieChartOutlined,
     GlobalOutlined
} from '@ant-design/icons';
import { Badge , Menu, Dropdown , Avatar} from 'antd';
import {setAccountSetting} from "../redux/actions";
import {setDarkMode} from "../redux/actions";


function GlobalHeader() {
    const dispatch = useDispatch()
    const history = useHistory()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    console.log("darkModeHeader",darkMode)


    //fonction checkbox
    const onChange = (e) =>{
        
        //dispatch redux
        dispatch(setDarkMode(!darkMode))

        // dark mode Breadcrumb
        darkMode&&document.documentElement.style.setProperty('--breadcrumb-color', "#CCCCCC");
        !darkMode&&document.documentElement.style.setProperty('--breadcrumb-color', "#ffffff");

        // darkMode table
        darkMode&&document.documentElement.style.setProperty('--table-color', "");
        !darkMode&&document.documentElement.style.setProperty('--table-color', "#141414");

        // darkMode table cell
        darkMode&&document.documentElement.style.setProperty('--table_cell_color', "");
        !darkMode&&document.documentElement.style.setProperty('--table_cell_color', "#141414");
        darkMode&&document.documentElement.style.setProperty('--table-color2', "");
        !darkMode&&document.documentElement.style.setProperty('--table-color2', "white");
        darkMode&&document.documentElement.style.setProperty('--table-tbody-hover', "");
        !darkMode&&document.documentElement.style.setProperty('--table-tbody-hover', "#141414");

        // darkMode select
        darkMode&&document.documentElement.style.setProperty('--select_color', "");
        !darkMode&&document.documentElement.style.setProperty('--select_color', "#141414");
        darkMode&&document.documentElement.style.setProperty('--select_color2', "");
        !darkMode&&document.documentElement.style.setProperty('--select_color2', "white");

        // darkMode Input
        darkMode&&document.documentElement.style.setProperty('--input_background', "");
        !darkMode&&document.documentElement.style.setProperty('--input_background', "#141414");
        darkMode&&document.documentElement.style.setProperty('--input_color', "");
        !darkMode&&document.documentElement.style.setProperty('--input_color', "white");

        // pagination Next Prev
        darkMode&&document.documentElement.style.setProperty('--ant-pagination-item-link', "");
        !darkMode&&document.documentElement.style.setProperty('--ant-pagination-item-link', "#141414");
        darkMode&&document.documentElement.style.setProperty('--pagination-item-link-color', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination-item-link-color', "white");

        // pagination Item
        darkMode&&document.documentElement.style.setProperty('--pagination-item-background', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination-item-background', "#141414");
        darkMode&&document.documentElement.style.setProperty('--pagination-item-color', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination-item-color', "white");

        // table wrapper
        darkMode&&document.documentElement.style.setProperty('--table-wrapper', "");
        !darkMode&&document.documentElement.style.setProperty('--table-wrapper', "#141414");

        // Selector pagination
        darkMode&&document.documentElement.style.setProperty('--ant-selector_background', "");
        !darkMode&&document.documentElement.style.setProperty('--ant-selector_background', "#141414");
        darkMode&&document.documentElement.style.setProperty('--ant-selector_color', "");
        !darkMode&&document.documentElement.style.setProperty('--ant-selector_color', "white");

        // Input Pagination
        darkMode&&document.documentElement.style.setProperty('--pagination-jumper-color', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination-jumper-color', "white");
        darkMode&&document.documentElement.style.setProperty('--pagination_jumper-background', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination_jumper-background', "#141414");
        darkMode&&document.documentElement.style.setProperty('--pagination-item-color2', "");
        !darkMode&&document.documentElement.style.setProperty('--pagination-item-color2', "white");

        // Table Cell
        darkMode&&document.documentElement.style.setProperty('--table-cell', "");
        !darkMode&&document.documentElement.style.setProperty('--table-cell', "#141414");
        darkMode&&document.documentElement.style.setProperty('--table-cell-border', "#F5F5F5");
        !darkMode&&document.documentElement.style.setProperty('--table-cell-border', "#262626");

        // calendrier
        darkMode&&document.documentElement.style.setProperty('--ant-calendar-days', "");
        !darkMode&&document.documentElement.style.setProperty('--ant-calendar-days', "#141414");
        darkMode&&document.documentElement.style.setProperty('--ant-calendar-days-color', "");
        !darkMode&&document.documentElement.style.setProperty('--ant-calendar-days-color', "white");

        // calendrier
        darkMode&&document.documentElement.style.setProperty('--table_row', "");
        !darkMode&&document.documentElement.style.setProperty('--table_row', "#0C0C0C");


    }



    const MenuHeader = (
        <Menu className="menu">
            <Menu.Item onClick={()=>{history.push("/compteSettings",dispatch(setAccountSetting(0)))}} ><UserOutlined />Compte</Menu.Item>
            <Menu.Item onClick={()=>{history.push("/compteSettings",dispatch(setAccountSetting(1)))}}><UnlockOutlined />Sécurité</Menu.Item>
            <Menu.Item  onClick={()=>{history.push("/compteSettings",dispatch(setAccountSetting(2)))}}><PieChartOutlined />Abonnement</Menu.Item>
            <Menu.Item onClick={()=>{history.push("/compteSettings",dispatch(setAccountSetting(3)))}}><LogoutOutlined />Déconnection</Menu.Item>
        </Menu>
    );
    const Menulang = (
        <Menu className="menu">
            <Menu.Item ><UserOutlined />Français</Menu.Item>
            <Menu.Item><UnlockOutlined />Anglais</Menu.Item>
        </Menu>
    );

    return(
        <div className={"Header"} style={{backgroundColor:darkMode===false?"#ffffff":"#141414"}}>

            <div className="div_home_logo">
               <div className={'icon_webinaire'}><span className="icon-logo-webinar icon_Webinaire_svg" style={{color:darkMode===false?"":"white"}}></span></div>
                <HomeOutlined className={"Home_Icon"} style={{color:darkMode===false?"":"white"}}/>
            </div>{/*./div_home_logo*/}

            <div className="div_Notification_user_dar">
                <QuestionCircleOutlined className={"icon_help"} style={{color:darkMode===false?"":"white"}}/>
                <Badge count={5} className={"Badge"}>
                    <BellOutlined  className={"icon_notification"} style={{color:darkMode===false?"":"white"}}/>
                </Badge>

                <Dropdown className={"drp_user"} overlay={MenuHeader} trigger={['click']}>
                    <a className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()} style={{color:darkMode===false?"":"white"}}>
                        <Avatar style={{ backgroundColor: '#419BF9' }} icon={<UserOutlined />} /> Nom d'utilisateur
                    </a>
                </Dropdown>

                <Dropdown className={"drp_lang"} overlay={Menulang} trigger={['click']}>
                        <GlobalOutlined style={{color:darkMode===false?"":"white"}}/>
                </Dropdown>


                    <label id="switch" className="switch" >
                        <input type="checkbox"
                               id="slider"
                               onClick={()=>onChange()}
                               defaultChecked={darkMode}
                        />
                        <span className="slider"></span>
                    </label>



            </div>

        </div>
    );

}
export default GlobalHeader;