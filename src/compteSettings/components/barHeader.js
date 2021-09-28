import React ,{useEffect,useRef}from 'react';
import {Row, Col,Button} from 'antd'
import '../compteSettings.scss'
import {ArrowLeftOutlined, CloseOutlined,EditOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Hooks from "../utils/hooks";
import {setAccountSetting, setConstraintDataOnchange} from "../store/accountSettingsAction";
import {useTranslation} from 'react-i18next';


export const BarHeader = () => {
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const history = useHistory()
    const {values} = Hooks()
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const refBar = useRef();
    const selectedMenu = useSelector((state)=> state.Reducer.accountMenu)
    const stickerElm = document.querySelector('.title-col')
    const rootEl = document.querySelector('.App')
    const observer = new IntersectionObserver(
        ([e]) => rootEl.classList.toggle('is-pinned', e.intersectionRatio < 1),
        {threshold: [1]}
    );

    useEffect(() => {
        if(stickerElm) {
            // debugger
            observer.observe(stickerElm)
        }
    }, );

    return (
        <Col ref={refBar} span={24} className={`title-col ${!darkMode?"light":"dark"}`} >
            <Row style={{width: "100%",position:"sticky", top: 0}} justify={"space-between"} >
                <Col style={{display: "flex", alignItems: "center",justifyContent:"center"}} span={15}>
                    <Row style={{display: "flex", alignItems: "center" ,width:"100%"}}className={"account-Setting-Title"} gutter={[15, 0]}>
                        <Col style={{display: "flex", alignItems: "center",justifyContent:"center"}}>
                            <ArrowLeftOutlined
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "500",
                                    fontFamily: "SF Pro Display",
                                    cursor: 'medium',
                                    color: darkMode === false ? "" : "white"
                                }}
                                onClick={() => {
                                    dispatch(setConstraintDataOnchange({
                                        constraintDataNameChange: "updateAccountSettingError",
                                        constraintDataValueChange: false
                                    }))
                                    document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                    document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
                                    history.push("/")
                                }}
                            />
                        </Col>
                        <Col span={20} style={{display: "flex", alignItems: "center"}}>
                            <span className={"account-Setting-Title"} style={{
                                fontSize: "20px",
                                fontFamily: "SF Pro Display",
                                fontWeight: "500",
                                marginLeft: "1%",
                                color: darkMode === false ? "" : "white"
                            }}>{t("CompteSettings.AccountSettings")}</span>
                        </Col>
                    </Row>
                </Col>
                {selectedMenu === 0 &&
                <Col  style={{display: "flex", alignItems: "center"}}>
                    <Row gutter={[15, 0]}>
                        <Col>
                            <Button onClick={() => {
                                dispatch(setConstraintDataOnchange({
                                    constraintDataNameChange: "updateAccountSettingError",
                                    constraintDataValueChange: false
                                }))
                                document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
                                history.push("/")
                            }}
                                    className={"btn_add_live"} style={{
                                fontFamily: "SF Pro Display",
                                fontWeight: "normal",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
                                background: darkMode === false ? "" : "rgba(255, 255, 255, 0.04)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }} icon={<CloseOutlined className={"icon_add_live"}/>}> <span
                                className={"spn_add_live"}>{t("formDirectVideo.Cancel")}</span></Button>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                dispatch(setConstraintDataOnchange({
                                    constraintDataNameChange: "updateAccountSettingError",
                                    constraintDataValueChange: false
                                }))
                            }}
                                    loading={values.constraintData.loadingUpdateAccountSetting}
                                    htmlType="submit" icon={<EditOutlined />} type={"primary"} className={"btn-update-user"}><span
                                className={"spn_add_live"}>{t("CompteSettings.Update")}</span></Button>
                        </Col>
                    </Row>
                </Col>
                }
            </Row>
        </Col>
    )
}
