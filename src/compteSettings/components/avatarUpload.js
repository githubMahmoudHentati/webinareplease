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
         let url = "//mbeji-cloud-sandbox.webtv-solution.dev:7007/query"
         let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1PVVNTQUJFSkkiLCJpZCI6MTAyLCJyb2xlIjpbIm5pbCJdLCJleHAiOjE2MjQ2MTY3NDN9.m_cXU7WMgKHzyWfnNrkbztLKvNvSofyOdmlzm7VRpXlPytk1gfxebe2Bqj7VMoHKvNVu-d-I7Pi2ESbwk6w-zxqGcl-AOFa48R74YcV6KKhqHRHLxDqEQfkOb67SI-C13x9BA60K5rUQ1En7m5a4dl3EQHLNNan8vUSpWYHTnlqFjacVYis_YfTgWFFmvgrf18hqN7Zns6rTon4BjdWMdIcUVW4aGDev_lXwNBdiXkXbNlioyKJUFrIjx-jeSBoKA8PdYW-ywZ3qFWQGOXdVMXH3HbqdkGHq2gIWTDMVi_ObIBIaUL6F0m4uLvE89zxO7p7AAtQa8sIzJhEjZcMs3R-D3It8RQh2_LsD5phPue0CORot297eXICma9FZHRdlU-kI5ZUF-cZHj2bFwUUyAknc5AWY8xptR1m7A-oXuXPlnDbF0rYX2JlCneSn9TO526LQceLHY8b1S3_vkjxj88lAI7W-mRdVXgOa2Yx73qH9ljZmb8hOWuTu45umhM3hJjZNdQGS_FeBhtm_HRmk-8TSg1SAsxNCvsWgym40Hii854UApV9_WEqwFv34NYDwWAbfEZx0XViNAKB21TM07oDSemx1kFXh0OHAb2eZDsuOaf6zzpkjCVkfAL3sgjRIHOTGSd0tzngURuX2UUrxfeJqz8caaPIJSizCVGiomUo"
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