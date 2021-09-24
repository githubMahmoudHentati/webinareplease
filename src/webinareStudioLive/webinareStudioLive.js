import React from 'react';
import {PrincipalPage} from "../utils/components/principalPage";
import './webinareStudioLive.scss'
import {useSelector} from "react-redux";
function IframeStudioLive(){

    // Diffusion Link
    const diffusionLink = useSelector((state)=> state.ShowVideosReducerReducer.DiffusionLink)

    return(
        <PrincipalPage>

            <div className={"Templetes"}>
                <iframe id="inlineFrameExample"
                        allow="display-capture; microphone; camera"
                        allowfullscreen=""
                        frameBorder="0"
                        title="Inline Frame Example"
                        // src={diffusionLink.diffLink}
                         src={diffusionLink.diffLink}
                >
                </iframe>
            </div>

        </PrincipalPage>
    );

}
export default IframeStudioLive