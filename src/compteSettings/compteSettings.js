import React, {useEffect, useState} from 'react';
import {MenuForms} from './components/menuforms'
import {Breadcrumb, Col, Row, Form} from "antd";
import {AccountGeneralInformation} from "./components/accountGeneralInformation";
import {SecurityAccount} from "./components/securityAccount"
import {PrincipalPage} from "../utils/components/principalPage";
import {useDispatch, useSelector} from "react-redux";
import {PasswordEdit} from "./components/passwordEdit";
import {AccountSubscription} from './components/accountSubscription'
import {setAccountSetting, setConstraintDataOnchange} from "./store/accountSettingsAction";
import { useTranslation } from 'react-i18next';
import {graphQL_shema} from "./utils/graphQL";
import {useQuery} from "@apollo/client";
import {BarHeader} from "./components/barHeader"
import {AccountSubmit} from "./components/accountSubmit";


export const CompteSettings=()=>{
    const dispatch = useDispatch()
    const accountMenu = useSelector((state)=>state.Reducer.accountMenu)

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const {data: GetUserInfoData}
        = useQuery(graphQL_shema().Get_UserInfoData, {
        fetchPolicy: 'cache-and-network',
        variables: { pagination : {
                "limit": 2,
                "offset": 0,
            } },
        onCompleted: async (data) => {
             dispatch(setAccountSetting({dataUserInfo: GetUserInfoData.getUserInfo}));
             dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "loadingGeneralInformation",
                constraintDataValueChange: false
            }))
            form.setFieldsValue(GetUserInfoData.getUserInfo.generalInformation)
        }
    })


    const SelectMenu = ()=>{
        switch(accountMenu){
            case 1:
            return <SecurityAccount/>
            case 2:
                return <PasswordEdit/>
            case 3:
                return <AccountSubscription/>
            default:
                return <AccountGeneralInformation form={form}/>
        }
    }

    return(
        <PrincipalPage menuType={"accountSetting"}>
            <AccountSubmit
                form={form}
                child1={<BarHeader /> }
                child2={<MenuForms /> }
                child3={<SelectMenu /> }
            />
        </PrincipalPage>
    )
}