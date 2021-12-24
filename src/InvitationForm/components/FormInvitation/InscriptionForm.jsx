import React, {useState} from 'react';
import "moment/locale/zh-cn";
import {Form, Input, Button, Layout, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";

import ReCAPTCHA from "react-google-recaptcha";
import './FormInvitation.scss'
const { Option } = Select;
export const InscriptionForm= ({prefixCls,handleConfirmPage}) =>{
    const {
        state,formLayout,handleChangeCaptcha,submitForm,handleChangeFields,handleChangeParticipation,partipationOptions,
        validateMessages,FormDataSource,buttonItemLayout
    } = useHooksInvitationForm()

    var siteKey = process.env.SITE_KEY ? process.env.SITE_KEY : "6LfvW1UaAAAAAMc2_g2x4lYXoSHag8V08Bdj8RiP"

    return (
        <Layout className={`${prefixCls}__form`}>
            <Form.Item label={FormDataSource.form.participation} name={["user", "participation"]}  required
                       className={`${prefixCls}__labelForm`}>
                <Select
                    className={`${prefixCls}__selectForm`}
                    name={"participation"}
                    size={"large"}
                    style={{width: '100%'}}
                    placeholder={FormDataSource.form.participation}
                    defaultValue={state.participation.value}
                    onChange={handleChangeParticipation}
                    dropdownClassName={`${prefixCls}__selectInputForm`}
                >
                    {
                        partipationOptions.map(x=>(
                            <Option value={x.value} key={x.id}>{
                                x.name
                            }</Option>
                        ))
                    }

                </Select>
            </Form.Item>
            <div className={`${prefixCls}__block`}>
                <Form.Item   name={["user", "lastName"]}  required
                             label={FormDataSource.form.lastName} className={`${prefixCls}__labelForm`}
                             validateTrigger={"onBlur"}>
                    <Input
                        type={"text"}
                        name={"lastName"}
                        className={`${prefixCls}__inputForm`}
                        placeholder={FormDataSource.form.lastName}
                        onChange={handleChangeFields}
                        value={state.lastName}
                    />
                    {
                        state.empty.includes("lastName")
                            ?
                            <span className={`${prefixCls}__textError`}>
                                {
                                    validateMessages.required
                                }
                         </span>
                            : null

                    }
                </Form.Item>

                <Form.Item name={["user", "firstName"]}  required
                           label={FormDataSource.form.firstName} className={`${prefixCls}__labelForm`}
                           validateTrigger={"onBlur"}>
                    <Input
                        type={"text"}
                        name={"firstName"}
                        className={`${prefixCls}__inputForm`}
                        placeholder={FormDataSource.form.firstName}
                        onChange={handleChangeFields}
                        value={state.firstName}
                    />
                    {
                        state.empty.includes("firstName")
                            ?
                            <span className={`${prefixCls}__textError`}>
                                {
                                    validateMessages.required
                                }
                         </span>
                            : null

                    }
                </Form.Item>

            </div>
            <Form.Item name={["user", "email"]} rules={[{type: "email"}]} required
                       label={FormDataSource.form.email} className={`${prefixCls}__labelForm`}
                       validateTrigger={"onBlur"}>
                <Input
                    name={"email"}
                    type={"email"}
                    className={`${prefixCls}__inputForm `+ (  state.errorEmail ? ` ${prefixCls}__error` : "")}
                    placeholder={FormDataSource.form.email}
                    onChange={handleChangeFields}
                    value={state.email}

                />
                {
                    state.errorEmail ||   state.errorExistEmail ||   state.empty.includes("email")
                        ?
                        <span className={`${prefixCls}__textError`}>
                                {
                                    state.errorEmail
                                        ? validateMessages.email
                                        :  state.errorExistEmail
                                        ? validateMessages.exist
                                        : validateMessages.required

                                }
                         </span>
                        : null

                }
            </Form.Item>
            <div className={`${prefixCls}__block`}>
                <Form.Item {...buttonItemLayout}  >
                    {
                        state.showRobot &&   <ConfigProvider locale={state.lang}> <ReCAPTCHA
                            key={state.lang ? state.lang.locale : "fr"}
                            hl={state.lang ? state.lang.locale : "fr"}
                            sitekey={siteKey}
                            onChange={(event) => handleChangeCaptcha(event)}
                        /></ConfigProvider>
                    }

                </Form.Item>
                <Form.Item {...buttonItemLayout} className={`${prefixCls}__labelForm`}>
                    <Button type="primary" htmlType="submit" className={`${prefixCls}__signup-btn`}
                        // disabled={ !captcha || !condition || !state.email || !validateEmail(state.email)}
                            onClick={(event) => submitForm(event)}>{FormDataSource.form.signup}</Button>
                </Form.Item>
            </div>
            <Layout className={`${prefixCls}__footer`}>

                <div className={`${prefixCls}__footer--text`}> {
                    FormDataSource.form.info.text
                }</div>
                <div className={`${prefixCls}__footer--link`} > <a onClick={handleConfirmPage}>{
                    FormDataSource.form.info.link
                }</a></div>
            </Layout>
        </Layout>
    )
}