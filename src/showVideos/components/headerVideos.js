import React , {useState,useEffect} from 'react';
import { Breadcrumb,Button, Tooltip , Select , Input  , DatePicker, Alert} from "antd";
import {  HourglassOutlined , CalendarOutlined , DeleteOutlined , PlusSquareOutlined , FilterOutlined , SearchOutlined , HomeOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import '../../assets/icomoon/style.css';
import {Hooks} from "../utils/hooks";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {setFilterVideosActions} from "../store/showVideosAction";
const { Option } = Select;
let clicked = false;

const { RangePicker } = DatePicker;

function HeaderVideos() {
    const {handleSearchRow , handleHeaderSelect , handleFiltrerVideos ,resetFilterVideos,  conditions , handleClickDeleteIcon , handleClickAnnulerAlert , loadingDelete ,handleClickAddLive , paginationProps , values }=Hooks()
    const [filterIcon , setFilterIcon] = useState(false)
    const [filterIconDate ,  setFilterIconDate] = useState("")
    const [activeIcon , SetActiveIcon]=useState(false) // state pour changer le couleur de l'icon de filtrage
    const [ShowFilter , SetShowFilter] = useState(false) // state pour afficher le div de fltrage si on clique sur l'icon de filtrage
    const [rangeDate, setDateRange] = useState(null)
    const [selectedContributor, setContributor] = useState(null)
    const history = useHistory();
    const {t} = useTranslation();
    const dispatch = useDispatch()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const stickyElm = document.querySelector('.MesDirects-sticky')
    const rootEl = document.querySelector('.App')
    const observer = new IntersectionObserver(
        ([e]) => rootEl.classList.toggle('is-pinned', e.intersectionRatio < 1),
        {threshold: [1]}
    );

    useEffect(() => {
        if(stickyElm) {
            // debugger
            observer.observe(stickyElm)
        }
    }, );

    useEffect(() => {
        function goto(event) {
            let noRedirect = ' .filter_icon , .filter_icon *, .ant-input ' +
                ', .ant-select-selector * , .ant-select-dropdown * ,' +
                ' .ant-select-item-option-content , .ant-picker-cell-inner , .ant-picker-dropdown * , ' +
                '.div_filter_avance * , .div_Filter_global , .div_Filter , .div1_div_Filter * , .div_button_filter , .btn_1'  ;
            if (!event.target.matches(noRedirect)) {
                SetShowFilter(false);
                SetActiveIcon(false)
            }
        };
        document.body.addEventListener('click', goto);
    },[]);

    // fonction pour la selection des dossiers

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

    const onChangeRange = (name,datesValue,dateStringsValue) =>{
        setDateRange(datesValue)
    }


    const handleResetFilter = ()=>{
        setDateRange(null)
        setContributor(null)
        resetFilterVideos()
    }
    return(
      <div>

          <div className="BreadcrumbDiv">
              <Breadcrumb style={{color:darkMode===false?"":"#ffffff" , fontSize:"14px" , fontFamily: "SF Pro Display",fontWeight: "normal"}}>
                  <Breadcrumb.Item href=""  onClick={()=>{history.push("/")}}>
                      <HomeOutlined className={"home_icon_header"} />
                  </Breadcrumb.Item>
                  {/*<Breadcrumb.Item style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>*/}
                  {/*    {*/}
                  {/*        values.type === ""*/}
                  {/*            ?*/}
                  {/*            t("ShowVideo.All")*/}
                  {/*            :*/}
                  {/*            values.type === "archived"*/}
                  {/*                ?*/}
                  {/*                t("ShowVideo.Archived")*/}
                  {/*                :*/}
                  {/*                values.type === "live"*/}
                  {/*                    ?*/}
                  {/*                    t("ShowVideo.InProgress")*/}
                  {/*                    :*/}
                  {/*                    values.type === "upcoming"*/}
                  {/*                        ?*/}
                  {/*                        t("ShowVideo.ComingSoon")*/}
                  {/*                        :*/}
                  {/*                        null*/}
                  {/*    }*/}
                  {/*</Breadcrumb.Item>*/}
              </Breadcrumb>

          </div>{/*./Breadcrumb*/}
          <div className={"MesDirects-sticky"}>
              <div className={`MesDirects ${!darkMode ? "light" : "dark"}`}>
                  <h4 style={{color: darkMode === false ? "" : "rgba(255, 255, 255, 0.85)"}}>{t("ShowVideo.MyDirects")}</h4>
                  <Tooltip getPopupContainer={() => document.querySelector(".btn_add_media")}
                           title={t("ShowVideo.AddLive")}><Button onClick={() => handleClickAddLive('add')}
                                                                  className="btn_add_media" type="primary"
                                                                  icon={<PlusSquareOutlined/>}><span
                      id={"spn_ajouter"}>{t("ShowVideo.Add")}</span></Button></Tooltip>
              </div>
              {/*./TousMedia*/}
          </div>
          <div className="Filter">

              <div className="div_delete_select">

                  {
                      paginationProps.id.length === 0
                          ?
                          null
                          :
                          <div className="delete_number">
                              <Tooltip title={t("Calendar.Delete")}>
                                  <Button style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"1px solid rgba(0 , 0 , 0 , 0.15)":"1px solid rgba(255 , 255 , 255 , 0.15)"}}  icon={<DeleteOutlined style={{color:darkMode===false?"":"white"}}/>} onClick={()=>handleClickDeleteIcon()} loading={loadingDelete.loadingDelete}/>
                              </Tooltip>
                              <p style={{color:darkMode===false?"":"white"}}><span>{paginationProps.id.length || ""}</span> <span id={"text_selection"}>{t("ShowVideo.SelectedItem")}</span></p>
                          </div>
                  }

                  <div className="Calendrier" onClick={()=>handleClickCalendar()} style={{backgroundColor:darkMode===false?"":"#141414", color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid RGBA(255, 255, 255, 0.15)"}}>
                      <Tooltip getPopupContainer={() => document.querySelector(".Calendrier")} className="tooltip_calendrier" title={t("ShowVideo.ViewCalendar")}>
                      <CalendarOutlined  className="IconCalendrier" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)"}}/>
                      <span id={"Text_Calendar"}>{t("ShowVideo.Calendar")}</span>
                      </Tooltip>
                  </div>
                  <div className="selectDiv">
                      <Select
                          style={{ width: 120 }}
                          className="selectFilter"
                          placeholder={"Selecter un Type"}
                          defaultValue={values.type}
                          optionFilterProp="children"
                          name="type" onChange={handleHeaderSelect}

                          filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          getPopupContainer={() => document.querySelector(".selectFilter")}
                      >
                          <Option name="type"   value=""><span className="icon-select-all-line select-icon"></span> <span  style={{ padding: "1%" }} id={'spn_option'}>{t("ShowVideo.All")}</span> </Option>
                          <Option name="type"  value="archived"><span className="icon-Archive select-icon"></span>  <span style={{ padding: "1%" }} id={'spn_option'}>{t("ShowVideo.Archived")}</span></Option>
                          <Option name="type"  value="live"><span className="icon-Current select-icon"></span>  <span style={{ padding: "1%" }} id={'spn_option'}>{t("ShowVideo.InProgress")}</span></Option>
                          <Option name="type"  value="upcoming"><HourglassOutlined className={"select-icon"}/>  <span style={{ padding: "1%" }} id={'spn_option'}>{t("ShowVideo.ComingSoon")}</span></Option>
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
                          <Tooltip getPopupContainer={() => document.querySelector(".inputFilter")} title={t("ShowVideo.Filter")}>
                          <div
                              onClick={handlClickSuffix}
                              className="filter_icon"
                          >
                                  <FilterOutlined  className={filterIcon === true && filterIconDate ? "activeFilterIcon" : "notActiveFilterIcon"}/>

                          </div>
                          </Tooltip>
                      }
                      name="search"
                      autocomplete="off"
                      onKeyDown={(event)=>handleSearchRow(event,rangeDate)}
                      onChange={(e) =>
                          // dispatch loading Delete Button
                          dispatch(setFilterVideosActions({
                              FilterVideosNameChange: "searchFake",
                              FilterVideosValueChange: e.target.value
                          }))
                      }
                      value={values.searchFake}
                  />

              </div>{/*./div_filter*/}

          </div>{/*./Filter*/}

          {ShowFilter
              ?
              <div className="div_Filter_global">

                  <div id={"IDFilterDiv"} className="div_Filter" style={{backgroundColor:darkMode===false?"":"#1D1D1D"}}>

                      <div className="div1_div_Filter">
                          <RangePicker
                              className="range_div1_div_Filter"
                              ranges={{
                                  [t("ShowVideo.Today")]: [moment(), moment()],
                                  [t("ShowVideo.ThisMonth")]: [moment().startOf('month'), moment().endOf('month')],
                              }}
                              onChange={(datesValue , dateStringsValue)=>{onChangeRange('date', datesValue ,dateStringsValue);setFilterIconDate(datesValue)}}
                              value={[rangeDate && moment(rangeDate[0], 'YYYY-MM-DD'), rangeDate && moment(rangeDate[1], 'YYYY-MM-DD')]}
                              getPopupContainer={() => document.getElementById("IDFilterDiv")}
                          />
                      </div>{/*./div1_div_Filter*/}

                      {/*<div className="div2_div_Filter">*/}

                      {/*    <Select*/}
                      {/*        className="select1_div2_div_Filter"*/}
                      {/*        name="contributeur" onChange={onChangeContributor}*/}
                      {/*        placeholder={t("ShowVideo.Contributor")}*/}
                      {/*        optionFilterProp="children"*/}
                      {/*        filterOption={(input, option) =>*/}
                      {/*            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                      {/*        }*/}
                      {/*        value={selectedContributor}*/}
                      {/*        getPopupContainer={() => document.querySelector(".select1_div2_div_Filter")}*/}
                      {/*    >*/}
                      {/*        <Option name="contributeur" value="Departement">{t("ShowVideo.Department")}</Option>*/}
                      {/*        <Option name="contributeur" value="Profile">Profile</Option>*/}
                      {/*        <Option name="contributeur" value="lucy">lucy</Option>*/}
                      {/*    </Select>*/}

                      {/*</div>/!*./div2_div_Filter*!/*/}

                      <div className="div_button_filter">
                          <Tooltip title={t("ShowVideo.ResetMedia")}><Button onClick={()=>{handleResetFilter() ; setFilterIcon(false)}} style={{backgroundColor:darkMode===false?"":"#1D1D1D" , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} className="btn_1">{t("ShowVideo.Reset")}</Button></Tooltip>
                          <Tooltip title={t("ShowVideo.FilterMedia")}><Button type="primary" className="btn_2" onClick={() =>{ handleFiltrerVideos(rangeDate, selectedContributor ) ; setFilterIcon(true)}} >{t("ShowVideo.Filter")}</Button></Tooltip>
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
                          message={conditions.elementSelected > 1 ? t("ShowVideo.DeleteSelectedItems") : t("ShowVideo.DeleteSelectedItem")}
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