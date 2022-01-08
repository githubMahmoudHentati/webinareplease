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
    EyeInvisibleOutlined,
    MailOutlined,
    SearchOutlined,
    DownloadOutlined
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
import {setInfosGuest, setPaginationProps} from "../store/showVideosAction";

import { CSVLink } from "react-csv";
const {TextArea} = Input;

function useActionMenu({record}) {
    const dispatch = useDispatch()

    // use Selector redux
    const darkMode = useSelector((state) => state.Reducer.DarkMode)
    // use Selector redux
    const mailList = useSelector((state)=> state.ShowVideosReducerReducer.valueInfosGuests.mailList)
    // use Selector redux
    const value = useSelector((state)=> state.ShowVideosReducerReducer.valueInputInfosGuest.valueInputModalFake)

    const [statusSuccessMessages , setStatusSuccessMessages]=useState(true)
    const [statusErrorMessages , setStatusErrorMessages] = useState(true)
    const [visible , setVisible] = useState(false)

    const headers = [
        { label: "Email", key: "email" },
        { label: "Is Online", key: "isOnline" },
    ];

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
        paginationProps,
        handleInfosGuests,
        handleCancelModalInfosGuest,
        infosGuests,
        handleChangeInputModal,
        saveDiv,
        handleChangeInputModalFake,
        saveDivXLSX,
        infosGuestsModal,
        handleChangePassword,
        handleClickCreatePwd
    } = Hooks()



    const menu = (
        <Menu >
            <Menu.Item key="1" onClick={()=>saveDivXLSX()}>
                Excel
            </Menu.Item>
            <Menu.Item key="2" >
                <CSVLink data={mailList} headers={headers}>
                    CSV
                </CSVLink>
            </Menu.Item>
            <Menu.Item key="3" onClick={()=>saveDiv()}>
                PDF
            </Menu.Item>
        </Menu>
    );


    const {t} = useTranslation();
    var x = useWindowDimensions() // fonction js pour afficher interface seulement en 767px de width
    const history = useHistory()
    const textAreaRef = useRef(null);



    //ListEmailsModal
    const listItem = mailList.map((item)=>

        <div className={"ModalGuestListMailDivGlobal"} >
            <div className={"ModalGuestListMailDivGlobal1"}>
                <span className={"iconMail"}><MailOutlined/></span>
                <span className={"Mail"}>{item.email}</span>
            </div>
            <div className={"ModalGuestListMailDivGlobal2"}>
                {
                    item.isOnline === 0
                     ?
                        <span className={"etat"}>{t("ShowVideo.sentInvitation")}</span>
                        :
                        null
                }
                {
                    item.isOnline === 1
                        ?
                        <span className={"etat etatDP"}>{t("ShowVideo.remotly")}</span>
                        :
                        null
                }
                {
                    item.isOnline === 2
                        ?
                        <span className={"etat etatDP"}>{t("ShowVideo.presentiel")}</span>
                        :
                        null
                }
            </div>
        </div>

    )



    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={() => handleInfos()}><InfoCircleOutlined
                className={"dropdownIcon"}/>{t("ShowVideo.infos")}</Menu.Item>
            {record.owner ? <Menu.Item onClick={() => updateLive(record.id,record.status)}><EditOutlined
                className={"dropdownIcon"}/>{t("ShowVideo.Modifier")}</Menu.Item> : null}
            <Menu.Item onClick={()=>handleInfosGuests(record.id)}><MailOutlined className={"dropdownIcon"}/>{t("ShowVideo.guest")}</Menu.Item>
            <Menu.Item onClick={() => handleExport(record.id)}><LinkOutlined className={"dropdownIcon"}/>Export</Menu.Item>
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
    const CopyUrlTraducteur = async () => {
        if (document.getElementById("myUrlTraducteur").value === "") {
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
            document.getElementById("myUrlTraducteur").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
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

    // copy Permalien
    const CopyPermalien = async (e) => {
        if (document.getElementById("myPermalink").value === "") {
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
            document.getElementById("myPermalink").select();
            document.execCommand("Copy");
            statusSuccessMessages && message.success({content: t("ShowVideo.SuccessCopy"), duration: 2}).then(
                async () => {
                    setStatusSuccessMessages(true)
                }
            );
        }
    }

    // copy Password
    const CopyPassword = async (e) => {
        if (document.getElementById("myPassword").value === "") {
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
            document.getElementById("myPassword").select();
            document.execCommand("Copy");
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
                    <span>{t("ShowVideo.permalink")} </span>
                    <Input id="myPermalink" placeholder="//demo.webtv-solution.com/fo/embed/267"
                           name={"participantUrl"} value={exportLives.permalink}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={CopyPermalien} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                </div>
                {/*./Permalien*/}
                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.password")} </span>
                    <Input id="myPassword" placeholder=""
                           name={"participantUrl"} defaultValue={exportLives.password}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={CopyPassword} className={"copy_icon"}/>
                               </Tooltip>
                           }
                           onChange={handleChangePassword}
                    />
                </div>
                <div className={"div_save_password"}>
                    <Button type="primary" onClick={()=>handleClickCreatePwd()}>{t("ShowVideo.save")}</Button>
                </div>
                {/*./Password*/}
                <div className="div_Url_diffusion">
                    <span>{t("ShowVideo.UrlParticipant")} </span>
                    <Input id="myUrlParticipant" placeholder="//demo.webtv-solution.com/fo/embed/267"
                           name={"participantUrl"} value={!window.process.env.HAS_TRANSLATOR ? exportLives.participantUrl : exportLives.participantUrlT}
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
                           value={!window.process.env.HAS_TRANSLATOR ? exportLives.auditorUrl : exportLives.auditorUrlT}
                           suffix={
                               <Tooltip title={t("ShowVideo.Copier")}>
                                   <CopyFilled onClick={CopyUrlAuditeur} className={"copy_icon"}/>
                               </Tooltip>
                           }
                    />
                </div>
                {/*./div_Url_diffusion*/}

                {
                    window.process.env.HAS_TRANSLATOR
                     ?
                        <div className="div_Url_diffusion">
                            <span>{t("ShowVideo.translatorUrl")}</span>
                            <Input id="myUrlTraducteur" placeholder="//demo.webtv-solution.com/fo/embed/267" name={"translatorUrl"}
                                   value={exportLives.translatorUrl}
                                   suffix={
                                       <Tooltip title={t("ShowVideo.Copier")}>
                                           <CopyFilled onClick={CopyUrlTraducteur} className={"copy_icon"}/>
                                       </Tooltip>
                                   }
                            />
                        </div>
                    :
                    null
                }


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

            {/*Modal Invités*/}
            <Modal
                visible={infosGuestsModal.visibleInfosGuests}
                title={t("ShowVideo.guestList")}
                onCancel={handleCancelModalInfosGuest}
                footer={[
                    <Button key="back" onClick={handleCancelModalInfosGuest}>
                        {t("ShowVideo.Close")}
                    </Button>,
                ]}
                getContainer={() => document.querySelector(".showVideo")}
            >
                <div className={"ModalGuestGlobalDiv"}>

                    <div className={"ModalGuestFilterDiv"}>
                        <Input
                            className="inputFilter"
                            placeholder={t('ShowVideo.search')}
                            prefix={<SearchOutlined style={{color: "rgba(0, 0, 0, 0.25)", marginLeft: "10px"}}/>}
                            name={"search"}
                            onKeyDown={(e)=>handleChangeInputModal(e)}
                            onChange={(e)=>handleChangeInputModalFake(e)}
                            value={value}
                        />
                        <Dropdown overlay={menu} trigger={"click"}>
                            <Button>
                                <DownloadOutlined className={"iconDownload"}/> {t("ShowVideo.download")}
                            </Button>
                        </Dropdown>
                    </div>{/*./ModalGuestFilterDiv*/}
                    <div className={"ModalGuestListMail"} id={"DivExport"}>
                        {listItem}
                    </div>{/*./ModalGuestListMail*/}

                </div>

            </Modal>
            {/*Modal Invités*/}



        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;