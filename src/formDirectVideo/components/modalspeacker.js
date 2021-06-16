import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Modal,Upload} from 'antd'
import '../formDirectVideo.scss'
import {UploadOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";
import {UploadLogoSpeaker} from "../utils/uploadLogoSpeaker"

 export const ModalSpeaker =({isVisible})=>{
 console.log("isModalVisible",isVisible)
  const props = {
   name: 'file',
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   headers: {
    authorization: 'authorization-text',
   },
  }
  const {handleOk,handleCancel,onChangeSpeaker,values}= Hooks()
  let {onChangeFile,beforeUpload,fileList} = UploadLogoSpeaker()

  return(
      <Modal className="modal-speaker" title="Ajouter un intervenant" visible={isVisible} onOk={handleOk} onCancel={handleCancel}
             footer={[
              <Button className={"input_modal"} onClick={handleCancel} key="back" >
               Annuler
              </Button>,
              <Button className={"input_modal"} onClick={handleOk} key="submit" type="primary" >
               Ajouter
              </Button>,
             ]}>
      <Row gutter={[0, 20]}>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span className={"span_modal"}>Photo</span>
         </Col>
         <Col span={24}>
          <Upload
              name="fileList"
              fileList={[...fileList]}
              onChange={onChangeFile}
              beforeUpload={{beforeUpload}}
              {...props} listType="picture">
           <Button className={"btn_upload_pic"} icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[10, 8]}>
       <Col span={12}>
        <span className={"span_modal"}>Nom</span>
       </Col>
       <Col  span={12}>
        <span className={"span_modal"}>Prénom</span>
       </Col>
         <Col span={12}>
          <Input className={"input_modal"} defaultValue={values.configuration.speaker.name} onChange={(event)=>onChangeSpeaker(event,"name")}placeholder={"Nom"}></Input>
         </Col>
         <Col  span={12}>
          <Input className={"input_modal"} defaultValue={values.configuration.speaker.lastName} onChange={(event)=>onChangeSpeaker(event,"lastName")} placeholder={"Prenom"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span className={"span_modal"}>Fonction</span>
         </Col>
         <Col span={24}>
          <Input className={"input_modal"} defaultValue={values.configuration.speaker.title} onChange={(event)=>onChangeSpeaker(event,"title")} placeholder={"Fonction"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span className={"span_modal"}>Email</span>
         </Col>
         <Col span={24}>
          <Input className={"input_modal"} defaultValue={values.configuration.speaker.email} onChange={(event)=>onChangeSpeaker(event,"email")} placeholder={"Email"}></Input>
         </Col>
        </Row>
       </Col>

      </Row>
      </Modal>
  )
 }