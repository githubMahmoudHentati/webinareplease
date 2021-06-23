import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import moment from "moment";
import {useDispatch} from "react-redux";
import {useState} from 'react'
import {
    setAccountSetting,
    setConstraintDataOnchange, setEmptyPasswordInput,
    setGeneralInformationOnchange
} from "../store/accountSettingsAction";
import {Hooks} from "./hooks";
import {AccountSettingsConstraints} from "./accountSettingsConstraints";

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    const {values}=Hooks()
    const {securityAccount}=AccountSettingsConstraints()

    const {loading: GetUserInfoData_loading, data: GetUserInfoData}
        = useQuery(graphQL_shema().Get_UserInfoData, {
        fetchPolicy: "cache-first",
        onCompleted: async (data) => {
            await dispatch(setAccountSetting({dataUserInfo: GetUserInfoData.getUserInfo}));
            await dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "loadingGeneralInformation",
                constraintDataValueChange: false
            }))
        }
    })
    console.log("test",values.generalInformation)
    const [UpdateAccountSetting, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().Update_AccountSetting, {
        variables: {input:
                values.generalInformation
        },
        onCompleted: async (data) => {
           console.log("data",data)
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
            console.log("data",data)
            dispatch(setEmptyPasswordInput(securityAccount()))
            console.log("securityAccount",securityAccount())
        }
    });

    return({
        GetUserInfoData,
        UpdateAccountSetting,
        UpdatePassword
    })
}

