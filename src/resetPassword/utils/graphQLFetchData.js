
import {useMutation, useQuery} from "@apollo/client";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    setResetPasswordConstraintDataOnchange
} from "../store/resetPasswordAction";

export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const token = new URLSearchParams(window.location.search).get('token')?new URLSearchParams(window.location.search).get('token'):""

    const {data: VerificationTokenResetPasswordData}
        = useQuery(graphQL_shema().verificationTokenPasswordResetQuery, {
        fetchPolicy: 'cache-and-network',
        variables: { token : token },
        onCompleted: async (data) => {
            if (data.resetPasswordTokenVerification.code === 200) {

            }
            else {
                history.push("/connexion")
            }
        }
    })

    const [ResetPassword] = useMutation(graphQL_shema().resetPassword, {
        variables: { token: token,
            "input":
                values.resetPassword
        }
        ,
        onCompleted: async (data) => {
            if (data.resetPassword.code === 200)
                dispatch(setResetPasswordConstraintDataOnchange({
                    constraintDataNameChange: "passwordSent",
                    constraintDataValueChange: true
                }))
            else if ((data.resetPassword.code === 404))
                dispatch(setResetPasswordConstraintDataOnchange({
                    constraintDataNameChange: "tokenInvalid",
                    constraintDataValueChange: true
                }))
            else if ((data.resetPassword.code === 400))
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
        VerificationTokenResetPasswordData
    })
}

