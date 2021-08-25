import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";

import {useDispatch} from "react-redux";

import {
    setConstraintDataOnchange, setEmptyPasswordInput,
     setLoadingUpdatePassword
} from "../store/accountSettingsAction";
import Hooks from "./hooks";
import {AccountSettingsConstraints} from "./accountSettingsConstraints";
import {StatusMessages} from "./StatusMessages";
import {useHistory} from "react-router-dom";

export const GraphQLFetchData=(form)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {values}=Hooks()
    const {securityAccount}=AccountSettingsConstraints()
    const {success_message_update_password , error_message_update_password}=StatusMessages()

    const [UpdateAccountSetting, {
        loading: loading_UpdateAccountSetting,
    }] = useMutation(graphQL_shema().Update_AccountSetting, {
        variables: {input:
                values.generalInformation
        },
        onCompleted: async (data) => {
            if ( data.updateUser.code === 200) {
                history.push("/showVideos")

                // document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
                // document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
            }
            else if ( data.updateUser.code === 400){
                dispatch(setConstraintDataOnchange({
                    constraintDataNameChange: "updateAccountSettingError",
                    constraintDataValueChange: true
                }))
                document.documentElement.style.setProperty('--inputErrorForm', "red");
                document.documentElement.style.setProperty('--inputBorderErrorForm', "red");
            }

            dispatch(setConstraintDataOnchange({constraintDataNameChange:"loadingUpdateAccountSetting",constraintDataValueChange:false}))

        }
    });

    const [UpdatePassword] = useMutation(graphQL_shema().UPDATE_PASSWORD, {
        variables: {input:
                values.securityAccount
        },
        onCompleted: async (data) => {
            if(data.changePassword.code === 200){
                dispatch(setEmptyPasswordInput(securityAccount()));
                dispatch(setLoadingUpdatePassword({
                    LoadingUpdatePasswordNameChange: "loadingUpdatePassword",
                    LoadingUpdatePasswordValueChange: false
                }))
                form.resetFields();
                success_message_update_password()

            }else if(data.changePassword.code === 400){
                error_message_update_password()
            }
        }
    });

    return({
        UpdateAccountSetting,
        loading_UpdateAccountSetting,
        UpdatePassword
    })
}

