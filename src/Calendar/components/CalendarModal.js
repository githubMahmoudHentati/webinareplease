import React from 'react';

import {Badge, Button, Modal, Tag,Image} from "antd";
import {CalendarOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useTranslation} from 'react-i18next';
import defaultImg from "../../assets/webinarplease-thumb.jpg";
import "../Calendar.scss"
import useWindowDimensions from "../../utils/components/getWindowDimensions";

function CalendarModal({modalInfo, visible, handleCancel, handleDelete, handleStatusEvents}) {
    var  x  = useWindowDimensions()
    const {t} = useTranslation();
    const darkMode = useSelector((state) => state.Reducer.DarkMode);
    return (
        <Modal

            visible={visible}
            title={<Badge className={"Modal-header-title"}
                          color={modalInfo.type === "à venir" ? 'blue' : modalInfo.type === "en cours" ? 'green' : modalInfo.type === "archivé" && 'gray'}
                          text={modalInfo.content}
            />}
            onCancel={handleCancel}
            footer={[
                <div className={"modal-footer "+( modalInfo.status !== -1 ? ' modal-footer--end' : '')}>
                    {
                        modalInfo.status == -1 &&
                            <Button onClick={handleDelete}>
                                <DeleteOutlined/>{  !x.matches && t("Calendar.Delete")
                            }</Button>
                    }
                    <div>
                        {/*<Button key="back" onClick={handleCancel}>*/}
                        {/*    {t("Calendar.Cancel")}*/}
                        {/*</Button>*/}
                        <Button className={"ModalButtonPrimary"} type="primary" key="submit"
                                onClick={() => handleStatusEvents(modalInfo)}>
                            {modalInfo.status == -1 ? t("Calendar.Edit") : modalInfo.status == 0 ? t("Calendar.Visualize") : t("Calendar.Broadcast")}
                        </Button>
                    </div>

                </div>
            ]}
        >
            <div className={"body_Modal"}>
                <div className={"div_image_modal"} ><Image
                    src={modalInfo.thumbnail} fallback={defaultImg} alt={""}/>
                </div>
                <div className={"div_time_calendar"}>
                    <div className={"type_btn"}><Tag
                        color={modalInfo.type === "à venir" ? 'blue' : modalInfo.type === "en cours" ? 'green' : modalInfo.type === "archivé" && 'gray'}>{modalInfo.type === "à venir" ? t("ShowVideo.ComingSoon") : (modalInfo.type === "en cours" ? t("ShowVideo.InProgress") : t("ShowVideo.Archived"))}</Tag>
                    </div>
                    <div className={"modal-div2_time_calendar"}>
                        <p style={{color: !darkMode? "" : "rgba(255, 255, 255, 0.85)"}}>
                            <CalendarOutlined className={"div2_time_calendar_icon"}/>{modalInfo.date}</p>
                        <p style={{color: !darkMode ? "" : "rgba(255, 255, 255, 0.85)"}}>
                            <ClockCircleOutlined className={"div2_time_calendar_icon"}/>{modalInfo.time}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CalendarModal;
