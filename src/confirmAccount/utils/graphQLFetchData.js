import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    setForgetPasswordConstraintDataOnchange
} from "../store/forgetPasswordAction";
import {ToastMessage} from "./toastMessage";


export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {success_submit,error_submit}=ToastMessage()

    const tokenConfirmMail = localStorage.getItem('mailConfirmationToken')?localStorage.getItem('mailConfirmationToken'):'';
    console.log("leaveToast",tokenConfirmMail)
    const [ReSendConfirmMailAction, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().ResendConfirmMailMutation, {
        variables: {token: tokenConfirmMail},
        onCompleted: async (data) => {
            switch (data.ResendMailConfirmation.code) {
                case  200 :
                    values.constraintData.leaveToast&&await success_submit(200);
                    break;
                case  400 :
                    values.constraintData.leaveToast&& await error_submit(400);
                    break;
            }
        }
    });
    return({
        ReSendConfirmMailAction,
    })
}

