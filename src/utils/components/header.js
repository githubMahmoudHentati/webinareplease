import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    UserOutlined,
    UnlockOutlined,
    LogoutOutlined,
    PieChartOutlined,
    GlobalOutlined,
    CaretRightOutlined ,
    CaretDownOutlined,
    DownOutlined,
    RightOutlined
} from '@ant-design/icons';
import {Menu, Dropdown, Avatar} from 'antd';
import {setAccountSetting, setAppSetLogout} from "../redux/actions";
import {changeLang} from "../redux/actions"
import {setDarkMode} from "../redux/actions";
import {setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";


import {useTranslation} from "react-i18next";

function GlobalHeader() {
    const [activeSideMenuState, SetActiveSideMenuState] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const [arrow ,  setArrow] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);

    // Clic outside Side Bar
    useEffect(() => {
        function HEADERGOTO(event) {

            var noRedirect = '.side-nav * , .hambg_button * , .side-nav , .anticon , .div_caretDownOutlined , .div_caretRightOutlined '
            if (!event.target.matches(noRedirect)) {
                SetActiveSideMenuState(false)
            }
        };
        document.body.addEventListener('click', HEADERGOTO);
    }, [activeSideMenuState , dispatch]);

    //fonction checkbox
    const onChange = (e) => {
        const root = document.querySelector(':root')
        if(darkMode){
            root.classList.remove('dark')
            root.classList.add('light')
           }
           else {
            root.classList.remove('light')
            root.classList.add('dark')
           }
        localStorage.setItem('darkMode', e.target.checked);
        dispatch(setDarkMode(e.target.checked));
    }

  useEffect(()=>{
    const root = document.querySelector(':root')
    
   if(darkMode){
    root.classList.remove('light')
    root.classList.add('dark')
   }
   else {
    root.classList.remove('dark')
    root.classList.add('light')
   }
  },[darkMode])
   
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
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        i18n.locale=lang;
        dispatch(changeLang(lang))
    }

    const MenuHeader = (
        <Menu className="menu">
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(0)))
            }}><UserOutlined className={"dropdownIcon"}/>{t("description.Account")}</Menu.Item>
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(1)))
            }}><UnlockOutlined className={"dropdownIcon"}/>{t("description.security")}</Menu.Item>
            <Menu.Item onClick={() => {
                history.push("/compteSettings", dispatch(setAccountSetting(3)))
            }}><PieChartOutlined className={"dropdownIcon"}/>{t("description.Subscription")}</Menu.Item>
            <Menu.Item onClick={logOut}><LogoutOutlined className={"dropdownIcon"}/>{t("description.LogOut")}</Menu.Item>
        </Menu>
    );
    const Menulang = (
        <Menu className="menu menu-lang">
            <Menu.Item  onClick={() => changeLanguage('fr')}>
                <div className={"menuItemLang"}>
                 <span className="icon-fr">
                     <span className="path1"></span>
                     <span className="path2"></span>
                     <span className="path3"></span><span className="path4"></span>
                 </span> <span className={"dropdowlangIcon"}>{t("lang2")}</span></div>
            </Menu.Item>
            <Menu.Item className={"menuItemLang"} onClick={() => changeLanguage('en')}>
                <div className={"menuItemLang"}>
                <span className="icon-ang">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span><span className="path4"></span>
                    <span className="path5"></span>
                </span> <span className={"dropdowlangIcon"}>{t("lang1")}</span></div>
            </Menu.Item>
        </Menu>

    );

    const handleClickLang = ()=>{
        setArrow(!arrow)
    }

    return (
        <div className={"div_Header"}>
            <div className={isScrolled ? "Header scrolled" : "Header"} style={{backgroundColor: darkMode === false ? "#ffffff" : "#141414"}}>

                <div className="div_home_logo">
                    <div className={'icon_webinaire'}><a href=" " className="icon-logo-webinar icon_Webinaire_svg"
                                                            style={{color: darkMode === false ? "#2B333E" : "white"}}
                                                            onClick={() => history.push("/")}></a></div>
                    <div className="div_home_icon"><a href=" " onClick={() => history.push("/")}><HomeOutlined className={"Home_Icon"} style={{color: darkMode === false ? "" : "#007fcb"}}
                    /></a></div>
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
                    {/*<QuestionCircleOutlined className={"icon_help"} style={{color: darkMode === false ? "" : "white"}}/>*/}
                    {/*<Badge count={5} className={"Badge"}>*/}
                    {/*    <BellOutlined className={"icon_notification"}*/}
                    {/*                  style={{color: darkMode === false ? "" : "white"}}/>*/}
                    {/*</Badge>*/}

                    <Dropdown getPopupContainer={() => document.querySelector(".drp_user")} className={"drp_user"} overlay={MenuHeader} trigger={['click']}>
                        <a  className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()}

                           style={{color: darkMode === false ? "" : "white"}}>
                            <Avatar style={{backgroundColor: darkMode?"#1D1D1D":'#F0F1F4'}}
                                    src={avatar}
                                    icon={!avatar ? <UserOutlined /> : ""} />
                            {
                                firstName || lastName ?
                                    <div className={"avatar-userName"}>
                                        <div className={"avatar-lastName"}>{lastName}</div>
                                        <div className={"avatar-firstName"}>{firstName}</div>
                                    </div>
                                    :
                                    t('description.firstName')
                            }
                        </a>
                    </Dropdown>

                    <Dropdown getPopupContainer={() => document.querySelector(".drp_lang")} className={"drp_lang drp-lang-size"} overlay={Menulang} trigger={['click']}>
                        <GlobalOutlined style={{color: darkMode === false ? "" : "white"}}/>
                    </Dropdown>


                    <label id="switch" className="switch">
                        <input type="checkbox"
                               id="slider"
                               onClick={onChange}
                               checked={darkMode}
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
                                <a href="#/" className="ant-dropdown-link link_drp" onClick={e => e.preventDefault()}
                                   style={{color: darkMode === false ? "" : "white"}}>
                                    <Avatar style={{backgroundColor: '#419BF9'}}
                                            src={avatar}
                                            className={"avtr"}
                                            icon={!avatar ? <UserOutlined/> : ""} />
                                    {
                                        firstName || lastName ?
                                            <div className={"avatar-userName"}>
                                                <div className={"avatar-lastName"}>{lastName}</div>
                                                <div className={"avatar-firstName"}>{firstName}</div>
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
                                <a  className="ant-dropdown-link link_drp" onClick={() => {
                                    history.push("/compteSettings", dispatch(setAccountSetting(1)), SetActiveSideMenuState(false))
                                }} style={{color: darkMode === false ? "" : "white"}}>
                                    <UnlockOutlined className={"avtr"}/><span>{t("description.security")}</span>
                                </a>
                                <a  className="ant-dropdown-link link_drp" onClick={() => {
                                    history.push("/compteSettings", dispatch(setAccountSetting(3)), SetActiveSideMenuState(false))
                                }} style={{color: darkMode === false ? "" : "white"}}>
                                    <PieChartOutlined className={"avtr"}/><span>{t("description.Subscription")}</span>
                                </a>
                            </div>

                            <div className={"div3_div2_side_nav"}>

                                <div className={"lang_div"} onClick={()=> setArrow(!arrow)}>
                                    <Dropdown className={"drp_lang"} overlay={Menulang} trigger={['click']} >
                                        <div><GlobalOutlined style={{color: darkMode === false ? "" : "white"}}
                                                             className={"avtr"}/> <span
                                            className={"titleLang"}>{t("description.Language")}</span></div>
                                    </Dropdown>
                                    {
                                        arrow
                                            ?
                                            <div className={"div_caretDownOutlined"}><span className={"arrow-lang1"}>▼</span></div>
                                            :
                                            <div className={"div_caretRightOutlined"}><span className={"arrow-lang"}>►</span></div>
                                    }
                                </div>{/*Div-Langue*/}
                                {
                                    arrow
                                        ?
                                    <div className={"langIconDiv"}>
                                        <div className={"langIconDiv1"} onClick={() => changeLanguage('fr')}>
                                      <span className="icon-fr">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                      <span className="path3"></span><span className="path4"></span>
                                      </span> <span className={"titleLang"}>{t("lang2")}</span>
                                        </div>

                                        <div className={"langIconDiv2"} onClick={() => changeLanguage('en')}>
                                    <span className="icon-ang">
                                  <span className="path1"></span>
                                   <span className="path2"></span>
                                  <span className="path3"></span><span className="path4"></span>
                                  <span className="path5"></span>
                                    </span> <span className={"titleLang"}>{t("lang1")}</span></div>
                                    </div>
                                    :
                                    null

                                }

                                {/*<div className={"aide_div"}><QuestionCircleOutlined className={"avtr"} style={{color: darkMode === false ? "" : "white"}}/><span*/}
                                {/*    className={"titleLang"}>{t("description.aide")}</span>*/}
                                {/*</div>*/}

                                </div>

                            <div className={"div4_div2_side_nav"}>
                                <a  className="ant-dropdown-link link_drp" onClick={logOut}
                                   style={{color: darkMode === false ? "" : "white"}}>
                                    <LogoutOutlined
                                        className={"avtr"}/><span>{t("description.LogOut")}</span>
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