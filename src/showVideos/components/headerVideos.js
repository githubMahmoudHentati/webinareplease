import React , {useState,useEffect} from 'react';
import { Breadcrumb,Button, Tooltip , Select , Input  , Checkbox , DatePicker, Space , Alert} from "antd";
import {  HourglassOutlined ,DownloadOutlined ,PlayCircleOutlined ,ImportOutlined ,BorderInnerOutlined , CalendarOutlined , DeleteOutlined , DownOutlined ,RightOutlined ,HomeOutlined , PlusSquareOutlined , MenuOutlined , TableOutlined  ,AppstoreOutlined , FilterOutlined , FolderOutlined , FolderOpenOutlined , SearchOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import '../../assets/icomoon/style.css';
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';

const { Option } = Select;
let clicked = false;

function HeaderVideos() {
    const {handleSearchRow , handleHeaderSelect , handleChangeDatePicker , handleFiltrerVideos , conditions , handleClickDeleteIcon , handleClickAnnulerAlert , loadingDelete ,handleClickAddLive ,matchesMedia}=Hooks()

    const [activeIcon , SetActiveIcon]=useState(false) // state pour changer le couleur de l'icon de filtrage
    const [ShowFilter , SetShowFilter] = useState(false) // state pour afficher le div de fltrage si on clique sur l'icon de filtrage
    const history = useHistory();
    const { t, i18n } = useTranslation();

    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    useEffect(() => {
        function goto(event) {

            var noRedirect = ' .filter_icon , .filter_icon *, .ant-input ' +
                ', .ant-select-selector * , .ant-select-dropdown * ,' +
                ' .ant-select-item-option-content , .ant-picker-cell-inner , .ant-picker-dropdown * , ' +
                '.div_filter_avance * , .div_Filter_global * '  ;
            if (!event.target.matches(noRedirect)) {
                SetShowFilter(false);
                SetActiveIcon(false)
            }
        };
        document.body.addEventListener('click', goto);
    },[]);

    // fonction pour la selection des dossiers
    function onChange(value) {
        console.log(`selected ${value}`);
    }
    // fonction de clique sur l'icone de filtrage
    const handlClickSuffix = () =>{
        SetShowFilter(!ShowFilter)

        if(clicked)
        {
            SetActiveIcon(false);
            clicked = false;
        }
        else
        {
            SetActiveIcon(true);
            clicked = true;
        }

    }
    // handle click calendar
    const handleClickCalendar = () =>{
        history.push("/calendar")
    }

    return(
      <div className="HeaderVideo">

          <div className="BreadcrumbDiv">
              <Breadcrumb style={{color:darkMode===false?"":"#ffffff" , fontSize:"14px" , fontFamily: "SF Pro Display",fontWeight: "normal"}}>
                  <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                      <span >{t("ShowVideo.Accueil")}</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                      <span>{t("ShowVideo.Direct")}</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("ShowVideo.Tous")}</Breadcrumb.Item>
              </Breadcrumb>

          </div>{/*./Breadcrumb*/}

          <div className="MesDirects" style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
              <h4 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("ShowVideo.Mes Directs")}</h4>
              <Button style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",background:darkMode===false?"":"rgba(255, 255, 255, 0.04)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} onClick={()=>handleClickAddLive()} className="btn_add_media" type="primary" icon={<PlusSquareOutlined />} ><span id={"spn_ajouter"}>{t("ShowVideo.Ajouter")}</span></Button>
          </div>{/*./TousMedia*/}

          <div className="Filter">

              <div className="div_delete_select">

                  {
                      conditions.elementSelected === 0
                          ?
                          null
                          :
                          <div className="delete_number">
                              <Tooltip title="Supprimer">
                                  <Button style={{backgroundColor:darkMode===false?"":"#141414"}}  icon={<DeleteOutlined style={{color:darkMode===false?"":"white"}}/>} onClick={()=>handleClickDeleteIcon()} loading={loadingDelete.loadingDelete}/>
                              </Tooltip>
                              <p style={{color:darkMode===false?"":"white"}}><span>{conditions.elementSelected}</span> <span id={"text_selection"}>{t("ShowVideo.élément(s) sélectionné(s)")}</span></p>
                          </div>
                  }

                  <div className="Calendrier" onClick={()=>handleClickCalendar()} style={{backgroundColor:darkMode===false?"":"#141414", color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid RGBA(255, 255, 255, 0.15)"}}>
                      <Tooltip className="tooltip_calendrier" title={t("ShowVideo.Afficher Calendrier")}>
                      <CalendarOutlined  className="IconCalendrier" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)"}}/>
                      <span id={"Text_Calendar"}>{t("ShowVideo.Calendrier")}</span>
                      </Tooltip>
                  </div>
                  <div className="selectDiv">
                      <Select
                          style={{ width: 120 }}
                          className="selectFilter"
                          placeholder={"Selecter un Type"}
                          defaultValue="tous"
                          optionFilterProp="children"
                          name="type" onChange={handleHeaderSelect}
                          filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                      >
                          <Option name="type"  value="tous"><span className="icon-select-all-line"></span> <span  style={{ padding: "15%" }}id={'spn_option'}>{t("ShowVideo.Tout")}</span> </Option>
                          <Option name="type" value="archivés"><span className="icon-Archive"></span>  <span id={'spn_option'}>{t("ShowVideo.Archivés")}</span></Option>
                          <Option name="type" value="encours"><span className="icon-Current"></span>  <span id={'spn_option'}>{t("ShowVideo.En cours")}</span></Option>
                          <Option name="type" value="avenir"><HourglassOutlined />  <span id={'spn_option'}>{t("ShowVideo.A venir")}</span></Option>
                      </Select>
                  </div>

              </div> {/*./div_delete_select*/}
              <div className="div_filter">

                  <Input
                      style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}
                      className="inputFilter"
                      placeholder={t("ShowVideo.Rechercher…")}
                      prefix={<SearchOutlined style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "RGBA(255, 255, 255, 0.15)", marginLeft: "10px" }}/>}
                      suffix={
                          <Tooltip title={t("ShowVideo.Filtrer")}>
                          <div
                              onClick={handlClickSuffix}
                              className="filter_icon"
                          >
                              {darkMode===false

                              ?
                                  <FilterOutlined id={darkMode&&activeIcon===true?"activeIcon":""} className="class_icon_filter"/>
                              :
                                  <FilterOutlined style={{color:"RGBA(255, 255, 255, 0.15)"}} className="class_icon_filter"/>
                              }

                          </div>
                          </Tooltip>
                      }
                      name="search"
                      onKeyDown={handleSearchRow}
                  />

              </div>{/*./div_filter*/}

          </div>{/*./Filter*/}

          {ShowFilter
              ?
              <div className="div_Filter_global">

                  <div className="div_Filter" style={{backgroundColor:darkMode===false?"":"#1D1D1D"}}>

                      <div className="div1_div_Filter">
                          <Select
                              className="select_div1_div_Filter"
                              name="periode" onChange={handleHeaderSelect}
                              placeholder={t("ShowVideo.Sélectionnez la période")}
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                          >
                              <Option name="periode" value="Semaine">{t("ShowVideo.Semaine")}</Option>
                              <Option name="periode" value="Mois">{t("ShowVideo.Mois")}</Option>
                              <Option name="periode" value="Trimestre">{t("ShowVideo.Trimestre")}</Option>
                              <Option name="periode" value="Semestre">{t("ShowVideo.Semestre")}</Option>
                              <Option name="periode" value="Année">{t("ShowVideo.Année")}</Option>
                          </Select>
                          <DatePicker placeholder={t("ShowVideo.Sélectionnez une date")}  classNmae="datepicker_div1_div_Filter"  onChange={(momentValue,stringDateValue)=>handleChangeDatePicker("date",momentValue,stringDateValue)}/>
                      </div>{/*./div1_div_Filter*/}

                      <div className="div2_div_Filter">

                          <Select
                              className="select1_div2_div_Filter"
                              name="contributeur" onChange={handleHeaderSelect}
                              placeholder={t("ShowVideo.Contributeur")}
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                          >
                              <Option name="contributeur" value="Departement">{t("ShowVideo.Departement")}</Option>
                              <Option name="contributeur" value="Profile">Profile</Option>
                              <Option name="contributeur" value="lucy">lucy</Option>
                          </Select>

                      </div>{/*./div2_div_Filter*/}

                      <div className="div_button_filter">
                          <Tooltip title={t("ShowVideo.Rénitialiser médias")}><Button style={{backgroundColor:darkMode===false?"":"#1D1D1D" , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} className="btn_1">{t("ShowVideo.Réinitialiser")}</Button></Tooltip>
                          <Tooltip title={t("ShowVideo.Filtrer médias")}><Button type="primary" className="btn_2" onClick={handleFiltrerVideos}>{t("ShowVideo.Filtrer")}</Button></Tooltip>
                      </div>{/*./div_button_filter*/}



                  </div>{/*./div_Filter*/}

              </div>
              :
              null
          }

          {
              conditions.clickDeleteIcon === false
                  ?
                  <div className="div_alert">
                      <Alert
                          id="ant-alert"
                          message={conditions.elementSelected > 1 ? t("ShowVideo.les éléments sélectionnés seront supprimés") : t("ShowVideo.L'élément sélectionné sera supprimé")}
                          banner
                          action={
                              <Button disabled={conditions.rubDeleteItems===true}  className="btn_annuler" size="small" type="text" onClick={handleClickAnnulerAlert}>
                                  {t("ShowVideo.Annuler")}
                              </Button>
                          }
                      />
                  </div>
                  :
                  null
          }


      </div>
    );
}

export default HeaderVideos;