import React, {useState} from 'react';
import { Layout} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
const { Content, Header } = Layout;
export const HeaderForm = ({prefixCls}) =>{
    const {FormDataSource} = useHooksInvitationForm()
    const api={
        name:""
    }
    return (
        <>
            <Layout theme={'light'} className={`${prefixCls}__layout`}>
                <Header>
                    <div className={`${prefixCls}__layout--title`}>
                        {FormDataSource.form.organised  + ' ' + api.name }
                        {''}
                    </div>
                </Header>
            </Layout>
            <Layout theme={'light'} className={`${prefixCls}__layout`}>
                <Content>Content</Content>
            </Layout>
        </>
    )
}