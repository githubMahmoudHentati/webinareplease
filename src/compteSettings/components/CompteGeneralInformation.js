import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Avatar,Upload} from 'antd'
import '../compteSettings.scss'
import {UserOutlined,UploadOutlined} from '@ant-design/icons';

 export const CompteGeneralInformation =()=>{

     const props = {
         name: 'file',
         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
         headers: {
             authorization: 'authorization-text',
         },
     };
     return(
         <Row gutter={[20, 0]}>
             <Col span={5}>
                 <Row justify={"space-between"} gutter={[0, 15]}>
                     <Col offset={2} span={22}>
                         <span>Avatar</span>
                     </Col>
                     <Col span={24}>
                         <Avatar style={{background:"RGB(231, 247, 255)",color:"RGB(0, 127, 203)"}}size={150} icon={<UserOutlined />} />
                     </Col>
                     <Col>
                         <Upload {...props}>
                             <Button icon={<UploadOutlined />}>Change l'avatar</Button>
                         </Upload>
                     </Col>
                 </Row>
             </Col>
             <Col span={12}>
                 <Row gutter={[0, 30]}>
                     <Col span={24} className={"col-forms"}>
                         <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Informations générales</span>
                     </Col>
                     <Col span={24}>
                         <Row gutter={[0, 20]}>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Nom </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Nom"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Prénom </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Prénom"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Email </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Email"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Ville </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Ville"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Adresse </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Adresse"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Nombre d'employées </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Nombre d'employé"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Code postale </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Code postale"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui"
                                  }}>Téléphone </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input placeholder={"Téléphone"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                              <Row justify={"end"}gutter={[10, 0]}>
                                  <Col>
                                      <Button>Annuler</Button>
                                  </Col>
                                  <Col >
                                      <Button type={"primary"}>Mettre a jour</Button>
                                  </Col>
                              </Row>
                             </Col>

                         </Row>
                     </Col>
                 </Row>
             </Col>
         </Row>
     )
 }