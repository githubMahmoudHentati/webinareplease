import React, { useState,useEffect,useRef } from 'react';
import {Row,Col} from 'antd'
import '../compteSettings.scss'
import {useDispatch} from "react-redux";
import {setAccountSecurity} from "../../utils/redux/actions";

 export const SecurityAccount  =() =>{
     const dispatch = useDispatch()

     return(
        <Row  gutter={[0, 25]}>
            <Col span={24}>
                <span style={{textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row justify={"space-between"}  gutter={[0, 15]}>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <span style={{textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "500"}}>Mot de passe</span>
                            </Col>
                            <Col span={24}>
                              Fiabilité du mot de passe actuel :     <span style={{color:"RGB(69, 195, 59)"}}>   Moyen</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display:"flex ",alignItems:"center"}}span={2}>
                        <a onClick={()=>dispatch(setAccountSecurity(2))}>Modifier</a>
                    </Col>
                </Row>
            </Col>
        </Row>
     )
 }