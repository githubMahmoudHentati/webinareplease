import React, {useState, useEffect} from 'react';
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
    GlobalOutlined,
} from '@ant-design/icons';
import {Badge, Menu, Dropdown, Avatar} from 'antd';
import {setAccountSetting, setAppSetLogin,setAppSetLogout} from "../redux/actions";
import {changeLangEN,changeLangFR} from "../redux/actions"
import {setDarkMode} from "../redux/actions";
import {setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";
import {CSSTransition} from 'react-transition-group';


import {useTranslation} from "react-i18next";

function GlobalHeader() {

    const dispatch = useDispatch()
    const history = useHistory()
    const darkMode = useSelector((state) => state.Reducer.DarkMode)

    const [activeSideMenuState, SetActiveSideMenuState] = useState(false)

    // Clic outside Side Bar
    useEffect(() => {
        function HEADERGOTO(event) {

            var noRedirect = '.side-nav * , .hambg_button * '
            if (!event.target.matches(noRedirect)) {
                SetActiveSideMenuState(false)
            }
        };
        document.body.addEventListener('click', HEADERGOTO);
    }, []);

    //fonction checkbox
    const onChange = (e) => {

        //dispatch redux
        dispatch(setDarkMode(!darkMode));
        //const dark = localStorage.getItem('darkMode')?localStorage.getItem('darkMode'):false;
        ColorComposant();
        // setter
        localStorage.setItem('darkMode', darkMode);
    }

    const ColorComposant = () => {
        // White Color
        darkMode && document.documentElement.style.setProperty('--white_color', "rgba(0, 0, 0, 0.85)");
        !darkMode && document.documentElement.style.setProperty('--white_color', "rgba(255, 255, 255, 0.85)");

        // White Color
        darkMode && document.documentElement.style.setProperty('--separator-color', "rgba(0, 0, 0, 0.45)");
        !darkMode && document.documentElement.style.setProperty('--separator-color', "rgba(255, 255, 255, 0.85)");

        //Dark Color
        darkMode && document.documentElement.style.setProperty('--dark_color', "rgba(0, 0, 0, 0.04)");
        !darkMode && document.documentElement.style.setProperty('--dark_color', "rgba(255, 255, 255, 0.04)");

        //border Color
        darkMode && document.documentElement.style.setProperty('--border_color', "rgba(0, 0, 0, 0.15)");
        !darkMode && document.documentElement.style.setProperty('--border_color', "rgba(255, 255, 255, 0.15)");

        //Card Color
        darkMode && document.documentElement.style.setProperty('--card_color', "#FFFFFF");
        !darkMode && document.documentElement.style.setProperty('--card_color', "#141414");

        //Cell Color
        darkMode && document.documentElement.style.setProperty('--cell-color', "#FFFFFF");
        !darkMode && document.documentElement.style.setProperty('--cell-color', "#1D1D1D");

        //option background
        darkMode && document.documentElement.style.setProperty('--option-background', "#F5F5F5");
        !darkMode && document.documentElement.style.setProperty('--option-background', "#111d2c");

        //item menu background
        darkMode && document.documentElement.style.setProperty('--item-menu-background', "#e7f7ff");
        !darkMode && document.documentElement.style.setProperty('--item-menu-background', "#111d2c");
        darkMode && document.documentElement.style.setProperty('--item-menu-color', "rgba(0, 0, 0, 0.65)");
        !darkMode && document.documentElement.style.setProperty('--item-menu-color', "rgba(255, 255, 255, 0.65)");

        //option background
        darkMode && document.documentElement.style.setProperty('--option_select', "#FFFFFF");
        !darkMode && document.documentElement.style.setProperty('--option_select', "#1D1D1D");

        // Modal Dark Light
        darkMode && document.documentElement.style.setProperty('--modal_background', "white");
        !darkMode && document.documentElement.style.setProperty('--modal_background', "#1D1D1D");

        // Menu Color
        darkMode && document.documentElement.style.setProperty('--menu-background', "#E6F7FF");
        !darkMode && document.documentElement.style.setProperty('--menu-background', "#111d2c");
        darkMode && document.documentElement.style.setProperty('--menu-color', "#2B96FF");
        !darkMode && document.documentElement.style.setProperty('--menu-color', "#2B96FF");
        darkMode && document.documentElement.style.setProperty('--menu-border', "#2090FF");
        !darkMode && document.documentElement.style.setProperty('--menu-border', "#2090FF");

        // Switch Color
        darkMode && document.documentElement.style.setProperty('--Switch-Color', "#BFBFBF");
        !darkMode && document.documentElement.style.setProperty('--Switch-Color', "#4E4E4E");


        // Tag Green dark light mode
        darkMode && document.documentElement.style.setProperty('--tag-green-background', "#f6ffed");
        !darkMode && document.documentElement.style.setProperty('--tag-green-background', "#162312");
        darkMode && document.documentElement.style.setProperty('--tag-green-border', "#b7eb8f");
        !darkMode && document.documentElement.style.setProperty('--tag-green-border', "#274916");

        // Tag Blue dark light mode
        darkMode && document.documentElement.style.setProperty('--tag-blue-background', "#e6f7ff");
        !darkMode && document.documentElement.style.setProperty('--tag-blue-background', "#111d2c");
        darkMode && document.documentElement.style.setProperty('--tag-blue-border', "#91d5ff");
        !darkMode && document.documentElement.style.setProperty('--tag-blue-border', "#15395b");

        // Tag Geekblue dark light mode
        darkMode && document.documentElement.style.setProperty('--tag-Geekblue-background', "rgba(0, 0, 0, 0.04)");
        !darkMode && document.documentElement.style.setProperty('--tag-Geekblue-background', "rgba(255, 255, 255, 0.04)");
        darkMode && document.documentElement.style.setProperty('--tag-Geekblue-border', "rgba(0, 0, 0, 0.15)");
        !darkMode && document.documentElement.style.setProperty('--tag-Geekblue-border', "rgba(255, 255, 255, 0.2)");
        darkMode && document.documentElement.style.setProperty('--tag-Geekblue-color', "rgba(0, 0, 0, 0.65)");
        !darkMode && document.documentElement.style.setProperty('--tag-Geekblue-color', "rgba(255, 255, 255, 0.65)");


        // Tag Geekblue dark light mode
        darkMode && document.documentElement.style.setProperty('--color-tag-text-blue', "#007fcb");
        !darkMode && document.documentElement.style.setProperty('--color-tag-text-blue', "rgba(255, 255, 255, 0.85)");
        darkMode && document.documentElement.style.setProperty('--color-tag-text-green', "#52c41a");
        !darkMode && document.documentElement.style.setProperty('--color-tag-text-green', "#52c41a");
        darkMode && document.documentElement.style.setProperty('--color-tag-text-gray', "rgba(0, 0, 0, 0.65)");
        !darkMode && document.documentElement.style.setProperty('--color-tag-text-gray', "rgba(255, 255, 255, 0.65)");

    }


    const logOut = () => {
        history.push("/connexion", dispatch(setAccountSetting(4)))
        dispatch(setAppSetLogout());
        localStorage.removeItem('jwtToken');

        dispatch(setConstraintDataOnchange({
            constraintDataNameChange: "updateAccountSettingError",
            constraintDataValueChange: false
        }))
        document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        history.push("/")
    }


    const {t, i18n} = useTranslation();
    let firstName=  localStorage.getItem('firstName')
    let lastName=   localStorage.getItem('lastName')
    let avatar = (localStorage.getItem('avatar') ? localStorage.getItem('avatar') : '')
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    const MenuHeader = (
        <Menu className="menu">
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(0)))
            }}><UserOutlined/>{t("description.Account")}</Menu.Item>
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(1)))
            }}><UnlockOutlined/>{t("description.security")}</Menu.Item>
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(3)))
            }}><PieChartOutlined/>{t("description.Subscription")}</Menu.Item>
            <Menu.Item onClick={logOut}><LogoutOutlined/>{t("description.LogOut")}</Menu.Item>
        </Menu>
    );
    const Menulang = (
        <Menu className="menu">
            <Menu.Item onClick={() => {
                changeLanguage('fr');
                 dispatch(changeLangFR())
            }}>
                 <span className="icon-fr">
                     <span className="path1"></span>
                     <span className="path2"></span>
                     <span className="path3"></span><span className="path4"></span>
                 </span> {t("lang2")}
            </Menu.Item>
            <Menu.Item onClick={() => {
                changeLanguage('en');
                 dispatch(changeLangEN())
            }}>
                <span className="icon-ang">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span><span className="path4"></span>
                    <span className="path5"></span>
                </span> {t("lang1")}
            </Menu.Item>
        </Menu>
    );
    const Menulang1 = (
        <Menu className="menu">
            <Menu.Item onClick={() => changeLanguage('fr')}>
                 <span className="icon-fr">
                     <span className="path1"></span>
                     <span className="path2"></span>
                     <span className="path3"></span><span className="path4"></span>
                 </span> {t("lang2")}
            </Menu.Item>
            <Menu.Item onClick={() => changeLanguage('en')}>
                <span className="icon-ang">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span><span className="path4"></span>
                    <span className="path5"></span>
                </span> {t("lang1")}
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={"div_Header"}>
            <div className={"Header"} style={{backgroundColor: darkMode === false ? "#ffffff" : "#141414"}}>

                <div className="div_home_logo">
                    <div className={'icon_webinaire'}><span className="icon-logo-webinar icon_Webinaire_svg"
                                                            style={{color: darkMode === false ? "" : "white"}}
                                                            onClick={() => {
                                                                history.push("/")
                                                            }}></span></div>
                    <HomeOutlined className={"Home_Icon"} style={{color: darkMode === false ? "" : "#007fcb"}}
                                  onClick={() => {
                                      history.push("/")
                                  }}/>
                </div>
                {/*./div_home_logo*/}


                {/*div_hambg_button*/}
                <div className={"hambg_button"}>
                    <MenuFoldOutlined id={"id_menu_hamg"} className={"menu_hamg"} onClick={() => {
                        SetActiveSideMenuState(true)
                    }}/>
                </div>
                {/*div_hambg_button*/}


                <div className="div_Notification_user_dar">
                    <QuestionCircleOutlined className={"icon_help"} style={{color: darkMode === false ? "" : "white"}}/>
                    <Badge count={5} className={"Badge"}>
                        <BellOutlined className={"icon_notification"}
                                      style={{color: darkMode === false ? "" : "white"}}/>
                    </Badge>

                    <Dropdown className={"drp_user"} overlay={MenuHeader} trigger={['click']}>
                        <a className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()}
                           style={{color: darkMode === false ? "" : "white"}}>
                            <Avatar style={{backgroundColor: '#419BF9'}}
                                    src={avatar}
                                    icon={!avatar ? <UserOutlined/> : ""} />
                            {
                                firstName || lastName ?
                                    <div className={"avatar-userName"}>
                                        <div className={"avatar-firstName"}>{firstName}</div>
                                        <div className={"avatar-lastName"}>{lastName}</div>
                                    </div>
                                    :
                                    t('description.firstName')
                            }
                        </a>
                    </Dropdown>

                    <Dropdown className={"drp_lang"} overlay={Menulang} trigger={['click']}>
                        <GlobalOutlined style={{color: darkMode === false ? "" : "white"}}/>
                    </Dropdown>


                    <label id="switch" className="switch">
                        <input type="checkbox"
                               id="slider"
                               onClick={() => onChange()}
                               defaultChecked={darkMode}
                        />
                        <span className="slider"></span>
                    </label>


                </div>

            </div>

            {
                activeSideMenuState === true
                    ?
                    <div className={"side-nav"} id={"side-menu"}>

                        <div className={"div1_side_nav"}>
                            <MenuUnfoldOutlined className={"menuhamg-close"} onClick={() => {
                                SetActiveSideMenuState(false)
                            }}/>
                            <label id="switch" className="switch">
                                <input type="checkbox"
                                       id="slider"
                                       onClick={onChange}
                                       defaultChecked={darkMode}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className={"div2_side_nav"}>
                            <div className={"div1_div2_side_nav"}>
                                <a className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()}
                                   style={{color: darkMode === false ? "" : "white"}}>
                                    <Avatar style={{backgroundColor: '#419BF9'}}
                                            src={avatar}
                                            className={"avtr"}
                                            icon={!avatar ? <UserOutlined/> : ""} />
                                    {
                                        firstName || lastName ?
                                            <div className={"avatar-userName"}>
                                                <div className={"avatar-firstName"}>{firstName}</div>
                                                <div className={"avatar-lastName"}>{lastName}</div>
                                            </div>
                                            :
                                            t('description.firstName')
                                    }
                                </a>
                            </div>

                            <div className={"div2_div2_side_nav"}>
                                <a className="ant-dropdown-link link_drp" onClick={() => {
                                    history.push("/compteSettings", dispatch(setAccountSetting(0)), SetActiveSideMenuState(false))
                                }} style={{color: darkMode === false ? "" : "white"}}>
                                    <UserOutlined className={"avtr"}/><span>{t("description.Account")}</span>
                                </a>
                                <a className="ant-dropdown-link link_drp" onClick={() => {
                                    history.push("/compteSettings", dispatch(setAccountSetting(1)), SetActiveSideMenuState(false))
                                }} style={{color: darkMode === false ? "" : "white"}}>
                                    <UnlockOutlined className={"avtr"}/><span>{t("description.security")}</span>
                                </a>
                                <a className="ant-dropdown-link link_drp" onClick={() => {
                                    history.push("/compteSettings", dispatch(setAccountSetting(3)), SetActiveSideMenuState(false))
                                }} style={{color: darkMode === false ? "" : "white"}}>
                                    <PieChartOutlined className={"avtr"}/><span>{t("description.Subscription")}</span>
                                </a>
                            </div>

                            <div className={"div3_div2_side_nav"}>
                                <Dropdown className={"drp_lang"} overlay={Menulang1} trigger={['click']}>
                                    <div><GlobalOutlined style={{color: darkMode === false ? "" : "white"}}
                                                         className={"avtr"}/> <span
                                        className={"spnwhite"}>{t("description.Language")}</span></div>
                                </Dropdown>
                                <div className={"aide_div"}><QuestionCircleOutlined className={"icon_help"}
                                                                                    style={{color: darkMode === false ? "" : "white"}}/><span
                                    className={"spnwhite"}>{t("description.aide")}</span></div>
                            </div>

                            <div className={"div4_div2_side_nav"}>
                                <a className="ant-dropdown-link link_drp" onClick={logOut}
                                   style={{color: darkMode === false ? "" : "white"}}>
                                    <LogoutOutlined
                                        className={"logout-icon"}/><span>{t("description.LogOut")}</span>
                                </a>
                            </div>
                        </div>

                    </div>
                    :
                    null
            }


            {
                activeSideMenuState === true
                    ?
                    <div className={"overley"}>

                    </div>
                    :
                    null

            }

        </div>
    );

}

export default GlobalHeader;