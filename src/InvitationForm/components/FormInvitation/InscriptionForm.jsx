import React, {useState} from 'react';
import "moment/locale/zh-cn";
import {Form, Input, Button, Layout, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
import {SelectParticipation} from './SelectParticiation'
import ReCAPTCHA from "react-google-recaptcha";
import {useSelector} from 'react-redux'
import './FormInvitation.scss'
export const InscriptionForm= ({prefixCls}) =>{
    const {
        state,formLayout,handleChangeCaptcha,submitForm,handleChangeFields,handleChangeParticipation,
        validateMessages,FormDataSource,buttonItemLayout,infoToRegister, participant,validateEmail,getDefaultParticipation,
        handleConfirmPage
    } = useHooksInvitationForm()
    const participation= useSelector(state=>state.InvitationReducer.participation)
    const cryptext= useSelector((state)=>state.InvitationReducer.cryptext)
    const loading = useSelector(state=>state.InvitationReducer.loading.loadingSendMail)

    var siteKey = process.env.SITE_KEY ? process.env.SITE_KEY : "6LfvW1UaAAAAAMc2_g2x4lYXoSHag8V08Bdj8RiP"

    return (
        <Layout className={`${prefixCls}__form`}>
            <Form.Item label={FormDataSource.form.participation} name={["user", "participation"]}  required
                       className={`${prefixCls}__labelForm`}>
                {

                    state.participation.length && state.selectedParticipation  &&
                        <SelectParticipation prefixCls={prefixCls}></SelectParticipation>
                }

            </Form.Item>
            <div className={`${prefixCls}__block`}>
                <Form.Item   name={["user", "lastNameInvitor"]}  required
                             label={FormDataSource.form.lastName} className={`${prefixCls}__labelForm`}
                             validateTrigger={"onBlur"}>
                    <Input
                        type={"text"}
                        name={"lastNameInvitor"}
                        className={`${prefixCls}__inputForm `+ (  state.empty.includes("lastNameInvitor") ? ` ${prefixCls}__error` : "")}
                        placeholder={FormDataSource.form.lastName}
                        onChange={handleChangeFields}
                        value={state.lastNameInvitor}
                    />
                    {
                        state.empty.includes("lastNameInvitor")
                            &&
                            <span className={`${prefixCls}__textError`}>
                                {
                                    validateMessages.required
                                }
                         </span>

                    }
                </Form.Item>

                <Form.Item name={["user", "firstNameInvitor"]}  required
                           label={FormDataSource.form.firstName} className={`${prefixCls}__labelForm`}
                           validateTrigger={"onBlur"}>
                    <Input
                        type={"text"}
                        name={"firstNameInvitor"}
                        className={`${prefixCls}__inputForm `+ (  state.empty.includes("firstNameInvitor") ? ` ${prefixCls}__error` : "")}
                        placeholder={FormDataSource.form.firstName}
                        onChange={handleChangeFields}
                        value={state.firstNameInvitor}
                    />
                    {
                        state.empty.includes("firstNameInvitor")
                           &&
                            <span className={`${prefixCls}__textError`}>
                                {
                                    validateMessages.required
                                }
                         </span>

                    }
                </Form.Item>

            </div>
            <Form.Item name={["user", "email"]} rules={[{type: "email"}]} required
                       label={FormDataSource.form.email} className={`${prefixCls}__labelForm`}
                       validateTrigger={"onBlur"}>
                <Input
                    name={"email"}
                    type={"email"}
                    className={`${prefixCls}__inputForm `+ (  state.errorEmail || state.errorExistEmail||   state.empty.includes("email") ? ` ${prefixCls}__error` : "")}
                    placeholder={FormDataSource.form.email}
                    onChange={handleChangeFields}
                    onBlur={(event)=>state.email ? validateEmail(event.target.value) : ''}
                    value={state.email}
                    defaultValue={state.email}
                    disabled={true}
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
                            onClick={(event) => submitForm(event)} loading={loading}>{FormDataSource.form.signup}</Button>
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