import {Upload, message, Avatar, Button} from 'antd';
import {InboxOutlined, LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Hooks} from "../utils/hooks";
import axios from 'axios';
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {setGeneralOnchange} from "../store/formDirectVideoAction";


export const DraggerUpload = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()
    // use Selector redux
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)

    const { Dragger } = Upload;

    const onSave =(file)=>{
        let url = process.env.REACT_APP_API_WEBINARPLEASE_HOST2
        let token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"
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
            dispatch(setGeneralOnchange({generalNameChange:"fileList", generalValueChange:result.data.data.uploadLogo}));
        }).catch(error => {
            console.log(error)
        });
    }

    const handleChange = async info => {

        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
        let formData = new FormData();
        const variables ={
            logo:null
        }
        const query = `
    mutation ($logo:Upload!)
        {uploadLogo(logo:$logo)}
`;
        const operations = JSON.stringify({ query, variables:  {variables}  });
        formData.append("operations", operations);
        const map = {
            "0": ["variables.logo"]
        };
        console.log("fileLists", fileList);

        formData.append("map", JSON.stringify(map));
        await fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("o*******************", file);
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
                  fileList={[...fileList]}
                  //beforeUpload={beforeUpload}
                  onChange={handleChange}
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