
import {message} from "antd";
import { useTranslation } from 'react-i18next';
import {useDispatch,useSelector} from "react-redux";
import {setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction";

export const StatusMessages = (id) => {
    const dispatch = useDispatch()
    const {t} = useTranslation();
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const success_submit = async (code) => {
        dispatch(setFormDirectLiveConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        const successMessage = {
            200: id ? t("ConfirmAccount.EditedLive") : t("ConfirmAccount.CreatedLive"),
        }
        message.success({
            content: successMessage[code],
            duration: 2,
            style: {
                marginTop: '2vh',
            },
        })
            .then(async () =>
                dispatch(setFormDirectLiveConstraintDataOnchange({
                    constraintDataNameChange: "leaveToast",
                    constraintDataValueChange: true
                }))
            )
    };

    const error_submit = async (code) => {
        const errorMessage = {
            400: id ? t("ConfirmAccount.EditedLiveProblem") : t("ConfirmAccount.CreatedLiveProblem"),
        }
        dispatch(setFormDirectLiveConstraintDataOnchange({
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
                dispatch(setFormDirectLiveConstraintDataOnchange({
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