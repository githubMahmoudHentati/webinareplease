import React, {useState, useEffect, useRef} from 'react';
import {Row ,Col, Input } from 'antd'
import { Upload, message } from "antd";
import { InboxOutlined  } from '@ant-design/icons';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import {UploadHooks} from "../uploadHooks";
import Hooks from "../../utils/hooks";

const { Dragger } = Upload;

export const Slides = () => {
  const dispatch = useDispatch()
  const {values}=Hooks()
  const {onSaveDiapositives , removeThumbnailDiapositives, handleChangeDiapositives}=UploadHooks()
  // use Selector redux
  const darkMode = useSelector((state)=> state.Reducer.DarkMode)
  const { t, i18n } = useTranslation();
 
  return (
      <Row >

        <Col xs={{span:20}} sm={{span:22}} md={{span:24}} lg={{span:24}} className={"draggerAttachedFile"}>
          <Dragger className={"parent"} style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
                   name="fileList" listType="picture-card"
                   accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
                   fileList={[...values.configuration.diapositivesFileLists]}
              //beforeUpload={beforeUpload}
                   onChange={handleChangeDiapositives}
                   onRemove={removeThumbnailDiapositives}
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
  );
};
