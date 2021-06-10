import React, { useState,useEffect,useRef } from 'react';
import {Row,Col} from 'antd'
import '../compteSettings.scss'
import {useDispatch , useSelector} from "react-redux";
import {setAccountSetting} from "../../utils/redux/actions";

 export const SecurityAccount  =() =>{
     const dispatch = useDispatch()
     // dark mode from redux
     const darkMode = useSelector((state)=> state.Reducer.DarkMode)

     return(
        <Row  gutter={[0, 25]}>
            <Col span={24}>
                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",textAlign: 'left', fontSize: "20px", fontFamily: "system-ui",fontWeight:"bold"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row justify={"space-between"}  gutter={[0, 15]}>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" ,textAlign: 'left', fontSize: "14px", fontFamily: "system-ui",fontWeight: "500"}}>Mot de passe</span>
                            </Col>
                            <Col span={24}>
                                <span style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} >Fiabilité du mot de passe actuel :</span>     <span style={{color:"RGB(69, 195, 59)"}}>   Moyen</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display:"flex ",alignItems:"center"}}span={2}>
                        <a onClick={()=>dispatch(setAccountSetting(2))}>Modifier</a>
                    </Col>
                </Row>
            </Col>
        </Row>
     )
 }