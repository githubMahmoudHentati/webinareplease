import {Upload, message, Avatar, Button} from 'antd';
import {LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setConstraintDataOnchange, setGeneralInformationOnchange} from "../store/accountSettingsAction";
import Hooks from "../utils/hooks";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const AvatarUpload = ({beforeUpload, handleChange, darkMode}) => {
    const {t, i18n} = useTranslation();
    //***********************End of Upload***********************////////

    return (
        <Upload
            accept="image/jpeg,image/png"
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            <Button icon={<UploadOutlined />} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>{t("CompteSettings.ChangeAvatar")}</Button>
        </Upload>
    );
}