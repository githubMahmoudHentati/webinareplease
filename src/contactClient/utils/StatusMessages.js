import React from 'react';
import {message} from "antd";
import i18n from '../../i18n/index';
export const StatusMessages = () =>{

    //succes delete lang
    const success_message = () => {
        message.success({
            content:i18n.t("ShowVideo.ErrorMsgOne"),
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
            400: i18n.t("ShowVideo.ErrorMsgTwo"),
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