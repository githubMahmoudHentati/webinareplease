import React from 'react';
import {Row ,Col} from 'antd'
import { Upload} from "antd";
import { InboxOutlined  } from '@ant-design/icons';
import Hooks from "../utils/hooks";
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import {UploadHooks} from "./uploadHooks";

const { Dragger } = Upload;


export const AttachedFile = () => {

    const {values}=Hooks()
    const { removeThumbnailConfiguration , handleChangeConfiguration }=UploadHooks()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t} = useTranslation();


    return(
        <Row >

         <Col  xs={{span:24}} sm={{span:24}} md={{span:24}} lg={{span:24}} className={"draggerAttachedFile"}>
             <Dragger className={"parent"} style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
                       name="fileList" listType="picture-card"
                       fileList={[...values.configuration.fileListConfiguration]}
                 //beforeUpload={beforeUpload}
                       onChange={handleChangeConfiguration}
                       onRemove={removeThumbnailConfiguration}
             >

                 <p className="ant-upload-drag-icon">
                     <InboxOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
                 </p>
                 <p className="ant-upload-text" style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("formDirectVideo.ClickOrDrag")}</p>
                 <p className="ant-upload-hint" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                     {t("formDirectVideo.OneFile")}
                 </p>
             </Dragger>
         </Col>

        </Row>
    )
};