import {message} from 'antd';
import {useDispatch} from "react-redux";
import {setConfirmAccountConstraintDataOnchange} from "../store/forgetPasswordAction";


export const ToastMessage = () => {
    const dispatch = useDispatch()

    const success_submit = async (code) => {
        dispatch(setConfirmAccountConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        const successMessage = {
            200: "mail confirmation est renvoyé, veuillez  vérifier votre courrier électronique  pour  valider l'inscription.",
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
            400: "Point d'accèes invalide, veuillez registrer encore une foix",
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

