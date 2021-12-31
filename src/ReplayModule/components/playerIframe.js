import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Hooks from "../utils/hooks";

const PlayerIframe = () => {

    const history = useHistory()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const {t} = useTranslation();
    const {handleChangePassword , values , handleConfirmPassword} = Hooks()

    return(
        <div className={"DivIframe"}>
            <div className={"TitleWebinarIframe"}>
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

            <div className="container">
                <iframe className="responsive-iframe" frameBorder="0" src="//k8s-scaleway-test-player.webtv-solution.com/Lt6FO_lsvevqOkYk4zmlgi6JHnAOiQzhnm907UsSmbU?plugin=navigation"></iframe>
            </div>

        </div>
    )
}
export default PlayerIframe