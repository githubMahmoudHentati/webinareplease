import React,{useState , useEffect} from 'react';
import "../Calendar.scss";
import {Calendar, Badge, Button , Modal} from 'antd';
import {CalendarOutlined , ClockCircleOutlined  } from "@ant-design/icons";

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: `${"This is usual event."}` },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 9:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
}


function DateCellRender(value) {
    const [visible , SetVisible] = useState(false)
    const listData = getListData(value);
    const onShowModal=()=>{
        SetVisible(true)
    }
    const handleCancel = () => {
       SetVisible(false)
    };

    return (
        <div className="events">
            {listData.map(item => {

                if(item.type==='error'){
                   return(
                       <div>
                       <Button className={"btn_error"} onClick={()=>onShowModal()}>
                           <Badge color={'red'} text={item.content} />
                       </Button>

                    <Modal
                        visible={visible}
                        title={<Badge className={"badge_modal"} color={'red'} text={'Lorem ipsum dolor sit amet, consectetuer'}/>}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Annuler
                            </Button>,
                            <Button key="submit" type="primary"  >
                                Visualiser
                            </Button>,
                        ]}
                    >
                       <div className={"body_Modal"}>
                           <div className={"div_image_modal"}><img src={"https://miro.medium.com/max/8480/0*DoOXAwICXS_IILB8"}/></div>
                           <div className={"div_time_calendar"}>
                               <div className={"type_btn"}><span>Archivé</span></div>
                               <div className={"div2_time_calendar"}>
                                   <p><CalendarOutlined /> 13-05-2121</p>
                                   <p><ClockCircleOutlined /> 16:30:00</p>
                               </div>
                           </div>
                       </div>
                    </Modal>
                       </div>
                   )
                }else if(item.type==='success'){
                    return (
                        <Button>
                            <Badge color={'green'} text={item.content} />
                        </Button>
                    )
                }else if(item.type==='warning'){
                    return (
                        <Button>
                            <Badge color={'orange'} text={item.content} />
                        </Button>
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

            <Calendar dateCellRender={DateCellRender} monthCellRender={monthCellRender} />

        </div>
    );
}
export default CalendarFile;