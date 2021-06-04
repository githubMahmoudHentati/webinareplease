import React,{useState , useEffect} from 'react';
import {useHistory} from 'react-router-dom';

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

let clicked = false;

function GlobalHeader() {
    const history = useHistory()
    const [BackgroundHeader , SetBackgroundHeader] = useState(false);

    //fonction checkbox
    const onChange = (e) =>{
        if(clicked)
        {
            SetBackgroundHeader(false)
            clicked = false;
        }
        else
        {
            SetBackgroundHeader(true)
            clicked = true;
        }
    }


    const MenuHeader = (
        <Menu className="menu">
            <Menu.Item onClick={()=>{history.push("/compteSettings")}} ><UserOutlined />Compte</Menu.Item>
            <Menu.Item><UnlockOutlined />Sécurité</Menu.Item>
            <Menu.Item ><PieChartOutlined />Abonnement</Menu.Item>
            <Menu.Item><LogoutOutlined />Déconnection</Menu.Item>
        </Menu>
    );
    const Menulang = (
        <Menu className="menu">
            <Menu.Item ><UserOutlined />Français</Menu.Item>
            <Menu.Item><UnlockOutlined />Anglais</Menu.Item>
        </Menu>
    );

    return(
        <div className={"Header"} style={{backgroundColor:BackgroundHeader===false?"#ffffff":"#011529"}}>

            <div className="div_home_logo">
               <div className={'icon_webinaire'}><span className="icon-logo-webinar icon_Webinaire_svg" style={{color:BackgroundHeader===false?"":"white"}}></span></div>
                <HomeOutlined className={"Home_Icon"} style={{color:BackgroundHeader===false?"":"white"}}/>
            </div>{/*./div_home_logo*/}

            <div className="div_Notification_user_dar">
                <QuestionCircleOutlined className={"icon_help"} style={{color:BackgroundHeader===false?"":"white"}}/>
                <Badge count={5} className={"Badge"}>
                    <BellOutlined  className={"icon_notification"} style={{color:BackgroundHeader===false?"":"white"}}/>
                </Badge>

                <Dropdown className={"drp_user"} overlay={MenuHeader} trigger={['click']}>
                    <a className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()} style={{color:BackgroundHeader===false?"":"white"}}>
                        <Avatar style={{ backgroundColor: '#419BF9' }} icon={<UserOutlined />} /> Nom d'utilisateur
                    </a>
                </Dropdown>

                <Dropdown className={"drp_lang"} overlay={Menulang} trigger={['click']}>
                        <GlobalOutlined style={{color:BackgroundHeader===false?"":"white"}}/>
                </Dropdown>


                    <label id="switch" className="switch" >
                        <input type="checkbox"
                               id="slider"
                               onClick={()=>onChange()}
                        />
                        <span className="slider"></span>
                    </label>



            </div>

        </div>
    );

}
export default GlobalHeader;