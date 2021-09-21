import React from 'react';
import {MenuForms} from './components/menuforms'
import {Breadcrumb, Col, Row, Form} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {AccountGeneralInformation} from "./components/accountGeneralInformation";
import {SecurityAccount} from "./components/securityAccount"
import {PrincipalPage} from "../utils/components/principalPage";
import {useDispatch, useSelector} from "react-redux";
import {PasswordEdit} from "./components/passwordEdit";
import {AccountSubscription} from './components/accountSubscription'
import {useHistory} from "react-router-dom";
import {setAccountSetting, setConstraintDataOnchange} from "./store/accountSettingsAction";
import { useTranslation } from 'react-i18next';
import {graphQL_shema} from "./utils/graphQL";
import {useQuery} from "@apollo/react-hooks";
import {BarHeader} from "./components/barHeader"
import Hooks from "./utils/hooks";
import {AccountSubmit} from "./components/accountSubmit";


export const CompteSettings=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
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