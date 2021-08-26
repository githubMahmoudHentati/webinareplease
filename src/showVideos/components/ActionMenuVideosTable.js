import React from 'react';
import {
    InfoCircleOutlined,
    EditOutlined,
    LinkOutlined,
    DeleteOutlined,
    EyeOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Button, Modal, Input, message} from 'antd';
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import {useTranslation} from "react-i18next";
import useWindowDimensions from "../../utils/components/getWindowDimensions";
import {setDirectSetting} from "../../utils/redux/actions";
import {useDispatch} from 'react-redux'

const {TextArea} = Input;

function useActionMenu({record}) {

    const dispatch = useDispatch()
    const {
        handleClickStreamin,
        handleDeleteOneRow,
        handleClickDropdowMenu,
        handleInfos,
        handleCancel,
        infosLives,
        updateLive,
        handleExport,
        handleCancelModalExport,
        exportLives
    } = Hooks()
    const {t} = useTranslation();
    var x = useWindowDimensions() // fonction js pour afficher interface seulement en 767px de width
    const history = useHistory()

    // use Selector redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)

    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={() => handleInfos()}><InfoCircleOutlined
                className={"dropdownIcon"}/>{t("ShowVideo.infos")}</Menu.Item>
            {record.owner ? <Menu.Item onClick={() => updateLive(record.id)}><EditOutlined
                className={"dropdownIcon"}/>{t("ShowVideo.Modifier")}</Menu.Item> : null}
            <Menu.Item onClick={() => handleExport()}><LinkOutlined className={"dropdownIcon"}/>Export</Menu.Item>
            <Menu.Item onClick={() => history.push("/FormDirectVideo", dispatch(setDirectSetting(4)))}><span
                className="icon-Templates dropdownIconTemp"></span> {t("ShowVideo.Templates")}</Menu.Item>
            {record.owner ? <Menu.Item onClick={() => handleDeleteOneRow(record.id)}><DeleteOutlined
                className={"dropdownIcon"}/>{t("ShowVideo.Delete")}</Menu.Item> : null}
        </Menu>
    );


    // fonction pour copier url participant
    const CopyUrlParticipant = () => {
        if (document.getElementById("myUrlParticipant").value === "") {
            return message.error({content: t("ShowVideo.EmptyField"), duration: 2});
        } else {
            document.getElementById("myUrlParticipant").select();
            document.execCommand("Copy");
            message.success({content: t("ShowVideo.SuccessCopy"), duration: 2});
        }
    }

    // fonction pour copier url auditeur
    const CopyUrlAuditeur = () => {
        if (document.getElementById("myUrlAuditeur").value === "") {
            return message.error({content: t("ShowVideo.EmptyField"), duration: 2});
        } else {
            document.getElementById("myUrlAuditeur").select();
            document.execCommand("Copy");
            message.success({content: t("ShowVideo.SuccessCopy"), duration: 2});
        }
    }

    const CopyLienIntegration = () => {
        if (document.getElementById("myLienIntegration").value === "") {
            return message.error({content: t("ShowVideo.EmptyField"), duration: 2});
        } else {
            document.getElementById("myLienIntegration").select();
            document.execCommand("Copy");
            message.success({content: t("ShowVideo.SuccessCopy"), duration: 2});
        }
    }

    // const handleClickStreamin = () =>{
    //       if (record.status === -1){
    //           history.push('/webinarStudioLive')
    //       }else {
    //         return null;
    //       }
    // }

    const actionColumnView = (
        <div className="action">
            {
                !x.matches && <Tooltip getPopupContainer={() => document.querySelector(".btn_Visualiser_diffuser")}
                                       title={t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser"))}>
                    <Button className={"btn_Visualiser_diffuser "} style={{
                        backgroundColor: darkMode === false ? "" : "#1D1D1D",
                        color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                        border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                    }} onClick={() => handleClickStreamin(record)}>
                        {
                            record.status === -1 ? <VideoCameraOutlined id={"icon_vs"}/> : <EyeOutlined id={"icon_vs"}/>
                        }
                        <span
                            id={"span_diffuser"}>{t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser"))}</span>

                    </Button>
                </Tooltip>
            }
            <div>
        <span className="span_action">
      <Dropdown getPopupContainer={() => document.querySelector(".DataTable")} className={"drp_action"}
                overlay={actionMenu} trigger={['click']}>
        <a href="#/" onClick={(e) => handleClickDropdowMenu(e, record.id)} className="linkid"
           style={{fontSize: "30px", color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)"}}>
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
                    <Input placeholder="//demo.webtv-solution.com/fo/embed/267" name={"inputUrlDiffusion"}
                           value={infosLives.inputUrlDiffusion}/>
                </div>
                {/*./div_Url_diffusion*/}
                <div className="div_Nom_de_flux">
                    <span>{t("ShowVideo.StreamName")}</span>
                    <Input placeholder={t("ShowVideo.LiveStreamName")} name={"streamName"}
                           value={infosLives.streamName}/>
                    <Input placeholder={t("ShowVideo.DirectID")} name={"idLive"} value={infosLives.idLive}/>
                    <Input placeholder={t("ShowVideo.DirectPassword")} name={"pwdLive"} value={infosLives.pwdLive}/>

                </div>
                {/*./div_Nom_de_flux*/}
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
                    <Input id="myUrlParticipant" placeholder="//demo.webtv-solution.com/fo/embed/267"
                           name={"participantUrl"} value={exportLives.participantUrl}/>
                    <div className="div_Copier"><Button onClick={CopyUrlParticipant}>{t("ShowVideo.Copier")}</Button>
                    </div>
                </div>
                {/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.AuditorUrl")}</span>
                    <Input id="myUrlAuditeur" placeholder="//demo.webtv-solution.com/fo/embed/267" name={"auditorUrl"}
                           value={exportLives.auditorUrl}/>
                    <div className="div_Copier"><Button onClick={CopyUrlAuditeur}>{t("ShowVideo.Copier")}</Button></div>
                </div>
                {/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.IntegrationLink")}</span>
                    <TextArea id="myLienIntegration" rows={4} placeholder="//demo.webtv-solution.com/fo/embed/267"
                              name={"integrationUrl"} value={exportLives.integrationUrl}/>
                    <div className="div_Copier"><Button onClick={CopyLienIntegration}>{t("ShowVideo.Copier")}</Button>
                    </div>
                </div>
                {/*./div_Url_diffusion*/}

            </Modal>{/*./ModalExporter*/}


        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;