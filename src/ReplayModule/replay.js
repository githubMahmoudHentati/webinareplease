import React, {useEffect, useState} from "react";
import './replay.scss'
import PlayerIframe from "./components/playerIframe";
import EnterPassword from "./components/enterPassword";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ReplayReducer} from "./store/replayReducer";
import Hooks from "./utils/hooks";
import {useLazyQuery} from "@apollo/client";
import {graphQL_shema} from "./utils/graphQL";
import moment from "moment";
import {setCalendarOnchange} from "../Calendar/store/calendarAction";
import {setReplayInputs} from "./store/replayAction";

const Replay = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const passworddRedux = useSelector((state)=> state.ReplayReducer.Login.password)
    const password = useSelector((state)=> state.ReplayReducer.Login.passwordAPI)

    const {values} = Hooks()

    const [QueryPwd, {data: dataPwd}]
        = useLazyQuery(graphQL_shema().GET_PWD, {
        fetchPolicy: "cache-and-network",
        context: {clientName: "second"},
        onCompleted: async (data) => {
            dispatch(setReplayInputs({ReplayInputNameChange:"passwordAPI",RepalyInputValueChange:data.getPWD}));
        }
    })
    useEffect(()=>{
        console.log("useHistory",history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1))
        let id = history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1)
        QueryPwd({variables: { "id": id}})
    },[])


    return(
        <div className={"Replay"}
        style={
            {
                backgroundColor: darkMode === false ? "#F0F1F4" : "#000000"
            }
        }
        >
            <div className={"div_Header_replay"}
            style={
                {
                    backgroundColor: darkMode === false ? "#FFFFFF" : "#141414"
                }
            }
            >
                <div className="div_home_logo">
                    <div className={'icon_webinaire'}><a href=" " className="icon-logo-webinar icon_Webinaire_svg"
                                                         style={{color: darkMode === false ? "#2B333E" : "white"}}
                                                         onClick={() => history.push("/")}></a></div>
                </div>
            </div>

            {
                (values.Login.confirmPassword) || (password === "")
                    ?
                    <div className={"componentReplayIframe"}>
                        <PlayerIframe/>
                    </div>
                    :
                    <div className={"componentReplay"}>
                        <EnterPassword />
                    </div>
            }
            <div className={"footerDiv"}>
                <span
                    style={
                        {
                            color: darkMode === false ? "RGB(53, 58, 64)" : "RGB(156, 156, 156)",
                        }
                    }
                >
                    © 2021 empreinte.com
                </span>
            </div>
        </div>
    )
}

export default Replay