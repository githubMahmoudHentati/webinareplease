import React, {useState} from 'react';
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
import {SuccessInscription} from "./SuccessInscription";
const { Content, Header, Footer } = Layout;

import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
import './FormInvitation.scss'
const { Option } = Select;

export const FormInvitation =()=>{
    const {
        formLayout,validateMessages
    } = useHooksInvitationForm()
    const [form] = Form.useForm();
    const format = 'HH:mm';
    const dateFormat = 'DD-MM-YYYY';
    const { t } = useTranslation();
    const prefixCls = "Form";
    const lang = useSelector(state => state.lang);
    const formItemLayout = null;
    const [visibleInscriptionPage, setVisibleInscriptionPage] = useState({
        inscription:true,
        confirm:false,
        success:false

    });
    const handleConfirmPage = () =>{
        console.log("handleConfirmPage****click")
        setVisibleInscriptionPage({success:false, inscription: false,confirm:true})
    }
    const returnToInscription = () =>{
        console.log("returnToInscription****click")
        setVisibleInscriptionPage({success:false, inscription: true,confirm:false})
    }
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
                    visibleInscriptionPage.inscription &&   <InscriptionForm prefixCls={prefixCls} handleConfirmPage={handleConfirmPage} />
                }

                {
                    visibleInscriptionPage.confirm &&     <ConfirmForm prefixCls={prefixCls} returnToInscription={returnToInscription}/>
                }
                {
                    visibleInscriptionPage.success && <SuccessInscription prefixCls={prefixCls}  />
                }

            </Form>
        </div>

    )
}


