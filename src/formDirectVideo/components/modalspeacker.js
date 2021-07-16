import React, { useState,useEffect,useRef } from 'react';
import {Row, Col, Input, Button, Modal, Upload, Form} from 'antd'
import '../formDirectVideo.scss'
import {UploadOutlined} from '@ant-design/icons';
import Hooks from "../utils/hooks";
import {UploadLogoSpeaker} from "../utils/uploadLogoSpeaker"
import {setSignUpConstraintDataOnchange} from "../../signUp/store/signUpAction";

 export const ModalSpeaker =({isVisible})=>{
  const [form] = Form.useForm();
  const requiredFieldRule = [{required: true, message: 'Champs requis'}];

  const isValidEmail = (email) => {
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(values.configuration.speaker.email)
  }

  const props = {
   name: 'file',
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   headers: {
    authorization: 'authorization-text',
   },
  }

  const {handleOk,handleCancel,onChangeSpeaker,values}= Hooks()
  let {onChangeFile,beforeUpload,removeLogoSpeaker} = UploadLogoSpeaker()

  useEffect(() => {
   form.setFieldsValue(values.configuration.speaker)
  }, []);

  return (
       <Modal className="modal-speaker" title="Ajouter un intervenant" visible={isVisible} onOk={form.submit} onCancel={handleCancel}
              // okButtonProps={{form:'category-editor-form', key: 'submit', htmlType: 'submit'}}
              footer={[
               <Button className={"input_modal"} onClick={handleCancel} key="back">
                Annuler
               </Button>,
               <Button onClick={form.submit} key='submit' htmlType='submit' className={"input_modal"}  type="primary">
                Ajouter
               </Button>,
              ]}>
        <Form
            form={form}
            layout="horizontal"
            name="product-form"
            onFinish={handleOk}
        >
        <Row gutter={[0, 20]}>

         <Col span={24}>
          <Row gutter={[0, 8]}>
           <Col span={24}>
            <span className={"span_modal"}>Photo</span>
           </Col>
           <Col span={24}>
            <Upload
                onRemove={removeLogoSpeaker}
                accept="image/jpeg,image/png"
                name="fileList"
                fileList={Array.isArray(values.configuration.speaker.logoSpeaker)?[...values.configuration.speaker.logoSpeaker]:[values.configuration.speaker.logoSpeaker]}
                onChange={onChangeFile}
                beforeUpload={{beforeUpload}}
                {...props} listType="picture">
             <Button className={"btn_upload_pic"} icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
           </Col>
          </Row>
         </Col>

         <Col span={24}>
          <Row gutter={[10, 8]}>
           <Col span={12}>
            <span className={"span_modal"}>Nom</span>
            <span className="require">*</span>
           </Col>
           <Col span={12}>
            <span className={"span_modal"}>Prénom</span>
            <span className="require">*</span>
           </Col>
           <Col span={12}>
            <Form.Item name="name" className={"form-item-style"}
                       rules={requiredFieldRule}
            >
             <Input className={"input_modal"} defaultValue={values.configuration.speaker.name}
                    onChange={(event) => onChangeSpeaker(event, "name")} placeholder={"Nom"}></Input>
            </Form.Item>
           </Col>
           <Col span={12}>
            <Form.Item name="lastName" className={"form-item-style"}
                       rules={requiredFieldRule}
            >
             <Input name="lastName" className={"input_modal"} defaultValue={values.configuration.speaker.lastName}
                    onChange={(event) => onChangeSpeaker(event, "lastName")} placeholder={"Prenom"}></Input>
            </Form.Item>
           </Col>
          </Row>
         </Col>

         <Col span={24}>
          <Row gutter={[0, 8]}>
           <Col span={24}>
            <span className={"span_modal"}>Fonction</span>
           </Col>
           <Col span={24}>
            <Form.Item name="title" className={"form-item-style"}
            >
             <Input name="title" className={"input_modal"} defaultValue={values.configuration.speaker.title}
                    onChange={(event) => onChangeSpeaker(event, "title")} placeholder={"Fonction"}></Input>
            </Form.Item>
           </Col>
          </Row>
         </Col>

         <Col span={24}>
          <Row gutter={[0, 8]}>
           <Col span={24}>
            <span className={"span_modal"}>Email</span>
            <span className="require">*</span>
           </Col>
           <Col span={24}>
            <Form.Item name="username" className={"form-item-style"}
                       rules={[
                        ({getFieldValue}) => ({
                         validator(_, value) {
                          if (isValidEmail(value)) {
                           return Promise.resolve('value');
                          }
                          return Promise.reject('Veuillez entrer un mail valide');
                         },
                        }),
                       ]}
            >
             <Input name="email" className={"input_modal"} defaultValue={values.configuration.speaker.email}
                    onChange={(event) => onChangeSpeaker(event, "email")} placeholder={"Email"}></Input>
            </Form.Item>
           </Col>
          </Row>
         </Col>

        </Row>
        </Form>
       </Modal>
  )
 }