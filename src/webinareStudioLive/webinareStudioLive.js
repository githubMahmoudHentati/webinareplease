import React,{useState , useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {PrincipalPage} from "../utils/components/principalPage";
import './webinareStudioLive.scss'

function IframeStudioLive(){

    return(
        <PrincipalPage>

            <div className={"Templetes"}>
                <iframe id="inlineFrameExample"
                        frameBorder="0"
                        title="Inline Frame Example"
                        src="http://152.228.160.17:7022/room/300-ahmedwk4?userName=admin">
                </iframe>
            </div>

        </PrincipalPage>
    );

}
export default IframeStudioLive