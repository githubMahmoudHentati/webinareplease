import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import i18n from "../../../i18n/index";
import moment from 'moment';
import "moment/locale/zh-cn";
import locale_fr from "antd/es/locale/fr_FR";
import locale_en from "antd/es/locale/en_US";
import { useTranslation } from 'react-i18next';
import {Form, Input, Button, DatePicker, Space, Select, TimePicker, Popover, ConfigProvider, Checkbox} from 'antd';
import {CalendarOutlined, ClockCircleOutlined} from '@ant-design/icons';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
import ReCAPTCHA from "react-google-recaptcha";
import './FormInvitation.scss'

export const FormInvitation =()=>{
    const {
        formLayout,state,visible,setVisible,captcha,condition,show,videoUri,handleChangeCaptcha,handleChangeCondition,
        isEmptyField,submitForm,confirm,onFormLayoutChange,verifFormat,handleChangeEmails,validateEmail,
        handleClear,handleChangeTime,handleChangeTitle,handleChangeEmail,handleChangeDate,
        getTime,getTag
    } = useHooksInvitationForm()
    const [form] = Form.useForm();
    const format = 'HH:mm';
    const dateFormat = 'DD-MM-YYYY';
    const { t } = useTranslation();
    const prefixCls = "Form";
    const lang = useSelector(state => state.lang);
    var siteKey = process.env.SITE_KEY ? process.env.SITE_KEY : "6LfvW1UaAAAAAMc2_g2x4lYXoSHag8V08Bdj8RiP"
    const validateMessages = {
        required: '${label} ' + i18n.t("validations.required"),
        types: {
            email: "${label} "+ i18n.t("validations.email"),
            number: "${label} "+ i18n.t("validations.number"),
        },
    };
    const formItemLayout = null;
    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: {
                    span: 14,
                    offset: 4,
                },
            }
            : null;
    const FormDataSource={
        form:{
            webinar:i18n.t('InvitationPage.form.webinar') ,
            title:i18n.t('InvitationPage.form.title') ,
            date:i18n.t('InvitationPage.form.date'),
            time:i18n.t('InvitationPage.form.time'),
            email:i18n.t('InvitationPage.form.email'),
            emails:i18n.t('InvitationPage.form.emails'),
            checkbox:{
                accept:i18n.t('InvitationPage.form.checkbox.accept'),
                conditions:i18n.t('InvitationPage.form.checkbox.conditions')
            },
            create:i18n.t('InvitationPage.form.create')
        },
        content:[
            i18n.t('InvitationPage.form.info.i1'),
            i18n.t('InvitationPage.form.info.i2'),
            i18n.t('InvitationPage.form.info.i3'),
            i18n.t('InvitationPage.form.info.i4')
        ],
        successWebinar:{
            image:"../../../public/assets/images/success.png",
            title: i18n.t("modal.title"),
            ok: i18n.t("modal.ok"),
            access: i18n.t("modal.access"),
            copy: i18n.t("modal.copy"),
            copied: i18n.t("modal.copied"),
            upload:i18n.t("modal.upload")
        }
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

                 <Form.Item label={FormDataSource.form.participation} className={`${prefixCls}__labelForm`}>
                        <Select
                            allowClear={false}
                            autoFocus={false}
                            showSearch={true}
                            className={`${prefixCls}__selectForm` + (  state.errorEmail ? ` ${prefixCls}__error` : "")}
                            open={false}
                            name={"emails"}
                            size={"large"}
                            type={"email"}
                            mode="tags"
                            style={{width: '100%'}}
                            tagRender={(props) => state.emails ? getTag(props) : ""}
                            placeholder={i18n.t("validations.format")}
                            onSelect={handleChangeEmails}
                            onDeselect={handleClear}
                            dropdownClassName={`${prefixCls}__selectInputForm`}
                            onInputKeyDown={e => e.key === 'Enter' ? verifFormat(e):""}
                            data-content={i18n.t("validations.format")}
                            tokenSeparators={[' ', ',', '\n']}
                        >
                        </Select>
                        {
                            state.errorEmail ?
                                <span className={`${prefixCls}__textError`}>
                                {
                                    FormDataSource.form.participation+ i18n.t('validations.email')
                                }
                            </span>
                                :
                                state.errorExistEmail  ?
                                    <span className={`${prefixCls}__textError`}>
                                {
                                    i18n.t('validations.exist')
                                }
                            </span>
                                    :
                                    null
                        }
                </Form.Item>
                <div className={`${prefixCls}__block-name`}>
                    <Form.Item  label={FormDataSource.form.lastName} className={`${prefixCls}__labelForm`}>
                        <Input
                            type={"text"}
                            name={"title"}
                            className={`${prefixCls}__inputForm`}
                            placeholder={FormDataSource.form.lastName}
                            onChange={handleChangeLastName}
                            value={state.lastName}
                        />
                    </Form.Item>
                    <Form.Item  label={FormDataSource.form.firstName} className={`${prefixCls}__labelForm`}>
                        <Input
                            type={"text"}
                            name={"title"}
                            className={`${prefixCls}__inputForm`}
                            placeholder={FormDataSource.form.firstName}
                            onChange={handleChangeFirstName}
                            value={state.firstName}
                        />
                    </Form.Item>
                </div>
                <Space direction="vertical">
                    <Form.Item name={["user", "email"]} rules={[{type: "email"}]} required
                               label={FormDataSource.form.email} className={`${prefixCls}__labelForm`}
                               validateTrigger={"onBlur"}>
                        <Input
                            name={"email"}
                            className={`${prefixCls}__inputForm`}
                            placeholder={FormDataSource.form.email}
                            onChange={handleChangeEmail}
                            value={state.email}
                        />
                    </Form.Item>
                </Space>

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
                    <Button type="primary" htmlType="submit" className={`${prefixCls}__create-btn`}
                            disabled={ !captcha || !condition || !state.email || !validateEmail(state.email)}
                            onClick={(event) => submitForm(event)}>{FormDataSource.form.create}</Button>
                </Form.Item>
                {/*{*/}
                {/*    show ?*/}
                {/*        <GenerateModal isContactForm={false} isVisible={show} isSuccessWebinar={true}*/}
                {/*                       dataSource={FormDataSource} videoUri={videoUri}*/}
                {/*                       handleOk={handleOk}*/}
                {/*                       handleCancel={handleCancel}*/}
                {/*        ></GenerateModal>*/}
                {/*        : null*/}
                {/*}*/}
            </Form>
        </div>

    )
}


