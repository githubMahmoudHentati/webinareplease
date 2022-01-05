import React , {useEffect, useState} from 'react';
import { SketchPicker } from 'react-color';
import {Button , Tabs , Input , Upload , Skeleton} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {InboxOutlined, InfoCircleFilled , FileImageOutlined , AudioFilled , VideoCameraFilled , SettingFilled , UserOutlined , CameraFilled } from '@ant-design/icons';
import {setTemplate} from "../store/formDirectVideoAction";
import {useTranslation} from "react-i18next";
import {UploadHooks} from "./uploadHooks";
import Hooks from "../utils/hooks";
import * as url from "url";
import LogoWebinarPlease from "../../assets/logo_webinarplease-500.png"
import backgroundImage from "../../assets/blurBG.jpg"
import volume from "../../assets/volum.svg"
import logo from "../../assets/logo_webinarplease.svg"

const { TabPane } = Tabs;
const { Dragger } = Upload;


const TempletesStudioEmail = () => {
    const dispatch = useDispatch()
    const [background , setBackground]= useState('#fff')
    const [primaire , setPrimaire] = useState(false)
    const [textes , setTextes] = useState(false)
    const [secondaire , setSecondaire] = useState(false)
    const [texteButton , setTexteButton] = useState(false)
    const [primaireEmail , setPrimaireEmail] = useState(false)
    const [secondaireEmail , setSecondaireEmail] = useState(false)
    const [textesEmail , setTextesEmail] = useState(false)
    const [click1 , setClick1] = useState(false)
    const color =useSelector((state)=>state.FormDirectVideoReducer.template)
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const { t} = useTranslation();
    const {onSaveLogo , handleChangeLogo , removeThumbnailLogo , handleChangeImage , removeThumbnailImage}=UploadHooks()
    const {values}=Hooks()


    function callback(key) {
        console.log(key);
    }
    const handleChangeComplete2 = (color) => {
        dispatch(setTemplate({
            templateNameChange: "background2",
            templateValueChange: color.hex
        }))

    };
    const handleChangeComplete3 = (color) => {
        dispatch(setTemplate({
            templateNameChange: "background3",
            templateValueChange: color.hex
        }))

    };
    const handleChangeComplete4 = (color) => {
        dispatch(setTemplate({
            templateNameChange: "background4",
            templateValueChange: color.hex
        }))

    };
    const handleChangeCompletePrimaire = (color) => {
        dispatch(setTemplate({
            templateNameChange: "primaireColor",
            templateValueChange: color.hex
        }))
    }
    const handleChangeCompleteTextes = ( color) => {
        dispatch(setTemplate({
            templateNameChange: "texteEmail",
            templateValueChange: color.hex
        }))
    }
    const handleChangeCompleteSecondaire = (color) => {
        dispatch(setTemplate({
            templateNameChange: "secondaireColor",
            templateValueChange: color.hex
        }))
    }

    const handleClickPrimaire = (name) => {
        if(name==="primaire"){
            setPrimaire(!primaire)
            setTextes(false)
            setSecondaire(false)
            setTexteButton(false)
        }else if(name==="Textes"){
            setTextes(!textes)
            setPrimaire(false)
            setSecondaire(false)
            setTexteButton(false)
        }else if(name==="secondaire"){
            setSecondaire(!secondaire)
            setTextes(false)
            setPrimaire(false)
            setTexteButton(false)
        }else if(name==="texteButton"){
            setTexteButton(!texteButton)
            setSecondaire(false)
            setTextes(false)
            setPrimaire(false)
        }
    }
    const handleClickPrimaireEmail = (name) => {
       if(name === "primaireEmail"){
           setPrimaireEmail(!primaireEmail)
           setSecondaireEmail(false)
           setTextesEmail(false)
       }else if(name === "textex2Email"){
           setPrimaireEmail(false)
           setSecondaireEmail(false)
           setTextesEmail(!textesEmail)
       }else if(name === "secondaireEmail"){
           setPrimaireEmail(false)
           setSecondaireEmail(!secondaireEmail)
           setTextesEmail(false)
       }
    }




    return(
        <div>

            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Studio" key="1">
                    <div className={"DIVtempletesGlobal"}>
                        <div className={"divChangeColor"}>
                            {/*<span className={"spnDivChangeColor"}>Couleur primaire</span>*/}
                            {/*<div className={"divUpdateColor"}>*/}
                            {/*    <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaire("primaire")} style={{backgroundColor : color.background1 }}></div>*/}
                            {/*    <Input className={"inputUpdateColor1"} value={color.background1}/>*/}
                            {/*    {*/}
                            {/*        primaire*/}
                            {/*            ?*/}
                            {/*            <SketchPicker*/}
                            {/*                color={color.background}*/}
                            {/*                onChangeComplete={handleChangeComplete1}*/}
                            {/*                className={"sketchPicker"}*/}
                            {/*            />*/}
                            {/*            : null*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <span className={"spnDivChangeColor"}>Textes</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaire("Textes")} style={{backgroundColor : color.background2}}></div>
                                <Input className={"inputUpdateColor1"} value={color.background2}/>
                                {
                                    textes
                                        ?
                                        <SketchPicker
                                            color={color.background2}
                                            onChangeComplete={handleChangeComplete2}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                            <span className={"spnDivChangeColor"}>Couleur des boutons</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaire("secondaire")} style={{backgroundColor : color.background3}}></div>
                                <Input className={"inputUpdateColor1"} value={color.background3}/>
                                {
                                    secondaire
                                        ?
                                        <SketchPicker
                                            color={color.background3}
                                            onChangeComplete={handleChangeComplete3}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                            <span className={"spnDivChangeColor"}>Texte des boutons</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaire("texteButton")} style={{backgroundColor : color.background4}}></div>
                                <Input className={"inputUpdateColor1"} value={color.background4}/>
                                {
                                    texteButton
                                        ?
                                        <SketchPicker
                                            color={color.background4}
                                            onChangeComplete={handleChangeComplete4}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                            <span className={"spnDivChangeColor"}>Logo de l'organisateur  <InfoCircleFilled className={"iconInfo"}/></span>
                            <div className={"divUpdateBackground"}>
                                <Dragger className={"parent"} style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
                                         name="fileList" listType="text"
                                          fileList={[...values.template.LogoValueFileList].slice(-1)}
                                    //beforeUpload={beforeUpload}
                                         onChange={handleChangeLogo}
                                         onRemove={removeThumbnailLogo}
                                >

                                    <p className="ant-upload-drag-icon">
                                        <FileImageOutlined  style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
                                    </p>
                                    <p className="ant-upload-hint" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.25)"}}>
                                        Importer
                                    </p>
                                </Dragger>
                            </div>
                            {/*<span className={"spnDivChangeColor"}>Image de couverture <InfoCircleFilled className={"iconInfo"}/></span>*/}
                            {/*<div className={"divUpdateBackground"}>*/}
                            {/*    <Dragger className={"parent"} style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}*/}
                            {/*             name="fileList" listType="text"*/}
                            {/*          fileList={[...values.template.imageValueFileList]}*/}
                            {/*        //beforeUpload={beforeUpload}*/}
                            {/*               onChange={handleChangeImage}*/}
                            {/*              onRemove={removeThumbnailImage}*/}
                            {/*    >*/}

                            {/*        <p className="ant-upload-drag-icon">*/}
                            {/*            <FileImageOutlined  style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>*/}
                            {/*        </p>*/}
                            {/*        <p className="ant-upload-hint" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.25)"}}>*/}
                            {/*            Importer*/}
                            {/*        </p>*/}
                            {/*    </Dragger>*/}
                            {/*</div>*/}
                        </div>{/*./divChangeColor*/}
                        <div className={"DivStudio"} style={{backgroundColor:"#414141"}}>
                            <div className={"DIVLOGO"} >
                               <img src={values.template.LogoValueFileList && values.template.LogoValueFileList.slice(-1).map(item=>item.thumbUrl)}/>
                            </div>
                            <div className={"DIVSTUDIO1"}>
                               <span className={"TitleReunion"} style={{color:values.template.background2}}>Titre réunion</span>
                                <div className={"divStudioLive"} style={{backgroundColor:color.background1}}>
                                    <div className={"UserDiv"}>
                                        <div className={"UserDiv1"}><UserOutlined className={"UserOutlined"}/><div className={"divCam"}><CameraFilled className={"cameraFilled"}/></div></div>
                                        <img src={volume}/>
                                    </div>{/*./divcammic*/}
                                    <div className={"divSetting"} style={{color:values.template.background2}}>
                                        <div><AudioFilled className={"icon"}/><span>Arrêter mic</span></div>
                                        <div><VideoCameraFilled className={"icon"}/><span>Arrêter cam</span></div>
                                        <div><SettingFilled className={"icon"}/><span>Paramètres</span></div>
                                    </div>{/*./divparamatar*/}
                                    <div className={"DIVNameUser"}>
                                       <div><label style={{color:values.template.background2}}>Nom d’utilisateur<span>*</span></label><Input value={"Jhon"} style={{color:values.template.background2}}/></div>
                                    </div>{/*./name*/}
                                    <div className={"DIVPassword"}>
                                        <div><label style={{color:values.template.background2}}>Mot de passe<span>*</span></label><Input value={"Doe"} style={{color:values.template.background2}}/></div>
                                    </div>{/*./divPassword*/}
                                    <div className={"divButton"}><Button style={{backgroundColor:values.template.background3 , border:`1px solid ${values.template.background3}`}}><span style={{color:values.template.background4}}>Rejoindre la réunion</span></Button></div>{/*./divrejoindrereunion*/}
                                </div>
                            </div>
                        </div>{/*./DivStudio*/}
                    </div>{/*./DIVtempletesGlobal*/}
                </TabPane>
                <TabPane tab="E-mail" key="2">
                    <div className={"DIVtempletesGlobal"}>
                        <div className={"divChangeColor divTabchangeColor"}>
                            <span className={"spnDivChangeColor"}>Couleur primaire</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaireEmail("primaireEmail")} style={{backgroundColor : color.primaireColor}}></div>
                                <Input className={"inputUpdateColor1"} value={color.primaireColor}/>
                                {
                                    primaireEmail
                                        ?
                                        <SketchPicker
                                            color={color.primaireColor}
                                            onChangeComplete={handleChangeCompletePrimaire}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                            <span className={"spnDivChangeColor"}>Textes</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaireEmail("textex2Email")} style={{backgroundColor : color.texteEmail}}></div>
                                <Input className={"inputUpdateColor1"} value={color.texteEmail}/>
                                {
                                    textesEmail
                                        ?
                                        <SketchPicker
                                            color={color.texteEmail}
                                            onChangeComplete={handleChangeCompleteTextes}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                            <span className={"spnDivChangeColor"}>Couleur secondaire</span>
                            <div className={"divUpdateColor"}>
                                <div className={"divUpdateColor1"} onClick={()=>handleClickPrimaireEmail("secondaireEmail")} style={{backgroundColor : color.secondaireColor}}></div>
                                <Input className={"inputUpdateColor1"} value={color.secondaireColor}/>
                                {
                                    secondaireEmail
                                        ?
                                        <SketchPicker
                                            color={color.secondaireColor}
                                            onChangeComplete={handleChangeCompleteSecondaire}
                                            className={"sketchPicker"}
                                        />
                                        : null
                                }
                            </div>
                        </div>{/*./divChangeColor*/}
                        <div className={"DivStudio"}>

                          <div className={"DivTemplateEmailGlobal"}>
                              <Skeleton  paragraph={{ rows: 1 }}/>
                              <div className={"DIVPrimaire"} style={{backgroundColor:values.template.primaireColor , border:`1px solid ${values.template.primaireColor}`}}>
                                  <Skeleton  paragraph={{ rows: 1 }}/>
                                  <Skeleton  paragraph={{ rows: 1 }}/>
                              </div>
                              <Skeleton className={"skelton1"}  paragraph={{ rows: 1 }}/>
                              <div className={"skelton2"}><Skeleton  paragraph={{ rows: 1 }}/></div>
                              <div className={"DivSecondaire"}>
                                  <Button style={{backgroundColor:values.template.secondaireColor , border:`1px solid ${values.template.secondaireColor}`}}><Skeleton active paragraph={{ rows: 1 }}/></Button>
                              </div>
                              <div className={"skelton2"}><Skeleton  paragraph={{ rows: 1 }}/></div>
                              <div className={"skelton2"}><Skeleton  paragraph={{ rows: 1 }}/></div>
                              <div className={"skelton3"}><Skeleton  paragraph={{ rows: 1 }}/></div>
                              <div className={"DivFooter"} style={{backgroundColor:values.template.texteEmail , border:`1px solid ${values.template.texteEmail}`}}>
                                  <Skeleton  paragraph={{ rows: 1 }}/>
                                  <Skeleton  paragraph={{ rows: 1 }}/>
                              </div>
                          </div>{/*./DivTemplateEmailGlobal*/}

                        </div>{/*./DivStudio*/}
                        </div>
                </TabPane>
            </Tabs>




        </div>
    )

}

export default TempletesStudioEmail