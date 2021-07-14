import React, { useState } from 'react';
import {InfoCircleOutlined,DownloadOutlined,EditOutlined,LinkOutlined,FilePdfOutlined,PictureOutlined,DeleteOutlined , EyeOutlined , InsertRowLeftOutlined , VideoCameraOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Popconfirm, Button , Modal , Input , message} from 'antd';
import {useSelector} from "react-redux";
import {setPaginationProps} from "../store/showVideosAction";
import { useDispatch} from "react-redux";
import {Hooks} from "../utils/hooks";

const { SubMenu } = Menu;
const { TextArea } = Input;

function useActionMenu({record}) {

    const dispatch = useDispatch()
    const {handleDeleteOneRow , handleClickDropdowMenu , DataVideos , handleInfos , handleCancel , infosLives }=Hooks()

    console.log("DataVideo123456789",DataVideos.data.map(item=>item.status))

    const [visibleModalExport , SetVisibleModalExport] = useState(false)

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    !darkMode&&document.documentElement.style.setProperty('--modal_background', "white")
    const history = useHistory();


    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={()=>handleInfos()}><InfoCircleOutlined />infos</Menu.Item>
            <Menu.Item onClick={()=>{history.push("/FormDirectVideo")}}><EditOutlined />Modifier</Menu.Item>
            <Menu.Item onClick={()=>handleExport()}><LinkOutlined />Export</Menu.Item>
            <Menu.Item ><span className="icon-Templates"></span> Templates</Menu.Item>
            <Menu.Item onClick={()=>handleDeleteOneRow([record.id])}><DeleteOutlined />Supprimer</Menu.Item>
        </Menu>
    );
    //fonction handleExport and show modal infos
    const handleExport = () =>{
        SetVisibleModalExport(true)
    }
    // handle cancel Modal export
    const handleCancelModalExport = () =>{
        SetVisibleModalExport(false)
    }

    // fonction pour copier url participant
    const CopyUrlParticipant = () =>{
        if(document.getElementById("myUrlParticipant").value === ""){
            return message.error({content:"Cet champ est Vide",duration:2});
        }else {
            document.getElementById("myUrlParticipant").select();
            document.execCommand("Copy");
            message.success({content:"cet champ est copié avec succée",duration:2});
        }
    }

    // fonction pour copier url auditeur
    const CopyUrlAuditeur = () =>{
        if(document.getElementById("myUrlAuditeur").value === ""){
            return message.error({content:"Cet champ est Vide",duration:2});
        }else {
            document.getElementById("myUrlAuditeur").select();
            document.execCommand("Copy");
            message.success({content:"cet champ est copié avec succée",duration:2});
        }
    }
    const CopyLienIntegration = () =>{
        if(document.getElementById("myLienIntegration").value === ""){
            return message.error({content:"Cet champ est Vide",duration:2});
        }else {
            document.getElementById("myLienIntegration").select();
            document.execCommand("Copy");
            message.success({content:"cet champ est copié avec succée",duration:2});
        }
    }

    const actionColumnView = (
        <div className="action">
            {
                record.status === -1
                       ?
                        <Tooltip title={"Diffuser"}>
                            <Button className={"btn_Visualiser_diffuser"} style={{
                                backgroundColor: darkMode === false ? "" : "#1D1D1D",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }}><VideoCameraOutlined id={"icon_vs"}/> <span id={"span_diffuser"}>Diffuser</span></Button>
                        </Tooltip>
                        :
                        <Tooltip title={"Visualiser"}>
                            <Button className={"btn_Visualiser_diffuser"} style={{
                                backgroundColor: darkMode === false ? "" : "#1D1D1D",
                                color: darkMode === false ? "" : "rgba(255, 255, 255, 0.65)",
                                border: darkMode === false ? "" : "1px solid rgba(255, 255, 255, 0.15)"
                            }}><EyeOutlined id={"icon_vs"}/> <span id={"span_diffuser"}>Visualiser</span></Button>
                        </Tooltip>

            }

        <span className="span_action">
      <Dropdown overlay={actionMenu} trigger={['click']}  onMouseEnter={()=>handleClickDropdowMenu([record.id])} >
        <a className="linkid" href="#"  style={{ fontSize:"30px"  , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" }}>
          ...
        </a>
      </Dropdown>
    </span>

            <Modal
                visible={infosLives.visible}
                title="Informations : At vero eos et quale sit numer"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Fermer
                    </Button>,
                ]}
            >
                <div className="div_Url_diffusion">
                   <span>Url de diffusion</span>
                    <Input placeholder="//demo.webtv-solution.com/fo/embed/267" name={"inputUrlDiffusion"} value={infosLives.inputUrlDiffusion}/>
                </div>{/*./div_Url_diffusion*/}
                <div className="div_Nom_de_flux">
                    <span>Nom de flux</span>
                    <Input placeholder="Nom de flux du direct" name={"streamName"} value={infosLives.streamName}/>
                    <Input placeholder="Identifiant du direct" name={"idLive"} value={infosLives.idLive}/>
                    <Input placeholder="Mot de passe du direct" name={"pwdLive"} value={infosLives.pwdLive}/>

                </div>{/*./div_Nom_de_flux*/}
            </Modal>{/*./ModalInfos*/}

            <Modal
                visible={visibleModalExport}
                title="Liens d'export : At vero eos et quale sit numer"
                onCancel={handleCancelModalExport}
                footer={[
                    <Button key="back" onClick={handleCancelModalExport}>
                        Fermer
                    </Button>,
                ]}
            >
                <div className="div_Url_diffusion">
                    <span>Url participant </span>
                    <Input id="myUrlParticipant" placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyUrlParticipant}>Copier</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>Url auditeur</span>
                    <Input id="myUrlAuditeur" placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyUrlAuditeur}>Copier</Button></div>
                </div>{/*./div_Url_diffusion*/}

                <div className="div_Url_diffusion">
                    <span>Lien d'intégration</span>
                    <TextArea id="myLienIntegration" rows={4} placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                    <div className="div_Copier"><Button onClick={CopyLienIntegration}>Copier</Button></div>
                </div>{/*./div_Url_diffusion*/}

            </Modal>{/*./ModalExporter*/}



        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;