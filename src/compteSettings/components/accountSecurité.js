import React, { useState,useEffect,useRef } from 'react';
import {Row,Col} from 'antd'
import '../compteSettings.scss'

 export const AccountSecurie =() =>{
     return(
        <Row  gutter={[0, 25]}>
            <Col span={24}>
                <span >Sécurité et accès</span>
            </Col>
            <Col span={24}>
                <Row justify={"space-between"}  gutter={[0, 15]}>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <span >Mot de passe</span>
                            </Col>
                            <Col span={24}>
                              Fiabilité du mot de passe actuel: <span style={{color:"RGB(69, 195, 59)"}}>Moyen</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{display:"flex ",alignItems:"center"}}span={2}>
                        <a>Modifier</a>
                    </Col>
                </Row>
            </Col>
        </Row>
     )
 }