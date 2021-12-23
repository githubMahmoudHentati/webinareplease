import React from 'react';


import {FormInvitation} from './components/FormInvitation/FormInvitation'
import {HeaderInvitation} from './components/HeaderInvitation/HeaderInvitation'
import {FooterInvitation} from './components/FooterInvitation/FooterInvitation'
import './Invitation.scss'


export const Invitation = () => {

    return(
        <div className={`invitation`}>
            <HeaderInvitation></HeaderInvitation>
            <div className={"invitation-form"}>
                <FormInvitation/>
            </div>
            <FooterInvitation></FooterInvitation>
        </div>
    );
}
