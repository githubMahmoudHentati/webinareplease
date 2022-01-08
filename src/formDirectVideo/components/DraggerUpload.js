import {Upload,Button} from 'antd';
import {InboxOutlined,UploadOutlined} from '@ant-design/icons';
import React from "react";
import {useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import { useTranslation } from 'react-i18next';
import {UploadHooks} from "./uploadHooks";
import ImgCrop from 'antd-img-crop';

export const DraggerUpload = () => {


    const {values}=Hooks()
    const {removeThumbnailGeneral,handleChangeGeneral}=UploadHooks()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const { Dragger } = Upload;

    const { t} = useTranslation();

    return(
        // <Dragger  style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
        //          name="fileList" listType="picture"
        //           accept="image/jpeg,image/png"
        //           fileList={values.general.fileList}
        //           //beforeUpload={beforeUpload}
        //           onChange={handleChangeGeneral}
        //           onRemove={removeThumbnailGeneral}
        //  >
        //     <p className="ant-upload-drag-icon">
        //         <InboxOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
        //     </p>
        //     <p className="ant-upload-text" style={{ color:darkMode===false?"":"RGBA(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ClickOrDrag")}</p>
        //     <p className="ant-upload-hint" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.25)"}}>
        //         {t("formDirectVideo.OneFile")}
        //     </p>
        // </Dragger>

        <ImgCrop rotate fillColor modalTitle={t("CompteSettings.ModalTitle")} aspect={1.777} >
            <Upload
                accept="image/jpeg,image/png"
                name="avatar"
                className="ant-upload-block"
                listType="picture"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                onChange={handleChangeGeneral}
            >
                <Button className="ant-upload-block--button"
                    icon={<UploadOutlined />}
                    style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}
                >{t("CompteSettings.Upload")}</Button>
            </Upload>
        </ImgCrop>
    )
}