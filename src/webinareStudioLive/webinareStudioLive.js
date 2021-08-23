import React,{useState , useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PrincipalPage} from "../utils/components/principalPage";
import './webinareStudioLive.scss'

function IframeStudioLive(){

    // Diffusion Link
    const diffusionLink = useSelector((state)=> state.ShowVideosReducerReducer.DiffusionLink)

    return(
        <PrincipalPage>

            <div className={"Templetes"}>
                <iframe id="inlineFrameExample"
                        frameBorder="0"
                        title="Inline Frame Example"
                        // src={diffusionLink.diffLink}
                         src="https://k8s-test-stream.webtv-solution.com/room/42-E1urW7hqgKHQJ2N?userName=Bou7mid Barhoum"
                >
                </iframe>
            </div>

        </PrincipalPage>
    );

}
export default IframeStudioLive