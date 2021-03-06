import React, {useState} from 'react';
import { Layout} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
export const SuccessInscription = ({prefixCls}) =>{
    const {FormDataSource} = useHooksInvitationForm()
    return (
            <div className={`${prefixCls}__success`}>
                <span  className={`${prefixCls}__success--icon`}>🎉</span>
                <span className={`${prefixCls}__success--title`}>
                    {FormDataSource.form.success.title}
                </span>
                <span className={`${prefixCls}__success--subscribed`}>
                    {FormDataSource.form.success.subscribed}
                </span>
                <span className={`${prefixCls}__success--info`}>
                    {FormDataSource.form.success.verif}
                </span>
            </div>
    )
}