import React from 'react';
import moment from "moment";
import {Badge, Button, Modal, Tag} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import defaultImg from "../../assets/webinarplease-thumb.jpg";
import "../Calendar.scss"
function CalendarModal({modalInfo, visible, handleCancel, handleDelete,handleStatusEvents}) {
    console.log("modalInfo", modalInfo)

    const { t, i18n } = useTranslation();
    const darkMode = useSelector((state) => state.Reducer.DarkMode);
    !darkMode && document.documentElement.style.setProperty('--modal_background', "white");
    return(
        <Modal

            visible={visible}
            title={<Badge className={"Modal-header-title"} color={modalInfo.type === "à venir" ? 'blue' : modalInfo.type === "en cours" ? 'green' : modalInfo.type === "archivé" && 'gray'}
                          text={modalInfo.content}/>}
            onCancel={handleCancel}
            footer={[
                <div className={"modal-footer"}>
                    <div>{modalInfo.status == -1 ?
                        <Button onClick={handleDelete}><DeleteOutlined/>{t("Calendar.Delete")}
                        </Button> : null}</div>

                    <div>
                        <Button key="back" onClick={handleCancel}>
                            {t("Calendar.Cancel")}

                        </Button>
                        <Button className={"ModalButtonPrimary"} type="primary" key="submit" onClick={()=>handleStatusEvents(modalInfo)}>
                            {modalInfo.status == -1 ? t("Calendar.Edit") : modalInfo.status == 0 ? t("Calendar.Visualize") : t("Calendar.Broadcast")}
                        </Button>
                    </div>

                </div>
            ]}
        >
            <div className={"body_Modal"}>
                <div className={"div_image_modal"}><img
                    src={modalInfo.thumbnail ? modalInfo.thumbnail : defaultImg}/>
                </div>
                <div className={"div_time_calendar"}>
                    <div className={"type_btn"}><Tag
                        color={modalInfo.type === "à venir" ? 'blue' : modalInfo.type === "en cours" ? 'green' : modalInfo.type === "archivé" && 'gray'}>{modalInfo.type === "à venir" ? t("ShowVideo.ComingSoon") : (modalInfo.type === "en cours" ? t("ShowVideo.InProgress") : t("ShowVideo.Archived"))}</Tag>
                    </div>
                    <div className={"modal-div2_time_calendar"}>
                        <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                            <CalendarOutlined className={"div2_time_calendar_icon"}/>{modalInfo.date}</p>
                        <p style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85"}}>
                            <ClockCircleOutlined className={"div2_time_calendar_icon"}/>{modalInfo.time}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CalendarModal;
