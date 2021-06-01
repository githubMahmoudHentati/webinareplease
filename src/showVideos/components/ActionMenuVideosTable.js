import React, { useState } from 'react';
import {InfoCircleOutlined,DownloadOutlined,EditOutlined,LinkOutlined,FilePdfOutlined,PictureOutlined,DeleteOutlined , EyeOutlined , InsertRowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Popconfirm, Button , Modal , Input , message} from 'antd';

const { SubMenu } = Menu;
const { TextArea } = Input;

function useActionMenu({record}) {

    const [visible , SetVisible] = useState(false)
    const [visibleModalExport , SetVisibleModalExport] = useState(false)

    const history = useHistory();

    // handle Click Menu
    const handleClickDropdowMenu = () =>{

    }



    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={()=>handleInfos()}><InfoCircleOutlined />infos</Menu.Item>
            <Menu.Item><EditOutlined />Modifier</Menu.Item>
            <Menu.Item onClick={()=>handleExport()}><LinkOutlined />Export</Menu.Item>
            <Menu.Item ><span className="icon-Templates"></span> Templates</Menu.Item>
            <Menu.Item><DeleteOutlined />Supprimer</Menu.Item>
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
    // fonction handleInfos
    const handleInfos =()=>{
        SetVisible(true)
    }
    //handleCancel MODAL
    const handleCancel = () => {
        SetVisible(false)
    };
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

            <Tooltip title={"Visualiser"}>
            <Button className={"btn_Visualiser_diffuser"}><EyeOutlined /> Visualiser</Button>
            </Tooltip>

        <span className="span_action">
      <Dropdown overlay={actionMenu} trigger={['click']} onClick={()=>handleClickDropdowMenu()}>
        <a className="linkid" href="#" style={{fontSize:"30px" }}>
          ...
        </a>
      </Dropdown>
    </span>

            <Modal
                visible={visible}
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
                    <Input placeholder="//demo.webtv-solution.com/fo/embed/267"/>
                </div>{/*./div_Url_diffusion*/}
                <div className="div_Nom_de_flux">
                    <span>Nom de flux</span>
                    <Input placeholder="Nom de flux du direct"/>
                    <Input placeholder="Identifiant du direct"/>
                    <Input placeholder="Mot de passe du direct"/>

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