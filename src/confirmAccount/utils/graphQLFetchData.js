import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    setForgetPasswordConstraintDataOnchange
} from "../store/forgetPasswordAction";


export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()


    const [ForgetPassword, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().forgetPassword, {
        variables: values.forgetPassword
        ,
        onCompleted: async (data) => {
            if (data.ResetPasswordRequest.Code===200)
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

