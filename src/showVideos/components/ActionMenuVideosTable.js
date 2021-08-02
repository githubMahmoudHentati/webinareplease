import React, { useState } from 'react';
import {InfoCircleOutlined,DownloadOutlined,EditOutlined,LinkOutlined,FilePdfOutlined,PictureOutlined,DeleteOutlined , EyeOutlined , InsertRowLeftOutlined , VideoCameraOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Popconfirm, Button , Modal , Input , message} from 'antd';
import {useSelector} from "react-redux";
import {setPaginationProps} from "../store/showVideosAction";
import { useDispatch} from "react-redux";
import {Hooks} from "../utils/hooks";
import {useTranslation} from "react-i18next";

const { SubMenu } = Menu;
const { TextArea } = Input;

function useActionMenu({record}) {

    const dispatch = useDispatch()
    const {handleDeleteOneRow , handleClickDropdowMenu , DataVideos , handleInfos , handleCancel , infosLives,updateLive }=Hooks()
    const { t, i18n } = useTranslation();

    console.log("DataVideo123456789",DataVideos.data.map(item=>item.status))

    const [visibleModalExport , SetVisibleModalExport] = useState(false)

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    !darkMode&&document.documentElement.style.setProperty('--modal_background', "white")
    const history = useHistory();
    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={()=>handleInfos()}><InfoCircleOutlined />{t("ShowVideo.infos")}</Menu.Item>
            <Menu.Item onClick={()=>updateLive(record.id)}><EditOutlined />{t("ShowVideo.Modifier")}</Menu.Item>
            <Menu.Item onClick={()=>handleExport()}><LinkOutlined />Export</Menu.Item>
            <Menu.Item ><span className="icon-Templates"></span> {t("ShowVideo.Templates")}</Menu.Item>
            <Menu.Item onClick={()=>handleDeleteOneRow([record.id])}><DeleteOutlined />{t("ShowVideo.Delete")}</Menu.Item>
        </Menu>
    );
    //fonction handleExport and show modal infos
    const handleExport = () =>{SetVisibleModalExport(true)}
    // handle cancel Modal export
    const handleCancelModalExport = () =>{SetVisibleModalExport(false)}

    // fonction pour copier url participant
    const CopyUrlParticipant = () =>{
        if(document.getElementById("myUrlParticipant").value === ""){
            return message.error({content:t("ShowVideo.EmptyField"),duration:2});
        }else {
            document.getElementById("myUrlParticipant").select();
            document.execCommand("Copy");
            message.success({content:t("ShowVideo.SuccessCopy"),duration:2});
        }
    }

    // fonction pour copier url auditeur
    const CopyUrlAuditeur = () =>{
        if(document.getElementById("myUrlAuditeur").value === ""){
            return message.error({content:t("ShowVideo.EmptyField"),duration:2});
        }else {
            document.getElementById("myUrlAuditeur").select();
            document.execCommand("Copy");
            message.success({content:t("SuccessCopy"),duration:2});
        }
    }

    const CopyLienIntegration = () =>{
        if(document.getElementById("myLienIntegration").value === ""){
            return message.error({content:t("ShowVideo.EmptyField"),duration:2});
        }else {
            document.getElementById("myLienIntegration").select();
            document.execCommand("Copy");
            message.success({content:t("ShowVideo.SuccessCopy"),duration:2});
        }
    }



    const actionColumnView = (
        <div className="action">
            {
                record.status === -1
                       ?
                        <Tooltip title={t("ShowVideo.Diffuser")}>
                            <Button className={"btn_Visualiser_diffuser extra-margin"} style={{
                                backgroundColor: darkMode === false ? "" : "#1D1D1D",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }}><VideoCameraOutlined id={"icon_vs"}/> <span id={"span_diffuser"}>{t("ShowVideo.Diffuser")}</span></Button>
                        </Tooltip>
                        :
                        <Tooltip title={t("ShowVideo.Visualiser")}>
                            <Button className={"btn_Visualiser_diffuser"} style={{
                                backgroundColor: darkMode === false ? "" : "#1D1D1D",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }}><EyeOutlined id={"icon_vs"}/> <span id={"span_diffuser"}>{t("ShowVideo.Visualiser")}</span></Button>
                        </Tooltip>

            }

        <span className="span_action">
      <Dropdown overlay={actionMenu} trigger={['click']}  onMouseEnter={()=>handleClickDropdowMenu([record.id])} >
        <a className="linkid" href="#"  style={{ fontSize:"30px"  , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" }} onClick={e => e.preventDefault()}>
          ...
        </a>
      </Dropdown>
    </span>

            <Modal
                visible={infosLives.visible}
                title={t("ShowVideo.Information")}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        {t("ShowVideo.Close")}
                    </Button>,
                ]}
            >
                <div className="div_Url_diffusion">
                   <span>{t("ShowVideo.BroadcastUrl")}</span>
                    <Input placeholder="//demo.webtv-solution.com/fo/embed/267" name={"inputUrlDiffusion"} value={infosLives.inputUrlDiffusion}/>
                </div>{/*./div_Url_diffusion*/}
                <div className="div_Nom_de_flux">
                    <span>{t("ShowVideo.StreamName")}</span>
                    <Input placeholder={t("ShowVideo.LiveStreamName")} name={"streamName"} value={infosLives.streamName}/>
                    <Input placeholder={t("ShowVideo.DirectID")} name={"idLive"} value={infosLives.idLive}/>
                    <Input placeholder={t("ShowVideo.DirectPassword")} name={"pwdLive"} value={infosLives.pwdLive}/>

                </div>{/*./div_Nom_de_flux*/}
            </Modal>{/*./ModalInfos*/}

            <Modal
                visible={visibleModalExport}
                title={t("ShowVideo.ExportLink")}
                onCancel={handleCancelModalExport}
                footer={[
                    <Button key="back" onClick={handleCancelModalExport}>
                        {t("ShowVideo.Close")}
                    </Button>,
                ]}
            >
                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.UrlParticipant")} </span>
                    <Input id="myUrlParticipant" placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyUrlParticipant}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.AuditorUrl")}</span>
                    <Input id="myUrlAuditeur" placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyUrlAuditeur}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.IntegrationLink")}</span>
                    <TextArea id="myLienIntegration" rows={4} placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyLienIntegration}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

            </Modal>{/*./ModalExporter*/}



        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;