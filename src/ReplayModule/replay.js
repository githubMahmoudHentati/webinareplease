import React from "react";
import './replay.scss'
import PlayerIframe from "./components/playerIframe";
import EnterPassword from "./components/enterPassword";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReplayReducer} from "./store/replayReducer";
import Hooks from "./utils/hooks";

const Replay = () => {

    const history = useHistory()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {values} = Hooks()

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
                values.Login.password  && values.Login.confirmPassword
                    ?
                    <div className={"componentReplayIframe"}>
                        <PlayerIframe/>
                    </div>
                    :
                    <div className={"componentReplay"}>
                        <EnterPassword/>
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