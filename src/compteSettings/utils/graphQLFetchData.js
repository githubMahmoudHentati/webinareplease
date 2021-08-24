import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import moment from "moment";
import {useDispatch} from "react-redux";
import {useState} from 'react'
import {
    setAccountSetting,
    setConstraintDataOnchange, setEmptyPasswordInput,
    setGeneralInformationOnchange, setLoadingUpdatePassword
} from "../store/accountSettingsAction";
import Hooks from "./hooks";
import {AccountSettingsConstraints} from "./accountSettingsConstraints";
import {StatusMessages} from "./StatusMessages";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";

export const GraphQLFetchData=(form)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {values}=Hooks()
    const {securityAccount}=AccountSettingsConstraints()
    const {success_message_update_password , error_message_update_password}=StatusMessages()

    const [UpdateAccountSetting, {
        data: dataUpdate,
        loading: loading_UpdateAccountSetting,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().Update_AccountSetting, {
        variables: {input:
                values.generalInformation
        },
        onCompleted: async (data) => {
            console.log("codeapi", data.updateUser.code)
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

    const [UpdatePassword, {
        data: dataUpdatePassword,
        loading: loading_UpdatePassword,
        error: error_UpdatePassword,
    }] = useMutation(graphQL_shema().UPDATE_PASSWORD, {
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

