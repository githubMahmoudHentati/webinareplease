import React from 'react';
import i18n from "../../../i18n/index";
import moment from 'moment';
import "moment/locale/zh-cn";
import './FooterInvitation.scss'
export const FooterInvitation = () => {
    const prefixCls='Footer';
    const FooterDataSource = {
        copyright: " ©",
        client:"empreinte.com",
        legal: i18n.t('InvitationPage.footer.legal'),
        conditions: i18n.t('InvitationPage.footer.conditions')
    };
    const date = new Date().getFullYear()

    return (
        <div className={` invitation-footer ${prefixCls}__copyright`} >
            <div className={`${prefixCls}__date`}>{FooterDataSource.copyright} {date} </div>
            <a href={"https://www.empreinte.com/"} target={"_blank"}><div className={`${prefixCls}__admin`}> {FooterDataSource.client}</div> </a>
        </div>
    )
}
