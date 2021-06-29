import {Upload, message, Avatar, Button} from 'antd';
import {LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setConstraintDataOnchange, setGeneralInformationOnchange} from "../store/accountSettingsAction";
import {Hooks} from "../utils/hooks";
import axios from 'axios';

export const AvatarUpload = () => {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.AccountSettingsReducer)
    const {darkMode}=Hooks()
    console.log("values",values)

    const GetBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

    }

    const beforeUpload = (file) => {

    }

    const onSave =(file)=>{
         let url = "https://mbeji-cloud-sandbox.webtv-solution.dev/query"
         let token = localStorage.getItem('jwtToken')
        axios({
            url: url,
            method: 'post',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
            },
            data: file
        }).then((result) => {
            console.log("result",result.data.data.uploadLogo);
            dispatch(setGeneralInformationOnchange({
                generalInformationNameChange: "avatar",
                generalInformationValueChange: result.data.data.uploadLogo
            }))
        }).catch(error => {
            console.log(error)
        });
    }

    const handleChange = async info => {

        if (info.file.status === 'uploading') {
            await dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "avatarLoading",
                constraintDataValueChange: true
            }))
            dispatch(setGeneralInformationOnchange({
                generalInformationNameChange: "avatar",
                generalInformationValueChange: ""
            }))
            return;
        }

        // Get this url from response in real world.
        GetBase64(info.file.originFileObj, imageUrl =>
                dispatch(setGeneralInformationOnchange({
                    generalInformationNameChange: "avatar",
                    generalInformationValueChange: imageUrl
                })),
            dispatch(setConstraintDataOnchange({
                constraintDataNameChange: "avatarLoading",
                constraintDataValueChange: false
            })),
        );

        //*******************Upload Avatar In Server********************/////
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
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        await fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
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

    return (
        <Upload
            accept="image/jpeg,image/png"
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            <Button icon={<UploadOutlined />} style={{background:darkMode===false?"":"#141414" , color:darkMode===false?"":"rgba(255, 255, 255, 0.85)" , border:darkMode===false?"":"1px solid rgba(255, 255, 255, 0.15)"}}>Change l'avatar</Button>
        </Upload>
    );
}