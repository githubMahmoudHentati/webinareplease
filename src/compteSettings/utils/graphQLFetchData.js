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
import {Hooks} from "./hooks";
import {AccountSettingsConstraints} from "./accountSettingsConstraints";
import {StatusMessages} from "./StatusMessages";
import {useHistory} from "react-router-dom";

export const GraphQLFetchData=(form)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {values}=Hooks()
    const {securityAccount}=AccountSettingsConstraints()
    const {success_message_update_password , error_message_update_password}=StatusMessages()

    const {loading: GetUserInfoData_loading, data: GetUserInfoData}
        = useQuery(graphQL_shema().Get_UserInfoData, {
        fetchPolicy: 'cache-and-network',
        variables: { pagination : {
                "limit": 2,
                "offset": 0,
            } },
        onCompleted: async (data) => {
            await dispatch(setAccountSetting({dataUserInfo: GetUserInfoData.getUserInfo}));
            await dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "loadingGeneralInformation",
                constraintDataValueChange: false
            }))
            form.setFieldsValue(GetUserInfoData.getUserInfo.generalInformation)
        }
    })
    const [UpdateAccountSetting, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().Update_AccountSetting, {
        variables: {input:
                values.generalInformation
        },
        onCompleted: async (data) => {
            if (data.updateUser.Code === 200) {
                history.push("/showVideos")
            }
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
            if(data.changePassword.Code === 200){
                dispatch(setEmptyPasswordInput(securityAccount()));
                dispatch(setLoadingUpdatePassword({
                    LoadingUpdatePasswordNameChange: "loadingUpdatePassword",
                    LoadingUpdatePasswordValueChange: false
                }))
                form.resetFields();
                success_message_update_password()

            }else if(data.changePassword.Code === 400){
                error_message_update_password()
            }

        }
    });

    return({
        GetUserInfoData,
        UpdateAccountSetting,
        UpdatePassword
    })
}

