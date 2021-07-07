import React from 'react';
import {useState} from 'react';
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {message} from 'antd';
import {useDispatch} from "react-redux";
import {setConfirmAccountConstraintDataOnchange} from "../store/forgetPasswordAction";


export const ToastMessage = () => {
    const dispatch = useDispatch()

    const success_submit = async (code) => {
        await dispatch(setConfirmAccountConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        const successMessage = {
            200: "Point d'accèes invalide, veuillez registrer encore une foix",
        }
        message.success({
            content: successMessage[code],
            duration: 2,
            style: {
                marginTop: '2vh',
            },
        })
            .then(async () =>
                await dispatch(setConfirmAccountConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )

    };

    const error_submit = async (code) => {
        const errorMessage = {
            400: "Point d'accèes invalide, veuillez registrer encore une foix",
        }
        await dispatch(setConfirmAccountConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        message
            .error({
                content: errorMessage[code],
                duration: 2,
                style: {
                    marginTop: '2vh',
                },
            })
            .then(async () =>
                await dispatch(setConfirmAccountConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )
    };
    return ({
        success_submit,
        error_submit
    })
}

