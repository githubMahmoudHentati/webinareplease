import React, {useEffect, useRef, useState} from 'react';
import {Breadcrumb, Col, Form, Row,Affix,Button} from "antd";
import {PrincipalPage} from "../../utils/components/principalPage";
import {setConstraintDataOnchange} from "../store/accountSettingsAction";
import {useDispatch, useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {GraphQLFetchData} from "../utils/graphQLFetchData";
import {BarHeader} from "./barHeader"
import {HomeOutlined} from "@ant-design/icons";

export const AccountSubmit =({form,child1,child2,child3})=>{
    const dispatch = useDispatch()
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    const {UpdateAccountSetting} = GraphQLFetchData(form)
    const {handleSubmit} = Hooks(UpdateAccountSetting)
    const history = useHistory()
    const {t} = useTranslation();

    return (
        <div className="scrollable-container" >
            <Form
                form={form}
                layout="horizontal"
                name="product-form"
                onFinish={handleSubmit}
            >
                <Row gutter={[0, 10]} >
                    <Col span={24} className={"header-col"}>
                        <Breadcrumb style={{fontSize: "14px", color: darkMode === false ? "" : "#ffffff"}}>
                            <Breadcrumb.Item href="" style={{color: darkMode === false ? "" : "#ffffff"}}
                                             onClick={() => {
                                                 history.push("/")
                                             }}>
                                <span
                                    onClick={() => {
                                        dispatch(setConstraintDataOnchange({
                                            constraintDataNameChange: "updateAccountSettingError",
                                            constraintDataValueChange: false
                                        }))
                                        document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
                                        document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
                                        history.push("/")
                                    }}
                                ><HomeOutlined className={"home_icon"} /></span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                style={{color: darkMode === false ? "" : "#ffffff"}}>{t("CompteSettings.AccountSettings")}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                        <BarHeader />
                    <Col span={24}>
                        <Row gutter={[30, 20]}>
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 7}} lg={{span: 4}}>
                                {/*<MenuForms />*/}
                                {child2}
                            </Col>
                            <Col xs={{span: 24}} sm={{span: 24}} md={{span: 15}} lg={{span: 20}}
                                 className={"col-selectMenu"}>
                                {/*<SelectMenu />*/}
                                {child3}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}