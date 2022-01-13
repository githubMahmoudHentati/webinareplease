import React, {useEffect} from "react";
import { Input , Button} from 'antd';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {LockOutlined } from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import Hooks from "../utils/hooks";
import {Form} from "antd";

const EnterPassword = (props) => {

    const history = useHistory()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const passworddRedux = useSelector((state)=> state.ReplayReducer.Login.password)
    const password = useSelector((state)=> state.ReplayReducer.Login.passwordAPI)
    const enter = useSelector((state)=> state.ReplayReducer.Login.confirmPassword)
    const {t} = useTranslation();
    const {handleChangePassword , values , handleConfirmPassword} = Hooks()

    return(
        <div className={"PasswordDiv"}>
            <div className={"TitleWebinar"}>
                <h1
                    style={
                        {
                            color: darkMode === false ? "RGB(43, 51, 62)" : "#DBDBDB"
                        }
                    }
                >
                    Réunion d’équipe 2021
                </h1>
                <p
                    style={
                        {
                            color: darkMode === false ? "RGB(146, 152, 159)" : "#4E4747"
                        }
                    }
                >
                    Ajouté le 20 décembre 2021 par Patrique .V
                </p>
            </div>

            <div className={"CardEnterPassword"}
                 style={
                     {
                         backgroundColor: darkMode === false ? "#FFFFFF" : "#141414"
                     }
                 }
            >
                <span className={"replaySecurise"}><span className={"spn1"}>🔒</span> {t("replay.secureReplay")}</span>
                <p
                    style={
                        {
                            color: darkMode === false ? "RGB(76, 76, 76)" : "RGB(156, 156, 156)"
                        }
                    }
                >
                    {t("replay.enterAccess")}
                </p>
                <label htmlFor={"input_password"}
                       style={
                           {
                               color: darkMode === false ? "RGB(106, 106, 106)" : "RGB(156, 156, 156)"
                           }
                       }
                >
                    {t("replay.accessPassword")}
                </label>
                <Input
                    placeholder={t("replay.TypePassword")}
                    id={"input_password"}
                    style={
                        {
                            color: darkMode === false ? "RGB(106, 106, 106)" : "RGB(156, 156, 156)",
                            backgroundColor:darkMode === false ? "#FFFFFF" : "transparent",
                            border:darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                        }
                    }
                    value={values.Login.password}
                    onChange={handleChangePassword}
                    required
                />
                {
                    ( enter===false && password !== passworddRedux)
                        ?
                        <span className={"ErrorRequired"}>{t("replay.incorectPwd")}</span>
                        :
                        null
                }

                <div className={"DivEnterPassword"}>
                    <Button type="primary" onClick={handleConfirmPassword}>{t("replay.enter")}</Button>
                </div>
            </div>

        </div>
    )

}
export default EnterPassword