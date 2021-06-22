import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu,Avatar,Upload , Select , message} from 'antd'
import '../compteSettings.scss'
import {UserOutlined, UploadOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import {AvatarUpload} from "./avatarUpload"
const { Option } = Select;

 export const AccountGeneralInformation =()=>{

     // dark mode from redux
     const {generalInformationOnChange,generalInformationOnChangeSelect,values,darkMode}=Hooks()
     console.log("generalInformation",values)

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
                         <span className={"spn_CompteSettings"} style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Avatar</span>
                     </Col>
                     <Col span={24}>
                         <Avatar style={{
                             background: darkMode === false ? "RGB(231, 247, 255)" : "#141414",
                             border: darkMode === false ? "1px solid RGB(231, 247, 255)" : "1px solid rgba(255, 255, 255, 0.15)",
                             color: darkMode === false ? "RGB(0, 127, 203)" : "rgba(255, 255, 255, 0.85)"
                         }} size={150}
                                 src={values.generalInformation.avatar}
                                  icon={values.generalInformation.loading?<div>
                                      <LoadingOutlined/>
                                      <div style={{marginTop: 8}}>Upload</div>
                                  </div>:!values.generalInformation.avatar?<UserOutlined />:""}
                         />
                     </Col>
                     <Col>
                             <AvatarUpload />
                     </Col>
                 </Row>
             </Col>
             <Col span={12}>
                 <Row gutter={[0, 30]}>
                     <Col span={24} className={"col-forms"}>
                         <span style={{textAlign: 'left', fontSize:"20px", fontWeight:"500", fontFamily:"SF Pro Display" ,color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Informations générales</span>
                     </Col>
                     <Col span={24}>
                         <Row gutter={[0, 20]}>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Nom </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.name}name="name" placeholder={"Nom"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Prénom </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.lastName} name="lastName" placeholder={"Prénom"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Email </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.email}  name="email" placeholder={"Email"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Ville </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.city}  name="city" placeholder={"Ville"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Adresse </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.address} name= 'address' placeholder={"Adresse"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Nombre d'employées </span>
                                     </Col>
                                     <Col span={24}>
                                         <Select
                                             showSearch
                                             style={{ width: "100%" }}
                                             placeholder="Entre 5 - 10 employé(e)s"
                                             optionFilterProp="children"
                                             onChange={generalInformationOnChangeSelect}
                                             name="employeeNumberID"
                                             value={values.generalInformation.employeeNumberID}
                                             filterOption={(input, option) =>
                                                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                             }
                                         >
                                             <Option name="employeeNumberID" key ={1} value="1">entre 5-10 employé(e)s</Option>
                                             <Option name="employeeNumberID" key ={2} value="2">entre 10-20 employé(e)s</Option>
                                             <Option name="employeeNumberID"  key ={3}  value="3">entre 20-30 employé(e)s</Option>
                                         </Select>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Code postale </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.zipCode}  name="zipCode" placeholder={"Code postale"} onChange={generalInformationOnChange}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                                 <Row gutter={[0, 10]}>
                                     <Col span={24}>
                                  <span className={"spn_CompteSettings"} style={{
                                      color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"
                                  }}>Téléphone </span>
                                     </Col>
                                     <Col span={24}>
                                         <Input value={values.generalInformation.phone} name='phone' placeholder={"Téléphone"}></Input>
                                     </Col>
                                 </Row>
                             </Col>
                             <Col span={24}>
                              <Row justify={"end"}gutter={[10, 0]}>
                                  <Col>
                                      <Button className={"spn_CompteSettings"}  style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Annuler</Button>
                                  </Col>
                                  <Col >
                                      <Button className={"spn_CompteSettings"} type={"primary"} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)", border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Mettre a jour</Button>
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