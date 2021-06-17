import React,{useState , useEffect} from 'react';
import {Breadcrumb, Button} from "antd";
import {ArrowLeftOutlined } from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import "../Calendar.scss"

function HeaderCalendar() {
    const history = useHistory();
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    // handle click arrow calendar
    const handleClickArrowCalendar = () =>{
        history.push('/showVideos')
    }

    return(
        <div className={"HeaderCalendar"}>

            <div className="BreadcrumbDivHeaderCalendrier">
                <Breadcrumb style={{color:darkMode===false?"":"#ffffff" , fontSize:"14px" , fontFamily: "SF Pro Display",fontWeight: "normal"}}>
                    <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}} >
                        <span>Accueil</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}}>
                        <span>Direct</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{color:darkMode===false?"":"#ffffff"}}>Calendrier</Breadcrumb.Item>
                </Breadcrumb>

            </div>{/*./Breadcrumb*/}

            <div className="MesDirectsHeaderCalendrier"  style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
               <div className={"div_retour"}><ArrowLeftOutlined style={{color:darkMode===false?"":"white"}} className={"arrow"} onClick={()=>handleClickArrowCalendar()}/> <h4 style={{color:darkMode===false?"":"white"}} className={"h4"}>Calendrier</h4></div>
            </div>{/*./TousMedia*/}

        </div>
    );
}
export default HeaderCalendar;