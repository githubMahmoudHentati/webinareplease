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
                <span className={"spn1_securité"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row justify={"space-between"}  gutter={[0, 15]}>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Mot de passe</span>
                            </Col>
                            <Col span={24}>
                                <span className={"spn2_motDePasse"} style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} >Fiabilité du mot de passe actuel :</span>     <span className={"spn2_motDePasse"} style={{color:"RGB(69, 195, 59)"}}>   Moyen</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display:"flex ",alignItems:"center"}}span={2}>
                        <a className={"spn2_motDePasse"} onClick={()=>dispatch(setAccountSetting(2))}>Modifier</a>
                    </Col>
                </Row>
            </Col>
        </Row>
     )
 }