import {message} from 'antd';
import {useDispatch} from "react-redux";
import {setConfirmAccountConstraintDataOnchange} from "../store/forgetPasswordAction";
import { useTranslation } from 'react-i18next';


export const ToastMessage = () => {
    const dispatch = useDispatch()
    const {t} = useTranslation();

    const success_submit = async (code) => {
        dispatch(setConfirmAccountConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        const successMessage = {
            200: t("ConfirmAccount.ResendMailConfirmation"),
        }
        message.success({
            content: successMessage[code],
            duration: 2,
            style: {
                marginTop: '2vh',
            },
        })
            .then(async () =>
                 dispatch(setConfirmAccountConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )
    };

    const error_submit = async (code) => {
        const errorMessage = {
            400:t("ConfirmAccount.InvalidAccessPoint"),
        }
         dispatch(setConfirmAccountConstraintDataOnchange({
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
                 dispatch(setConfirmAccountConstraintDataOnchange({
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

