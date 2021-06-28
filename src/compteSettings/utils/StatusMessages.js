import React from 'react';
import {message} from "antd";

export const StatusMessages = () =>{

    //succes delete lang
    const success_message_update_password = () => {
        message.success({
            content:"Votre mot de passe a été modifié avec succès",
            className: 'message-event',
            duration:1.5,
            style: {
                marginTop: '2vh',
            },
        });
    }
    // error delete lang
    const error_message_update_password = (code) => {
        const messageERROR = {
            400: "Oops!!! il y'a un erreur se produit",
        }
        message.error({
            content: messageERROR[code],
            duration:1.5
        });
    }


    return({
        success_message_update_password,
        error_message_update_password
    })

}