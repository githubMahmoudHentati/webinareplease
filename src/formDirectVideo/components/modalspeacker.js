import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Modal,Upload} from 'antd'
import '../formDirectVideo.scss'
import {UploadOutlined} from '@ant-design/icons';
import {Hooks} from "../utils/hooks";

 export const ModalSpeaker =({isVisible})=>{
 console.log("isModalVisible",isVisible)
  const props = {
   name: 'file',
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   headers: {
    authorization: 'authorization-text',
   },
  }
  const {handleOk,handleCancel,onChange,values}= Hooks()

  return(
      <Modal className="modal-speaker" title="Ajouter un intervenant" visible={isVisible} onOk={handleOk} onCancel={handleCancel}
             footer={[
              <Button onClick={handleCancel} key="back" >
               Annuler
              </Button>,
              <Button onClick={handleOk} key="submit" type="primary" >
               Ajouter
              </Button>,
             ]}>
      <Row gutter={[0, 20]}>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Photo</span>
         </Col>
         <Col span={24}>
          <Upload {...props} listType="picture">
           <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[10, 8]}>
       <Col span={12}>
        <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Nom</span>
       </Col>
       <Col  span={12}>
        <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Prénom</span>
       </Col>
         <Col span={12}>
          <Input defaultValue={values.speaker.name} onChange={(event)=>onChange(event,"name")}placeholder={"Nom"}></Input>
         </Col>
         <Col  span={12}>
          <Input defaultValue={values.speaker.lastName} onChange={(event)=>onChange(event,"lastName")} placeholder={"Prenom"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Fonction</span>
         </Col>
         <Col span={24}>
          <Input defaultValue={values.speaker.title} onChange={(event)=>onChange(event,"title")} placeholder={"Fonction"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Email</span>
         </Col>
         <Col span={24}>
          <Input defaultValue={values.speaker.email} onChange={(event)=>onChange(event,"email")} placeholder={"Email"}></Input>
         </Col>
        </Row>
       </Col>

      </Row>
      </Modal>
  )
 }