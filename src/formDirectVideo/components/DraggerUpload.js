import {Upload, message, Avatar, Button} from 'antd';
import {InboxOutlined, LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import axios from 'axios';
import {
    setConstraintDataOnchange, setErrorVisibility,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {setConfigurationSpeaker, setErrorUpload, setGeneralOnchange, setLoadingUpload} from "../store/formDirectVideoAction";
import { useTranslation } from 'react-i18next';
import {UploadHooks} from "./uploadHooks";


export const DraggerUpload = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    const {values}=Hooks()
    const {onSaveGeneral,removeThumbnailGeneral,handleChangeGeneral}=UploadHooks()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const { Dragger } = Upload;

    const { t, i18n } = useTranslation();

    return(
        <Dragger  style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
                 name="fileList" listType="picture"
                  accept="image/jpeg,image/png"
                  fileList={values.general.fileList}
                  //beforeUpload={beforeUpload}
                  onChange={handleChangeGeneral}
                  onRemove={removeThumbnailGeneral}
         >
            <p className="ant-upload-drag-icon">
                <InboxOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
            </p>
            <p className="ant-upload-text" style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ClickOrDrag")}</p>
            <p className="ant-upload-hint" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                {t("formDirectVideo.OneFile")}
            </p>
        </Dragger>
    )
}