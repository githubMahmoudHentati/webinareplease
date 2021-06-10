import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Avatar,Upload , Select} from 'antd'
import '../compteSettings.scss'
import {UserOutlined,UploadOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
const { Option } = Select;

 export const CompteGeneralInformation =()=>{

     // dark mode from redux
     const darkMode = useSelector((state)=> state.Reducer.DarkMode)

     const props = {
         name: 'file',
         action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
         headers: {
             authorization: 'authorization-text',
         },
     };

     function onChange(value) {
         console.log(`selected ${value}`);
     }

     function onBlur() {
         console.log('blur');
     }

     function onFocus() {
         console.log('focus');
     }

     function onSearch(val) {
         console.log('search:', val);
     }

     return(
         <Row gutter={[20, 0]}>
             <Col span={5}>
                 <Row justify={"space-between"} gutter={[0, 15]}>
                     <Col offset={2} span={22}>
                         <span style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Avatar</span>
                     </Col>
                     <Col span={24}>
                         <Avatar style={{background:darkMode===false?"RGB(231, 247, 255)":"#141414",border:darkMode===false?"1px solid RGB(231, 247, 255)" : "1px solid rgba(255, 255, 255, 0.15)", color:darkMode===false?"RGB(0, 127, 203)":"rgba(255, 255, 255, 0.85)"}}size={150} icon={<UserOutlined />} />
                     </Col>
                     <Col>
                         <Upload {...props}>
                             <Button icon={<UploadOutlined />} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Change l'avatar</Button>
                         </Upload>
                     </Col>
                 </Row>
             </Col>
             <Col span={12}>
                 <Row gutter={[0, 30]}>
                     <Col span={24} className={"col-forms"}>
                         <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Informations générales</span>
                     </Col>
                     <Col span={24}>
                         <Row gutter={[0, 20]}>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Nombre d'employées </span>
                                     </Col>
                                     <Col span={24}>
                                         <Select
                                             showSearch
                                             style={{ width: "100%" }}
                                             placeholder="Entre 5 - 10 employé(e)s"
                                             optionFilterProp="children"
                                             onChange={onChange}
                                             onFocus={onFocus}
                                             onBlur={onBlur}
                                             onSearch={onSearch}
                                             filterOption={(input, option) =>
                                                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                             }
                                         >
                                             <Option value="5">5</Option>
                                             <Option value="10">10</Option>
                                             <Option value="20">20</Option>
                                         </Select>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span style={{
                                      fontSize: "16px",
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      fontFamily: "system-ui",
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
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
                                      <Button style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Annuler</Button>
                                  </Col>
                                  <Col >
                                      <Button type={"primary"} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Mettre a jour</Button>
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