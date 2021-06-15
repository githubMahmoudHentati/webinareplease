import React,{useState , useEffect} from 'react';

import {IframeDirectVideo} from './components/IframeDirectVideo'
import {PrincipalPage} from "../utils/components/principalPage";


function FormDirectVideo() {

    return(
        <PrincipalPage  menuType={"formDirectVideo"}>
            <IframeDirectVideo/>
        </PrincipalPage>
    );
}
export default FormDirectVideo;