import React, {useState, useEffect, useRef} from 'react';
import {Row ,Col, Input } from 'antd'
import { Upload, message } from "antd";
import { InboxOutlined  } from '@ant-design/icons';
const { Dragger } = Upload;


export const AttachedFile = () => {

    const fileList = [ ];

    const props = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        defaultFileList: [...fileList],
        listType: "picture-card",
    };


    return(
        <Row >

         <Col span={24}>
             <Dragger {...props} className={"parent"} >
                 <p className="ant-upload-drag-icon">
                     <InboxOutlined />
                 </p>
                 <p className="ant-upload-text">Click or drag file to this area to upload</p>
                 <p className="ant-upload-hint">
                     Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                     band files
                 </p>
             </Dragger>
         </Col>

        </Row>
    )
};