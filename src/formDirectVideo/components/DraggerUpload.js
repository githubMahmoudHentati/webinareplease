import {Upload, message, Avatar, Button} from 'antd';
import {InboxOutlined, LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Hooks from "../utils/hooks";
import axios from 'axios';
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {setConfigurationSpeaker, setGeneralOnchange} from "../store/formDirectVideoAction";


export const DraggerUpload = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    const {values}=Hooks()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const { Dragger } = Upload;

    const onSave =(file)=>{
        let url = process.env.REACT_APP_API_WEBINARPLEASE_HOST
        const token = localStorage.getItem('jwtToken');
        axios({
            url: url,
            method: 'post',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: file
        }).then((result) => {
            console.log("resultData",result.data.data.uploadLogo);
            dispatch(setGeneralOnchange({generalNameChange:"fileList", generalValueChange:
                    [{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: result.data.data.uploadLogo,
                        thumbUrl: result.data.data.uploadLogo,
                    }]
            }));
        }).catch(error => {
            console.log(error)
        });
    }

    const removeThumbnail=()=>{
        dispatch(setGeneralOnchange({generalNameChange:"fileList",generalValueChange:[]}))
    }

    const handleChange = async info => {

        let formData = new FormData();
        const variables = {
            avatar: null
        }
        const query = `
    mutation ($avatar:Upload!)
        {uploadLogo(avatar:$avatar)}
`;
        const operations = JSON.stringify({query, variables: {variables}});
        formData.append("operations", operations);
        const map = {
            "0": ["variables.avatar"]
        };
        formData.append("map", JSON.stringify(map));
        [...info.fileList].slice(-1).filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", file);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log("ppppppppppp",p);
        }
        onSave(formData)
    }
    //***********************End of Upload***********************////////

    return(
        <Dragger  style={{backgroundColor:darkMode===false?"":"rgba(255, 255, 255, 0.04)" ,width:"100%",display:"flex",justifyContent:"center", border:darkMode===false?"":"1px dashed rgba(255, 255, 255, 0.15)"}}
                 name="fileList" listType="picture"
                  accept="image/jpeg,image/png"
                  fileList={[...values.general.fileList]}
                  //beforeUpload={beforeUpload}
                  onChange={handleChange}
                  onRemove={removeThumbnail}
         >
            <p className="ant-upload-drag-icon">
                <InboxOutlined style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}/>
            </p>
            <p className="ant-upload-text" style={{ color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>Cliquer ou faites glisser le fichier</p>
            <p className="ant-upload-hint" style={{color:darkMode===false?"":"rgba(255, 255, 255, 0.85)"}}>
                Un seul fichier peut etre selectionné
            </p>
        </Dragger>
    )
}