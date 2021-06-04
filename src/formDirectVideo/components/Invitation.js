import React, { useState,useEffect,useRef } from 'react';
import {Row,Col,Input,Button,Card,Tabs,Breadcrumb,Menu , Select} from 'antd'
import {  InfoCircleFilled } from '@ant-design/icons';

const { Option } = Select;



function handleChange(value) {
    console.log(`selected ${value}`);
}

function Invitation(){
    return(
        <div className={"Invitation"}>
            <div className={"title_invitation"}><h3>Envoi des invitations</h3></div>{/*./title_invitation*/}

            <div className={"groupEmail"}>
                <span>Groupe d'emails   <InfoCircleFilled className={"infosIcon"}/></span>
                <Select
                    className={"selectGroupGmail"}
                    showArrow
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select one country"
                    defaultValue={['Groupe 01']}
                    onChange={handleChange}
                    optionLabelProp="label"
                >
                    <Option value="Groupe 01" label="Groupe 01">
                        <div className="demo-option-label-item">
                            Groupe 01
                        </div>
                    </Option>
                    <Option value="Groupe 02" label="Groupe 02">
                        <div className="demo-option-label-item">
                            Groupe 02
                        </div>
                    </Option>
                    <Option value="Groupe 03" label="Groupe 03">
                        <div className="demo-option-label-item">
                            Groupe 03
                        </div>
                    </Option>
                    <Option value="Groupe 04" label="Groupe 04">
                        <div className="demo-option-label-item">
                            Groupe 04
                        </div>
                    </Option>
                </Select>
            </div>{/*./groupEmail*/}

        </div>
    )
}
export default Invitation