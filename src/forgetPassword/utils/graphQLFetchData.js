import {useMutation} from "@apollo/client";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {
    setForgetPasswordConstraintDataOnchange
} from "../store/forgetPasswordAction";


export const GraphQLFetchData=(values)=> {

    const dispatch = useDispatch()

    const [ForgetPassword] = useMutation(graphQL_shema().forgetPassword, {
        variables: values.forgetPassword
        ,
        onCompleted: async (data) => {
            if (data.ResetPasswordRequest.code===200)
                {
                    //history.push("/")
                    //dispatch(setAppSetLogin(data.login.Token));
                    //localStorage.setItem('jwtToken', data.login.Token);
                }
            dispatch(setForgetPasswordConstraintDataOnchange({constraintDataNameChange:"loadingForgetPassword",constraintDataValueChange:false}))
            dispatch(setForgetPasswordConstraintDataOnchange({constraintDataNameChange:"passwordSent",constraintDataValueChange:true}))
        }
    });
    return({
        ForgetPassword,
    })
}

