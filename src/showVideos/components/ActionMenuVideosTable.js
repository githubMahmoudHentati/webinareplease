import React, {useState , useRef} from 'react';
import {
    InfoCircleOutlined,
    EditOutlined,
    LinkOutlined,
    DeleteOutlined,
    EyeOutlined,
    VideoCameraOutlined,
    CopyFilled,
    EyeTwoTone,
    EyeInvisibleOutlined
} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Button, Modal, Input, message} from 'antd';
import {useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import {useTranslation} from "react-i18next";
import useWindowDimensions from "../../utils/components/getWindowDimensions";
import {setDirectSetting} from "../../utils/redux/actions";
import {useDispatch} from 'react-redux'
import {Row,Col} from 'antd'
import {setPaginationProps} from "../store/showVideosAction";
const {TextArea} = Input;

function useActionMenu({record}) {
    const dispatch = useDispatch()

    const [statusSuccessMessages , setStatusSuccessMessages]=useState(true)
    const [statusErrorMessages , setStatusErrorMessages] = useState(true)

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
        exportLives,
        paginationProps
    } = Hooks()
    const {t} = useTranslation();
    var x = useWindowDimensions() // fonction js pour afficher interface seulement en 767px de width
    const history = useHistory()
    const textAreaRef = useRef(null);

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
    const CopyUrlParticipant = async () => {
        if (document.getElementById("myUrlParticipant").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {

            await setStatusSuccessMessages(false)

            document.getElementById("myUrlParticipant").select();
            document.execCommand("Copy");
            statusSuccessMessages && await message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }
    // fonction pour copier url auditeur
    const CopyUrlAuditeur = async () => {
        if (document.getElementById("myUrlAuditeur").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            document.getElementById("myUrlAuditeur").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }

    const CopyLienIntegration = async () => {
        if (document.getElementById("myLienIntegration").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            document.getElementById("myLienIntegration").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }

   // Copy Input Modal Infos
    // copy url diffusion
    const handleCopyUrlDiffusion = async () => {
        if (document.getElementById("urlDiffusionID").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            document.getElementById("urlDiffusionID").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }
    // copy name of flux
    const handleCopyNameFlux = async () => {
        if (document.getElementById("nameOfFluxID").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            document.getElementById("nameOfFluxID").select();
            document.execCommand("Copy");
            statusSuccessMessages && await message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }
    // copy id flux
    const handleCopyIdFlux = async () => {
        if (document.getElementById("idfluxID").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            document.getElementById("idfluxID").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }
    // copy pwd flux
    const handleClickPasswordFlux = async (e) => {
        if (document.getElementById("idPwd").value === "") {
            await setStatusErrorMessages(false)
            return (
                statusErrorMessages && message.error({content: t("ShowVideo.EmptyField"), duration: 2}).then(
                    async () => {
                        setStatusErrorMessages(true)
                    }
                )
            )
        } else {
            await setStatusSuccessMessages(false)
            textAreaRef.current.select();
            document.execCommand("copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }


    const actionColumnView = (
        <div className="action">
            {
                !x.matches && <Tooltip getPopupContainer={() => document.querySelector(".btn_Visualiser_diffuser")}
                                       title={t("ShowVideo" + (record.status === -1 ? ".Diffuser" : ".Visualiser"))}>
                    <Button className={"btn_Visualiser_diffuser "} style={{
                        backgroundColor: darkMode === false ? "" : "#141414",
                        color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)",
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
                    <Input id={"urlDiffusionID"} placeholder="//demo.webtv-solution.com/fo/embed/267" name={"inputUrlDiffusion"}
                           value={infosLives.inputUrlDiffusion}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={handleCopyUrlDiffusion}  className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                </div>
                {/*./div_Url_diffusion*/}
                <div className="div_Nom_de_flux">

                    <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.StreamName")}</span>
                    <Input id={"nameOfFluxID"} placeholder={t("ShowVideo.LiveStreamName")} name={"streamName"}
                           value={infosLives.streamName}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={handleCopyNameFlux} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                    </div>

                    <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.idFlux")}</span>
                    <Input id={"idfluxID"} placeholder={t("ShowVideo.DirectID")} name={"idLive"} value={infosLives.idLive}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={handleCopyIdFlux} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                    </div>


                    <div className="div_Url_diffusion PasswordInfosDiv">
                    <span>{t("ShowVideo.PWDFlux")}</span>
                    <Input.Password ref={textAreaRef}  id={"idPwd"} placeholder={t("ShowVideo.DirectPassword")} name={"pwdLive"} value={infosLives.pwdLive}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                        <Tooltip title={t("ShowVideo.Copier")}>
                            <CopyFilled onClick={handleClickPasswordFlux}  className={"copy_icon copy_icon_pwd"}/>
                        </Tooltip>
                    </div>

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
                           name={"participantUrl"} value={exportLives.participantUrl}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={CopyUrlParticipant} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                </div>
                {/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.AuditorUrl")}</span>
                    <Input id="myUrlAuditeur" placeholder="//demo.webtv-solution.com/fo/embed/267" name={"auditorUrl"}
                           value={exportLives.auditorUrl}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={CopyUrlAuditeur} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                </div>
                {/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.IntegrationLink")}</span>
                    <Input.Group>
                            <Input.TextArea id="myLienIntegration"  rows={5}  placeholder="//demo.webtv-solution.com/fo/embed/267"
                                            name={"integrationUrl"} value={exportLives.integrationUrl}
                            />
                        <Tooltip title={t("ShowVideo.Copier")}>
                            <CopyFilled onClick={CopyLienIntegration} className={"copy_icon iconTextArea"}/>
                        </Tooltip>
                    </Input.Group>
                </div>
                {/*./div_Url_diffusion*/}

            </Modal>{/*./ModalExporter*/}


        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;