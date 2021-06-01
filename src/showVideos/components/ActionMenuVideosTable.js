import React from 'react';
import {InfoCircleOutlined,DownloadOutlined,EditOutlined,LinkOutlined,FilePdfOutlined,PictureOutlined,DeleteOutlined , EyeOutlined , InsertRowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {Tooltip, Dropdown, Menu, Popconfirm, Button} from 'antd';

const { SubMenu } = Menu;

function useActionMenu({record}) {

    const history = useHistory();



    // handle Click Menu
    const handleClickDropdowMenu = () =>{



    }

    const actionMenu = (
        <Menu className="menu">
            <Menu.Item onClick={()=>handleInfos()}><InfoCircleOutlined />infos</Menu.Item>
            <Menu.Item><EditOutlined />Modifier</Menu.Item>
            <Menu.Item><LinkOutlined />Export</Menu.Item>
            <Menu.Item onClick={()=>handleExport()}><span className="icon-Templates"></span> Templates</Menu.Item>
            <Menu.Item><DeleteOutlined />Supprimer</Menu.Item>
        </Menu>
    );
    //fonction handleExport
    const handleExport = () =>{
        history.push({pathname:'/exportMedia'})
    }
    // fonction handleInfos
    const handleInfos =()=>{
        history.push({pathname:'/infosMedia'})
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
        </div>
    );

    return [actionColumnView];
}

export default useActionMenu;