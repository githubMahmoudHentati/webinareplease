import React , {useState,useEffect} from 'react';
import { Breadcrumb,Button, Tooltip , Select , Input  , Checkbox , DatePicker, Space} from "antd";
import {  HourglassOutlined ,DownloadOutlined ,PlayCircleOutlined ,ImportOutlined ,BorderInnerOutlined , CalendarOutlined , DeleteOutlined , DownOutlined ,RightOutlined ,HomeOutlined , PlusSquareOutlined , MenuOutlined , TableOutlined  ,AppstoreOutlined , FilterOutlined , FolderOutlined , FolderOpenOutlined , SearchOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import '../../assets/icomoon/style.css';
const { Option } = Select;
let clicked = false;

function HeaderVideos({selectedRow}) {

    const [activeIcon , SetActiveIcon]=useState(false) // state pour changer le couleur de l'icon de filtrage
    const [ShowFilter , SetShowFilter] = useState(false) // state pour afficher le div de fltrage si on clique sur l'icon de filtrage
    const history = useHistory();

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
    // fonction de recherche dans la selection des dossiers
    function onSearch(val) {
        console.log('search:', val);
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
              <Breadcrumb style={{color:darkMode===false?"":"#ffffff"}}>
                  <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}}>
                      <span >Accueil</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="" style={{color:darkMode===false?"":"#ffffff"}}>
                      <span>Direct</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{color:darkMode===false?"":"#ffffff"}}>Tous</Breadcrumb.Item>
              </Breadcrumb>

          </div>{/*./Breadcrumb*/}

          <div className="MesDirects" style={{backgroundColor:darkMode===false?"RGBA(0, 0, 0, 0.04)":"#1D1D1D"}}>
              <h4 style={{color:darkMode===false?"":"white"}}>Mes Directs</h4>
              <Button onClick={()=>{history.push("/FormDirectVideo")}} className="btn_add_media" type="primary" icon={<PlusSquareOutlined />} >Ajouter</Button>
          </div>{/*./TousMedia*/}

          <div className="Filter">

              <div className="div_delete_select">

                  {
                      selectedRow === 0
                          ?
                          null
                          :
                          <div className="delete_number">
                              <Tooltip title="Supprimer">
                                  <Button style={{backgroundColor:darkMode===false?"":"#141414"}}  icon={<DeleteOutlined style={{color:darkMode===false?"":"white"}}/>} />
                              </Tooltip>
                              <p style={{color:darkMode===false?"":"white"}}><span>{selectedRow}</span> <span>élément(s) sélectionné(s)</span></p>
                          </div>
                  }

                  <div className="Calendrier" onClick={()=>handleClickCalendar()} style={{backgroundColor:darkMode===false?"":"#141414", color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid RGBA(255, 255, 255, 0.15)"}}>
                      <Tooltip className="tooltip_calendrier" title="Afficher Calendrier">
                      <CalendarOutlined  className="IconCalendrier" style={{color:darkMode===false?"":"RGBA(255, 255, 255, 0.65)"}}/>
                      <span>Calendrier</span>
                      </Tooltip>
                  </div>
                  <div className="selectDiv">
                      <Select
                          showSearch
                          className="selectFilter"
                          placeholder={"Selecter un Type"}
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                      >
                          <Option  value="jack"><span className="icon-select-all-line"></span> Tous </Option>
                          <Option value="lucy"><span className="icon-Archive"></span>  Archivés</Option>
                          <Option value="tom"><span className="icon-Current"></span>  En cours</Option>
                          <Option value="hello"><HourglassOutlined />  A venir</Option>
                      </Select>
                  </div>

              </div> {/*./div_delete_select*/}
              <div className="div_filter">

                  <Input
                      style={{backgroundColor:darkMode===false?"":"#141414" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}
                      className="inputFilter"
                      placeholder="Rechercher…"
                      prefix={<SearchOutlined style={{color:darkMode===false? "rgba(0, 0, 0, 0.25)" : "RGBA(255, 255, 255, 0.15)", marginLeft: "10px" }}/>}
                      suffix={
                          <Tooltip title="Filtrer">
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
                  />

              </div>{/*./div_filter*/}

          </div>{/*./Filter*/}

          {ShowFilter
              ?
              <div className="div_Filter_global">

                  <div className="div_Filter" style={{backgroundColor:darkMode===false?"":"#1D1D1D"}}>

                      <div className="div1_div_Filter">
                          <Select defaultValue="Profile" className="select_div1_div_Filter">
                              <Option value="jacky">jacky</Option>
                              <Option value="Profile">Profile</Option>
                              <Option value="lucy">lucy</Option>
                          </Select>
                          <DatePicker placeholder="Sélectionnez une date"  classNmae="datepicker_div1_div_Filter"/>
                      </div>{/*./div1_div_Filter*/}

                      <div className="div2_div_Filter">

                          <Select defaultValue="Departement" className="select1_div2_div_Filter">
                              <Option value="Departement">Departement</Option>
                              <Option value="Profile">Profile</Option>
                              <Option value="lucy">lucy</Option>
                          </Select>

                      </div>{/*./div2_div_Filter*/}

                      <div className="div_button_filter">
                          <Tooltip title="Rénitialiser médias"><Button style={{backgroundColor:darkMode===false?"":"#1D1D1D" , color:darkMode===false?"":"rgba(255, 255, 255, 0.65)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}} className="btn_1">Réinitialiser</Button></Tooltip>
                          <Tooltip title="Filtrer médias"><Button type="primary" className="btn_2">Filtrer</Button></Tooltip>
                      </div>{/*./div_button_filter*/}



                  </div>{/*./div_Filter*/}

              </div>
              :
              null
          }


      </div>
    );
}

export default HeaderVideos;