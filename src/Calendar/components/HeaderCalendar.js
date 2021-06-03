import React,{useState , useEffect} from 'react';
import {Breadcrumb, Button} from "antd";
import {ArrowLeftOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";

import "../Calendar.scss"

function HeaderCalendar() {
    const history = useHistory();

    // handle click arrow calendar
    const handleClickArrowCalendar = () =>{
        history.push('/showVideos')
    }

    return(
        <div className={"HeaderCalendar"}>

            <div className="BreadcrumbDivHeaderCalendrier">
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <span>Accueil</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                        <span>Direct</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Calendrier</Breadcrumb.Item>
                </Breadcrumb>

            </div>{/*./Breadcrumb*/}

            <div className="MesDirectsHeaderCalendrier">
               <div className={"div_retour"}><ArrowLeftOutlined className={"arrow"} onClick={()=>handleClickArrowCalendar()}/> <h4 className={"h4"}>Calendrier</h4></div>
            </div>{/*./TousMedia*/}

        </div>
    );
}
export default HeaderCalendar;