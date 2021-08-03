import React , {useState,useEffect} from 'react';
import { Breadcrumb,Button, Tooltip , Select , Input  , Checkbox , DatePicker, Space , Alert} from "antd";
import {  HourglassOutlined ,DownloadOutlined ,PlayCircleOutlined ,ImportOutlined ,BorderInnerOutlined , CalendarOutlined , DeleteOutlined , DownOutlined ,RightOutlined ,HomeOutlined , PlusSquareOutlined , MenuOutlined , TableOutlined  ,AppstoreOutlined , FilterOutlined , FolderOutlined , FolderOpenOutlined , SearchOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import '../../assets/icomoon/style.css';
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
const { Option } = Select;
let clicked = false;

const { RangePicker } = DatePicker;

function HeaderVideos() {
    const {handleSearchRow , handleHeaderSelect , handleChangeDatePicker , handleFiltrerVideos , conditions , handleClickDeleteIcon , handleClickAnnulerAlert , loadingDelete ,handleClickAddLive ,matchesMedia , onChangeRange }=Hooks()

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
                      <span >{t("ShowVideo.Home")}</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}} onClick={()=>{history.push("/")}}>
                      <span>{t("ShowVideo.Direct")}</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("ShowVideo.All")}</Breadcrumb.Item>
              </Breadcrumb>

          </div>{/*./Breadcrumb*/}

          <div className="MesDirects" style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
              <h4 style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>{t("ShowVideo.MyDirects")}</h4>
              <Button style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)",background:darkMode===false?"":"rgba(255, 255, 255, 0.04)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} onClick={()=>handleClickAddLive('add')} className="btn_add_media" type="primary" icon={<PlusSquareOutlined />} ><span id={"spn_ajouter"}>{t("ShowVideo.Add")}</span></Button>
          </div>{/*./TousMedia*/}

          <div className="Filter">

              <div className="div_delete_select">

                  {
                      conditions.elementSelected === 0
                          ?
                          null
                          :
                          <div className="delete_number">
                              <Tooltip title={t("Calendar.Delete")}>
                                  <Button style={{backgroundColor:darkMode===false?"":"#141414"}}  icon={<DeleteOutlined style={{color:darkMode===false?"":"white"}}/>} onClick={()=>handleClickDeleteIcon()} loading={loadingDelete.loadingDelete}/>
                              </Tooltip>
                              <p style={{color:darkMode===false?"":"white"}}><span>{conditions.elementSelected}</span> <span id={"text_selection"}>{t("ShowVideo.SelectedItem")}</span></p>
                          </div>
                  }

                  <div className="Calendrier" onClick={()=>handleClickCalendar()} style={{backgroundColor:darkMode===false?"":"#141414", color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid RGBA(255, 255, 255, 0.15)"}}>
                      <Tooltip className="tooltip_calendrier" title={t("ShowVideo.ViewCalendar")}>
                      <CalendarOutlined  className="IconCalendrier" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)"}}/>
                      <span id={"Text_Calendar"}>{t("ShowVideo.Calendar")}</span>
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
                          <Option name="type"  value="tous"><span className="icon-select-all-line"></span> <span  style={{ padding: "15%" }}id={'spn_option'}>{t("ShowVideo.All")}</span> </Option>
                          <Option name="type" value="archivés"><span className="icon-Archive"></span>  <span id={'spn_option'}>{t("ShowVideo.Archived")}</span></Option>
                          <Option name="type" value="encours"><span className="icon-Current"></span>  <span id={'spn_option'}>{t("ShowVideo.InProgress")}</span></Option>
                          <Option name="type" value="avenir"><HourglassOutlined />  <span id={'spn_option'}>{t("ShowVideo.ComingSoon")}</span></Option>
                      </Select>
                  </div>

              </div> {/*./div_delete_select*/}
              <div className="div_filter">

                  <Input
                      style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}
                      className="inputFilter"
                      placeholder={t("ShowVideo.Search")}
                      prefix={<SearchOutlined style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "rgba(255, 255, 255, 0.85)", marginLeft: "10px" }}/>}
                      suffix={
                          <Tooltip title={t("ShowVideo.Filter")}>
                          <div
                              onClick={handlClickSuffix}
                              className="filter_icon"
                          >


                                  <FilterOutlined id={darkMode&&activeIcon===true?"activeIcon":""} style={{color: darkMode === true ? "rgba(255, 255, 255, 0.85)" : ""}} className="class_icon_filter"/>


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
                          <RangePicker
                              className="range_div1_div_Filter"
                              ranges={{
                                  Today: [moment(), moment()],
                                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                              }}
                              onChange={(datesValue , dateStringsValue)=>onChangeRange('date', datesValue ,dateStringsValue)}
                          />
                      </div>{/*./div1_div_Filter*/}

                      <div className="div2_div_Filter">

                          <Select
                              className="select1_div2_div_Filter"
                              name="contributeur" onChange={handleHeaderSelect}
                              placeholder={t("ShowVideo.Contributor")}
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                          >
                              <Option name="contributeur" value="Departement">{t("ShowVideo.Department")}</Option>
                              <Option name="contributeur" value="Profile">Profile</Option>
                              <Option name="contributeur" value="lucy">lucy</Option>
                          </Select>

                      </div>{/*./div2_div_Filter*/}

                      <div className="div_button_filter">
                          <Tooltip title={t("ShowVideo.ResetMedia")}><Button style={{backgroundColor:darkMode===false?"":"#1D1D1D" , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} className="btn_1">{t("ShowVideo.Reset")}</Button></Tooltip>
                          <Tooltip title={t("ShowVideo.FilterMedia")}><Button type="primary" className="btn_2" onClick={handleFiltrerVideos}>{t("ShowVideo.Filter")}</Button></Tooltip>
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
                          message={conditions.elementSelected > 1 ? t("ShowVideo.DeleteSelectedItem") : t("ShowVideo.DeleteSelectedItems")}
                          banner
                          action={
                              <Button disabled={conditions.rubDeleteItems===true}  className="btn_annuler" size="small" type="text" onClick={handleClickAnnulerAlert}>
                                  {t("ShowVideo.Cancel")}
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