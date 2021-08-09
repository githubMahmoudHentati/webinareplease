import React,{useState , useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {IframeDirectVideo} from './components/IframeDirectVideo'
import {PrincipalPage} from "../utils/components/principalPage";
import {GraphQLFetchDataForm} from "./utils/graphQLFetchDataForm"


function FormDirectVideo() {

    return(
        <PrincipalPage  menuType={"formDirectVideo"}>
            <IframeDirectVideo/>
        </PrincipalPage>
    );
}
export default FormDirectVideo;