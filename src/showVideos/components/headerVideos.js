import React , {useState,useEffect} from 'react';
import { Breadcrumb,Button, Tooltip , Select , Input  , Checkbox , DatePicker, Space} from "antd";
import {  HourglassOutlined ,DownloadOutlined ,PlayCircleOutlined ,ImportOutlined ,BorderInnerOutlined , CalendarOutlined , DeleteOutlined , DownOutlined ,RightOutlined ,HomeOutlined , PlusSquareOutlined , MenuOutlined , TableOutlined  ,AppstoreOutlined , FilterOutlined , FolderOutlined , FolderOpenOutlined , SearchOutlined } from '@ant-design/icons';
import {useHistory} from "react-router-dom";
import '../../assets/icomoon/style.css'
const { Option } = Select;
let clicked = false;

function HeaderVideos({selectedRow}) {

    const [activeIcon , SetActiveIcon]=useState(false) // state pour changer le couleur de l'icon de filtrage
    const [ShowFilter , SetShowFilter] = useState(false) // state pour afficher le div de fltrage si on clique sur l'icon de filtrage


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

    return(
      <div className="HeaderVideo">

          <div className="BreadcrumbDiv">
              <Breadcrumb>
                  <Breadcrumb.Item href="">
                      <span>Accueil</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="">
                      <span>Direct</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Tous</Breadcrumb.Item>
              </Breadcrumb>

          </div>{/*./Breadcrumb*/}

          <div className="MesDirects">
              <h4>Mes Directs</h4>
              <Button className="btn_add_media" type="primary" icon={<PlusSquareOutlined />} >Ajouter</Button>
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
                                  <Button  icon={<DeleteOutlined />} />
                              </Tooltip>
                              <p><span>{selectedRow}</span> <span>élément(s) sélectionné(s)</span></p>
                          </div>
                  }

                  <div className="Calendrier">
                      <Tooltip className="tooltip_calendrier" title="Afficher Calendrier">
                      <CalendarOutlined  className="IconCalendrier"/>
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
                      className="inputFilter"
                      placeholder="Rechercher…"
                      prefix={<SearchOutlined style={{color: "rgba(0, 0, 0, 0.25)", marginLeft: "10px"}}/>}
                      suffix={
                          <Tooltip title="Filtrer">
                          <div
                              onClick={handlClickSuffix}
                              className="filter_icon"
                          >
                             <FilterOutlined id={activeIcon===true?"activeIcon":""} className="class_icon_filter"/>
                          </div>
                          </Tooltip>
                      }
                  />

              </div>{/*./div_filter*/}

          </div>{/*./Filter*/}

          {ShowFilter
              ?
              <div className="div_Filter_global">

                  <div className="div_Filter">

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
                          <Tooltip title="Rénitialiser médias"><Button className="btn_1">Réinitialiser</Button></Tooltip>
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