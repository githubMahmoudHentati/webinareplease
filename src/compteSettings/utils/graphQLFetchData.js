import {useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import moment from "moment";
import {useDispatch} from "react-redux";
import {useState} from 'react'
import {
    setAccountSetting,
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../store/accountSettingsAction";

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()

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
    return({
        GetUserInfoData
    })
}