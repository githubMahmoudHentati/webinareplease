import React from 'react';
import {message} from "antd";
import i18n from '../../i18n/index';
export const StatusMessages = () =>{

    //succes delete lang
    const success_message_update_password = () => {
        message.success({
            content:i18n.t("ShowVideo.SuccessPassMsg"),
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
            400: i18n.t("ShowVideo.ErrorDelOne"),
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