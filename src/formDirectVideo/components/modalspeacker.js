import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Modal,Upload} from 'antd'
import '../formDirectVideo.scss'
import {UploadOutlined} from '@ant-design/icons';

 export const ModalSpeaker =(isModalVisible,handleOk,handleCancel)=>{

  const props = {
   name: 'file',
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   headers: {
    authorization: 'authorization-text',
   },
  }

  return(
      <Modal className="modal-speaker" title="Ajouter un intervenant" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
             footer={[
              <Button key="back" >
               Annuler
              </Button>,
              <Button key="submit" type="primary" >
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
          <Input placeholder={"Nom"}></Input>
         </Col>
         <Col  span={12}>
          <Input placeholder={"Prenom"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Fonction</span>
         </Col>
         <Col span={24}>
          <Input placeholder={"Fonction"}></Input>
         </Col>
        </Row>
       </Col>

       <Col span={24}>
        <Row gutter={[0, 8]}>
         <Col span={24}>
          <span style={{fontSize: "15px", fontWeight: "bold", fontFamily: "system-ui"}}>Email</span>
         </Col>
         <Col span={24}>
          <Input placeholder={"Email"}></Input>
         </Col>
        </Row>
       </Col>

      </Row>
      </Modal>
  )
 }