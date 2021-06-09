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

    const [back , Setback]=useState(false)




    //fonction checkbox
    const onChange = (e) =>{

        //dispatch redux
        dispatch(setDarkMode(!darkMode));
        ColorComposnat()
    }

    const ColorComposnat=()=>{
        // White Color
        darkMode&&document.documentElement.style.setProperty('--white_color', "rgba(0, 0, 0, 0.85)");
        !darkMode&&document.documentElement.style.setProperty('--white_color', "rgba(255, 255, 255, 0.85)");

        //Dark Color
        darkMode&&document.documentElement.style.setProperty('--dark_color', "rgba(0, 0, 0, 0.04)");
        !darkMode&&document.documentElement.style.setProperty('--dark_color', "rgba(255, 255, 255, 0.04)");

        //border Color
        darkMode&&document.documentElement.style.setProperty('--border_color', "rgba(0, 0, 0, 0.15)");
        !darkMode&&document.documentElement.style.setProperty('--border_color', "rgba(255, 255, 255, 0.15)");

        //Card Color
        darkMode&&document.documentElement.style.setProperty('--card_color', "#FFFFFF");
        !darkMode&&document.documentElement.style.setProperty('--card_color', "#141414");

        //Cell Color
        darkMode&&document.documentElement.style.setProperty('--cell-color', "#FFFFFF");
        !darkMode&&document.documentElement.style.setProperty('--cell-color', "#1D1D1D");

        //option background
        darkMode&&document.documentElement.style.setProperty('--option-background', "#FFFFFF");
        !darkMode&&document.documentElement.style.setProperty('--option-background', "#111d2c");

        //option background
        darkMode&&document.documentElement.style.setProperty('--option_select', "#FFFFFF");
        !darkMode&&document.documentElement.style.setProperty('--option_select', "#1D1D1D");

        // Modal Dark Light
        darkMode&&document.documentElement.style.setProperty('--modal_background', "white");
        !darkMode&&document.documentElement.style.setProperty('--modal_background', "#1D1D1D");

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
                <HomeOutlined className={"Home_Icon"} style={{color:darkMode===false?"":"#007fcb"}}/>
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