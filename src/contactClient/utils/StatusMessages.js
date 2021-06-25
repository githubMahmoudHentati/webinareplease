import React from 'react';
import {message} from "antd";

export const StatusMessages = () =>{

    //succes delete lang
    const success_message = () => {
        message.success({
            content:"votre message a été envoyé avec succès",
            className: 'message-event',
            duration:1.5,
            style: {
                marginTop: '2vh',
            },
        });
    }
    // error delete lang
    const error_message = (code) => {
        const messageERROR = {
            400: "Oops!!! il y'a un erreur se produit",
        }
        message.error({
            content: messageERROR[code],
            duration:1.5
        });
    }


    return({
        success_message,
        error_message
    })

}