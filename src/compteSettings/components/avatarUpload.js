import {Upload,Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React from "react";
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import ImgCrop from 'antd-img-crop';


export const AvatarUpload = ({beforeUpload, handleChange, darkMode}) => {
    const {t} = useTranslation();
    const errorVisibility = useSelector((state) => state.AccountSettingsReducer.visible.errorVisibility);
    //***********************End of Upload***********************////////
    return (
        <>
            <ImgCrop rotate fillColor modalTitle={t("CompteSettings.ModalTitle")}>
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
            </ImgCrop>
            <div style={{color:"red", fontSize:"0.75rem"}}>
                {errorVisibility? t("CompteSettings.ErrorMsg"): ""}
            </div>
    </>
    );
}