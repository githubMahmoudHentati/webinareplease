import React, {useState} from 'react';
import "moment/locale/zh-cn";
import {Form, Input, Button, Layout, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
const {  Header } = Layout;

export const ConfirmSuccessForm = ({prefixCls}) =>{
    const {
        state,submitForm,handleChangeFields,validateMessages,FormDataSource,buttonItemLayout,
        returnToInscription

    } = useHooksInvitationForm()
    return (
        <div className={`${prefixCls}__confirmSuccess`}>
            <span className={`${prefixCls}__confirmSuccess--successSend`}>{FormDataSource.form.successSend}</span>
            <span className={`${prefixCls}__confirmSuccess--email`}>{state.email}</span>
            <span className={`${prefixCls}__confirmSuccess--verif`}>{FormDataSource.form.verif}</span>
            <div className={`${prefixCls}__confirmSuccess--btns`}>
                <Form.Item {...buttonItemLayout} className={`${prefixCls}__labelForm`}>
                    <Button type="secondary" htmlType="submit" className={`${prefixCls}__return-btn`}
                            onClick={returnToInscription}>{FormDataSource.form.return}</Button>
                </Form.Item>
            </div>
        </div>
    )
}