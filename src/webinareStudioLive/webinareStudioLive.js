import React from 'react';
import {PrincipalPage} from "../utils/components/principalPage";
import './webinareStudioLive.scss'
import {useDispatch, useSelector} from "react-redux";
function IframeStudioLive(){

    // Diffusion Link
    const diffusionLink = useSelector((state)=> state.ShowVideosReducerReducer.DiffusionLink)

    return(
        <PrincipalPage>

            <div className={"Templetes"}>
                {
                    window.process.env.HAS_TRANSLATOR === false
                        ?
                        <iframe id="inlineFrameExample"
                                allow="display-capture; microphone; camera"
                                allowFullScreen=""
                                frameBorder="0"
                                title="Inline Frame Example"
                            // src={diffusionLink.diffLink}
                                src={localStorage.getItem('diffLink') || diffusionLink.diffLink}
                        >
                        </iframe>
                        :
                        <iframe id="inlineFrameExample"
                                allow="display-capture; microphone; camera"
                                allowFullScreen=""
                                frameBorder="0"
                                title="Inline Frame Example"
                            // src={diffusionLink.diffLink}
                                src={localStorage.getItem('diffLinkTr') || diffusionLink.diffLinkTr}
                        >
                        </iframe>
                }
            </div>

        </PrincipalPage>
    );

}
export default IframeStudioLive