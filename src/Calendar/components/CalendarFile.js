import React,{useState , useEffect} from 'react';
import "../Calendar.scss";
import {Calendar, Badge, Button , Modal , Tag} from 'antd';
import {CalendarOutlined , ClockCircleOutlined , DeleteOutlined  } from "@ant-design/icons";
import {useSelector} from "react-redux";

function getListData(value) {
    let listData;

    switch (value.date()) {
        case 2:
            listData = [
                { type: 'Archivé', content: "Titre webinar fini…" },
            ];
            break;
        case 4:
            listData = [
                { type: 'En cours', content: 'Titre webinar en cours…' },
            ];
            break;
        case 6:
            listData = [
                { type: 'A venir', content: 'Titre webinar à venir…' },
            ];
            break;
        case 8:
            listData = [
                { type: 'Archivé', content: "Titre webinar fini…" },
            ];
            break;
        case 9:
            listData = [
                { type: 'En cours', content: 'Titre webinar en cours…' },
            ];
            break;
        case 10:
            listData = [
                { type: 'A venir', content: 'Titre webinar à venir…' },
            ];
            break;
        default:
    }
    return listData || [];
}


function DateCellRender(value) {
    const [visibleAVenir , SetVisibleAVenir] = useState(false);
    const [visibleEnCours , SetVisibleEnCours] = useState(false);
    const [visibleArchivé ,  SetVisibleArchivé] = useState(false)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    !darkMode&&document.documentElement.style.setProperty('--modal_background', "white")
    const listData = getListData(value);
    let styles = getComputedStyle(document.documentElement);

    //show Modal A venir
    const onShowModal=()=>{
        SetVisibleAVenir(true)
    }
    // Cancel modal A venir
    const handleCancel = () => {
        SetVisibleAVenir(false)
    };
    // show Modal En cours
    const onShowModalEnCours = () =>{
        SetVisibleEnCours(true)
    }
    //Cancel modal En cours
    const handleCancelEnCours = () =>{
        SetVisibleEnCours(false)
    }
    //show modal Archivé
    const onShowModalArchivé = () =>{
        SetVisibleArchivé(true)
    }
    // Cancel modal Archivé
    const handleCancelArchivé = () =>{
        SetVisibleArchivé(false)
    }

    return (
        <div className="events">
            {listData.map(item => {

                if(item.type==='A venir'){
                   return(
                       <div>
                       <Tag className={"btn_error"} color="blue" onClick={()=>onShowModal()}>
                           <Badge color={'#007fcb'} text={item.content} style={{color:"#007fcb" , borderRadius:"2px"}}/>
                       </Tag>

                    <Modal
                        visible={visibleAVenir}
                        title={<Badge style={{fontSize:"16px" , fontWeight:"500"}}  color={'#007fcb'} text={'Lorem ipsum dolor sit amet, consectetuer'}/>}
                        onCancel={handleCancel}
                        footer={[
                            <div className={"footer_modal_Avenir"}>
                                <div><Button><DeleteOutlined /> Supprimer</Button></div>

                                <div>
                            <Button key="back" onClick={handleCancel}>
                                Annuler
                            </Button>
                            <Button key="submit" type="primary"  >
                                Visualiser
                            </Button>
                                </div>

                            </div>
                        ]}
                    >
                       <div className={"body_Modal"}>
                           <div className={"div_image_modal"}><img src={"https://i.pinimg.com/originals/e2/bd/0e/e2bd0e31dcc375ad97ce3fe652456afa.jpg"}/></div>
                           <div className={"div_time_calendar"}>
                               <div className={"type_btn"}><Tag color="blue">A venir</Tag></div>
                               <div className={"div2_time_calendar"}>
                                   <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><CalendarOutlined /> 13-05-2121</p>
                                   <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><ClockCircleOutlined /> 16:30:00</p>
                               </div>
                           </div>
                       </div>
                    </Modal>
                       </div>
                   )
                }else if(item.type==='En cours'){
                    return (
                        <div>
                            <Tag className={"btn_error"} color="green" onClick={()=>onShowModalEnCours()}>
                                <Badge color={'#52c41a'} text={item.content} style={{color:"#52c41a" , borderRadius:"2px"}}/>
                            </Tag>

                            <Modal
                                visible={visibleEnCours}
                                title={<Badge style={{fontSize:"16px" , fontWeight:"500"}}  color={'#52c41a'} text={'Lorem ipsum dolor sit amet, consectetuer'}/>}
                                onCancel={handleCancelEnCours}
                                footer={[
                                    <div className={"modal_footer_EnCours"}>
                                    <Button key="back" onClick={handleCancelEnCours}>
                                        Annuler
                                    </Button>
                                    <Button key="submit" type="primary"  >
                                        Visualiser
                                    </Button>
                                    </div>
                                ]}
                            >
                                <div className={"body_Modal"}>
                                    <div className={"div_image_modal"}><img src={"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"}/></div>
                                    <div className={"div_time_calendar"}>
                                        <div className={"type_btn"}><Tag color="green">En cours</Tag></div>
                                        <div className={"div2_time_calendar"}>
                                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><CalendarOutlined /> 28-05-2121</p>
                                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><ClockCircleOutlined /> 12:30:00</p>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    )
                }else if(item.type==='Archivé'){
                    return (
                        <div>
                            <Tag  color="red" onClick={()=>onShowModalArchivé()}>
                                <Badge color={"#B7B7B7"} text={item.content} style={{color:"rgba(0,0,0,0.65)" , borderRadius:"2px"}}/>
                            </Tag>

                            <Modal
                                visible={visibleArchivé}
                                title={<Badge style={{fontSize:"16px" , fontWeight:"500"}}  color={'#B7B7B7'} text={'Lorem ipsum dolor sit amet, consectetuer'}/>}
                                onCancel={handleCancelArchivé}
                                footer={[
                                    <div className={"modal_footer_Archivé"}>
                                    <Button key="back" onClick={handleCancelArchivé}>
                                        Annuler
                                    </Button>
                                    <Button key="submit" type="primary"  >
                                        Visualiser
                                    </Button>
                                    </div>
                                ]}
                            >
                                <div className={"body_Modal"}>
                                    <div className={"div_image_modal"}><img src={"https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29yb25hdmlydXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"}/></div>
                                    <div className={"div_time_calendar"}>
                                        <div className={"type_btn"}><Tag color="gray">Archivé</Tag></div>
                                        <div className={"div2_time_calendar"}>
                                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><CalendarOutlined /> 28-05-2121</p>
                                            <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}><ClockCircleOutlined /> 12:30:00</p>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    )
                }
            })}
        </div>
    );
}


function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}


function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}





function CalendarFile() {

    return(
        <div className={"CalendarFile"}>

            <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender}  />

        </div>
    );
}
export default CalendarFile;