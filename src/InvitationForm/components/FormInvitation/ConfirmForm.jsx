import React, {useState} from 'react';
import "moment/locale/zh-cn";
import {Form, Input, Button, Layout, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
const {  Header } = Layout;

export const ConfirmForm = ({prefixCls}) =>{
    const {
        state,submitForm,handleChangeFields,validateMessages,FormDataSource,buttonItemLayout,
        sendConfirm, returnToInscription
    } = useHooksInvitationForm()
    return (
        <div className={`${prefixCls}__confirm`}>
           <div className={`${prefixCls}__confirm-title`}>
                <span className={`${prefixCls}__confirm-title--text`}>{FormDataSource.form.confirm}</span>
                <span className={`${prefixCls}__confirm-title--resend`}>{FormDataSource.form.resend}</span>
           </div>


            <Form.Item name={["user", "email"]} rules={[{type: "email"}]} required
                       label={FormDataSource.form.email} className={`${prefixCls}__labelForm`}
                       validateTrigger={"onBlur"}>
                <Input
                    name={"email"}
                    type={"email"}
                    className={`${prefixCls}__inputForm `+ (   state.errorEmail || state.errorExistEmail||   state.empty.includes("email") ? ` ${prefixCls}__error` : "")}
                    placeholder={FormDataSource.form.email}
                    onChange={handleChangeFields}
                    value={state.email}

                />
                {
                    (state.errorEmail ||   state.errorExistEmail ||   state.empty.includes("email"))
                        &&
                        <span className={`${prefixCls}__textError`}>
                                {
                                    state.errorEmail
                                        ? validateMessages.email
                                        :  state.errorExistEmail
                                        ? validateMessages.exist
                                        : validateMessages.required

                                }
                         </span>

                }
            </Form.Item>
            <div className={`${prefixCls}__confirm-btns`}>
                <Form.Item {...buttonItemLayout} className={`${prefixCls}__labelForm`}>
                    <Button type="secondary" htmlType="submit" className={`${prefixCls}__return-btn`}
                            onClick={returnToInscription}>{FormDataSource.form.return}</Button>
                </Form.Item>
                <Form.Item {...buttonItemLayout} className={`${prefixCls}__labelForm`}>
                    <Button type="primary" htmlType="submit" className={`${prefixCls}__send-btn`}
                            onClick={sendConfirm}>{FormDataSource.form.send}</Button>
                </Form.Item>
            </div>
        </div>
    )
}