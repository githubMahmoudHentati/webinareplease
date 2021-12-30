import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import i18n from "../../../i18n/index";
import moment from 'moment';
import "moment/locale/zh-cn";
import locale_fr from "antd/es/locale/fr_FR";
import locale_en from "antd/es/locale/en_US";
import { useTranslation } from 'react-i18next';
import {Form, Input, Button, Layout, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {HeaderForm} from './HeaderForm'
import {InscriptionForm} from './InscriptionForm'
import {ConfirmForm} from "./ConfirmForm";
import {ConfirmSuccessForm} from "./ConfirmSuccessForm";
import {SuccessInscription} from "./SuccessInscription";
import {useGraphQLFetchDataForm} from '../../utils/graphQLFetchDataForm'

import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
import {setVisibleInscriptionPage} from '../../store/InvitationFormAction'
import './FormInvitation.scss'
const { Content, Header, Footer } = Layout;

const { Option } = Select;

export const FormInvitation =()=>{
    const {
        formLayout,validateMessages, infoToRegister,
    } = useHooksInvitationForm()
    const cryptext= useSelector((state)=>state.InvitationReducer.cryptext)
    const visibleInscriptionPage= useSelector((state)=>state.InvitationReducer.visibleInscriptionPage)
    console.log("cryptext----------",cryptext)
    const [form] = Form.useForm();
    const dispatch=useDispatch()
    const format = 'HH:mm';
    const dateFormat = 'DD-MM-YYYY';
    const { t } = useTranslation();
    const prefixCls = "Form";
    const lang = useSelector(state => state.lang);
    const formItemLayout = null;
    const {getInfoToRegister} = useGraphQLFetchDataForm(cryptext)
    useEffect(()=>{
        getInfoToRegister()

    },[])
    return (

        <div id={prefixCls} className={`${prefixCls}`}>
            <Form
                key={lang ? lang : locale_fr}
                {...formItemLayout}
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                validateMessages={validateMessages}
                onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
            >
                <HeaderForm prefixCls={prefixCls} />
                {
                    visibleInscriptionPage.inscription && <InscriptionForm prefixCls={prefixCls}  />
                }
                {
                    visibleInscriptionPage.confirm &&     <ConfirmForm prefixCls={prefixCls} />
                }
                {
                    visibleInscriptionPage.confirmSuccess &&     <ConfirmSuccessForm prefixCls={prefixCls} />
                }
                {
                    visibleInscriptionPage.inscriptionSuccess && <SuccessInscription prefixCls={prefixCls}  />
                }
            </Form>
        </div>

    )
}


