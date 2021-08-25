
import {message} from "antd";

import {useDispatch} from "react-redux";
import {setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction";

export const StatusMessages = (id) => {
    const dispatch = useDispatch()

    const success_submit = async (code) => {
        dispatch(setFormDirectLiveConstraintDataOnchange({
            constraintDataNameChange: "leaveToast",
            constraintDataValueChange: false
        }))
        const successMessage = {
            200: id ? "Le direct est modifié avec success" : "Le direct est crée avec success",
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
            400: id ? "Ooops , il y a  un problème qui s'est produit lors la modification" : "Ooops , il y a  un problème qui s'est produit lors la creation",
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