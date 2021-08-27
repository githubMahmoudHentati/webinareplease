import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {ToastMessage} from "./toastMessage";


export const GraphQLFetchData=(values)=> {

    const {success_submit,error_submit}=ToastMessage()

    const tokenConfirmMail = localStorage.getItem('mailConfirmationToken')?localStorage.getItem('mailConfirmationToken'):'';
    const [ReSendConfirmMailAction] = useMutation(graphQL_shema().ResendConfirmMailMutation, {
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

