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
        <div>
            <PrincipalPage menuType={"accountSetting"}>
                <Row gutter={[0, 10]}>
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize:"14px", color:darkMode===false?"":"#ffffff"}}>
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}} onClick={()=>{history.push("/")}}>
                                <span
                                    onClick={()=>{
                                        dispatch(setConstraintDataOnchange({
                                            constraintDataNameChange: "updateAccountSettingError",
                                            constraintDataValueChange: false
                                        }))
                                        document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                        document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
                                        history.push("/")
                                    }}
                                >{t("CompteSettings.Home")}</span>
                            </Breadcrumb.Item >
                            <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}} onClick={()=>{history.push("/")}}>
                                <span>{t("CompteSettings.direct")}</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item style={{color:darkMode===false?"":"#ffffff"}}>{t("CompteSettings.MyAccount")}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                    <Col  span={24} className={"title-col"} style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#141414" , marginBottom:"25px"}}>
                        <ArrowLeftOutlined
                            style={{display: "flex", alignItems: "center", fontSize: 'medium', cursor: 'medium' , color:darkMode===false?"":"white"}}
                            onClick={()=>{
                                dispatch(setConstraintDataOnchange({
                                    constraintDataNameChange: "updateAccountSettingError",
                                    constraintDataValueChange: false
                                }))
                                document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
                                history.push("/")
                            }}
                        />
                        <span style={{
                            fontSize: "medium",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            marginLeft: "1%",
                            color:darkMode===false?"":"white"
                        }}> {t("CompteSettings.MyAccount")}
                                        </span>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[30, 20]}>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 7}} lg={{span:4}} >
                                <MenuForms />
                            </Col>
                            <Col  xs={{ span: 24}} sm={{ span: 24}} md={{ span: 15}} lg={{span:20}} className={"col-selectMenu"}>
                                <SelectMenu />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </PrincipalPage>
        </div>
    )
}