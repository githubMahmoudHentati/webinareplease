import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    setResetPasswordConstraintDataOnchange
} from "../store/resetPasswordAction";
import { useParams } from "react-router-dom";



export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const token = new URLSearchParams(window.location.search).get('token') // id=123
    const [ResetPassword, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().resetPassword, {
        variables: { token: token,
            "input":
                values.resetPassword
        }
        ,
        onCompleted: async (data) => {
            if (data.resetPassword.Code === 200)
                dispatch(setResetPasswordConstraintDataOnchange({
                    constraintDataNameChange: "passwordSent",
                    constraintDataValueChange: true
                }))
            else if ((data.resetPassword.Code === 404))
                dispatch(setResetPasswordConstraintDataOnchange({
                    constraintDataNameChange: "tokenInvalid",
                    constraintDataValueChange: true
                }))
            else if ((data.resetPassword.Code === 400))
                dispatch(setResetPasswordConstraintDataOnchange({
                    constraintDataNameChange: "tokenExpired",
                    constraintDataValueChange: true
                }))

            dispatch(setResetPasswordConstraintDataOnchange({
                constraintDataNameChange: "loadingResetPassword",
                constraintDataValueChange: false
            }))

        }
    });
    return({
        ResetPassword,
    })
}

