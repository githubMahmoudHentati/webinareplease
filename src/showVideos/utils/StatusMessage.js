import React from 'react';
import {message} from "antd";

export const StatusMessage = () => {

    //succes delete lang
    const success_Delete = () => {
        message.success({
            content:"cet vidéo a été supprimée avec succès",
            className: 'message-event',
            duration:1.5,
            style: {
                marginTop: '2vh',
            },
        });
    }
    // error delete lang
    const error_Delete = (code) => {
        const messageERROR = {
            400: "Oops!!! il y'a un erreur se produit",
            404:  "Oops!!! cet vidéo n'existe pas",
        }
        message.error({
            content: messageERROR[code],
            duration:1.5
        });
    }
    // error Filter
    const error_Filter = (code) => {
        const messageERROR = {
            400: "Oops!!! il y'a un erreur se produit",
        }
        message.error({
            content: messageERROR[code],
            duration:1.5
        });
    }
    // error GET LIVES
    const error_getLives = (code) => {
        const messageERROR = {
            400: "Oops!!! il y'a un erreur se produit",
        }
        message.error({
            content: messageERROR[code],
            duration:1.5
        });
    }

    return({
        success_Delete,
        error_Delete,
        error_Filter,
        error_getLives
    })
}