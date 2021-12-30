import React, {useState} from 'react';
import { Layout} from 'antd';
import {useHooksInvitationForm} from "../../utils/useHooksInvitationForm";
import {useSelector} from 'react-redux'
import moment from 'moment';
const { Content, Header } = Layout;
export const HeaderForm = ({prefixCls}) =>{
    const {FormDataSource} = useHooksInvitationForm()
    const infoToRegister=useSelector(state=>state.InvitationReducer.infoToRegister)
    let startDate=moment(infoToRegister.date,"YYYY-MM-DDTHH:mm:ss+01:00").format("DD/MM/YYYY")
    let startHour=moment(infoToRegister.date,"YYYY-MM-DDTHH:mm:ss+01:00").format("HH")
    let startMinutes=moment(infoToRegister.date,"YYYY-MM-DDTHH:mm:ss+01:00").format("mm")
    return (
        <>
            <Layout theme={'light'} className={`${prefixCls}__layout`}>
                <Header>
                    <div className={`${prefixCls}__layout--title`}>
                        {FormDataSource.form.organised  + ' ' + infoToRegister.firstName + ' ' + infoToRegister.lastName}
                    </div>
                    <div className={`${prefixCls}__layout--title`}>
                        {FormDataSource.form.date +  ' ' +startDate + ' ' +FormDataSource.form.time+ ' ' +startHour+'h'+startMinutes}
                    </div>
                </Header>
            </Layout>
            <Layout theme={'light'} className={`${prefixCls}__layout`}>
                <Content>
                    <div className={`${prefixCls}__content--title`}>
                        {infoToRegister.title}
                    </div>
                    <div className={`${prefixCls}__content--description`}>
                        {infoToRegister.description}
                    </div>
                </Content>
            </Layout>
        </>
    )
}