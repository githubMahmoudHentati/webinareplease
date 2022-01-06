import React, {useEffect} from 'react';


import {FormInvitation} from './components/FormInvitation/FormInvitation'
import {HeaderInvitation} from './components/HeaderInvitation/HeaderInvitation'
import {FooterInvitation} from './components/FooterInvitation/FooterInvitation'
import './Invitation.scss'
import {useSelector, useDispatch} from 'react-redux'
import {useGraphQLFetchDataForm} from "./utils/graphQLFetchDataForm";
import {useHistory} from "react-router-dom";
import {setCryptext} from "./store/InvitationFormAction";
export const Invitation = () => {
    const history=useHistory()
    const dispatch=useDispatch()
    const cryptext= useSelector((state)=>state.InvitationReducer.cryptext)
    const infoToRegister= useSelector((state)=>state.InvitationReducer.infoToRegister)
    // const {getInfoToRegister} = useGraphQLFetchDataForm()
    useEffect(()=>{
        console.log("history",history)
        if(history &&  history.location){
            let token = history.location.pathname.replace('/invitation/','')
            dispatch(setCryptext( {payload: token}))
             // getInfoToRegister()
        }
    },[])
    return(
        <div className={`invitation`}>

                <><HeaderInvitation></HeaderInvitation>
                <div className={"invitation-form"}>
                    {
                        cryptext && <FormInvitation/>
                    }
                </div>
                <FooterInvitation></FooterInvitation>
                </>

        </div>
    );
}
