import React, { useState } from 'react';
import {InfoCircleOutlined,DownloadOutlined,EditOutlined,LinkOutlined,FilePdfOutlined,PictureOutlined,DeleteOutlined , EyeOutlined , InsertRowLeftOutlined , VideoCameraOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Popconfirm, Button , Modal , Input , message} from 'antd';
import {useSelector} from "react-redux";
import {setPaginationProps} from "../store/showVideosAction";
import { useDispatch} from "react-redux";
import {Hooks} from "../utils/hooks";
import {useTranslation} from "react-i18next";
import useWindowDimensions from "../../utils/components/getWindowDimensions";

const { SubMenu } = Menu;
const { TextArea } = Input;

function useActionMenu({record}) {

    const dispatch = useDispatch()
    const {handleDeleteOneRow , handleClickDropdowMenu , DataVideos , handleInfos , handleCancel , infosLives,updateLive , handleExport , handleCancelModalExport , exportLives }=Hooks()
    const { t, i18n } = useTranslation();
    var  x  = useWindowDimensions() // fonction js pour afficher interface seulement en 767px de width

    console.log("DataVideo123456789",DataVideos.data.map(item=>item.status))

    const [visibleModalExport , SetVisibleModalExport] = useState(false)

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={()=>handleInfos()}><InfoCircleOutlined />{t("ShowVideo.infos")}</Menu.Item>
            <Menu.Item onClick={()=>updateLive(record.id)}><EditOutlined />{t("ShowVideo.Modifier")}</Menu.Item>
            <Menu.Item onClick={()=>handleExport()}><LinkOutlined />Export</Menu.Item>
            <Menu.Item ><span className="icon-Templates"></span> {t("ShowVideo.Templates")}</Menu.Item>
            <Menu.Item onClick={()=>handleDeleteOneRow(record.id)}><DeleteOutlined />{t("ShowVideo.Delete")}</Menu.Item>
        </Menu>
    );


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
            message.success({content:t("ShowVideo.SuccessCopy"),duration:2});
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
                !x.matches &&  <Tooltip title={t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser" ))}>
                    <Button className={"btn_Visualiser_diffuser "} style={{
                        backgroundColor: darkMode === false ? "" : "#1D1D1D",
                        color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                        border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                    }}>
                        {
                            record.status === -1 ? <VideoCameraOutlined id={"icon_vs"}/> : <EyeOutlined id={"icon_vs"}/>
                        }
                        <span id={"span_diffuser"}>{ t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser" ))}</span>

                    </Button>
                </Tooltip>
            }
            <div>
        <span className="span_action">
      <Dropdown getPopupContainer={() => document.querySelector(".drp_action")}  className={"drp_action"} overlay={actionMenu} trigger={['click']}  >
        <a  onClick={(e)=>handleClickDropdowMenu(e, record.id)} className="linkid" href="#"  style={{ fontSize:"30px"  , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" }} >
         ...
        </a>
      </Dropdown>
    </span>
            </div>

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
                visible={exportLives.visibleExport}
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
                    <Input id="myUrlParticipant" placeholder="//demo.webtv-solution.com/fo/embed/267" name={"participantUrl"} value={exportLives.participantUrl}/>
                    <div className="div_Copier"><Button onClick={CopyUrlParticipant}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.AuditorUrl")}</span>
                    <Input id="myUrlAuditeur" placeholder="//demo.webtv-solution.com/fo/embed/267" name={"auditorUrl"} value={exportLives.auditorUrl}/>
                    <div className="div_Copier"><Button onClick={CopyUrlAuditeur}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.IntegrationLink")}</span>
                    <TextArea id="myLienIntegration" rows={4} placeholder="//demo.webtv-solution.com/fo/embed/267" name={"integrationUrl"} value={exportLives.integrationUrl}/>
                    <div className="div_Copier"><Button onClick={CopyLienIntegration}>{t("ShowVideo.Copier")}</Button></div>
                </div>{/*./div_Url_diffusion*/}

            </Modal>{/*./ModalExporter*/}



        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;