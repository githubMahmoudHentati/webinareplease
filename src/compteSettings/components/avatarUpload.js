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
         let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1PVVNTQUJFSkkiLCJpZCI6MTAyLCJyb2xlIjpbIm5pbCJdLCJleHAiOjE2MjQ1MjI0Mjd9.qq72kEcYmbzqb04knNOIPgeLavUClb9DpHNVCrvYzuvgBRvD52OM347kH-ltJA5Wt1etPDm7DOF6Is01BYVStKG351MyHCjuupy5EZ4ygNUu8q8zOuQRIy3nO7qBGvihTNGfTptx0cn9elXA5n14nHBqTPL2Bl5BtMDnTUjXfqZmKwbdBpnf9ct-BHAlT_jyI4SL0PtiaLumVA26M97UaMQKaljJvVJzM2ezHWUeLZldpZO1gxKyC032GorGGHJY_uyRm9lLtI41p29fYk8bJiq3eL8L9JsJK9CuwOC3vmD5S3Xn67j3KpjeI11X_YBtTnfmWmVN3oOnxzRDJLbrEOkmTPWBlycl7euKU8m6mHL1uSFk5Y1Ixo8nrpT6WMZ1w05vr0HYMhy2PV1Z0PfXzGgcyMajVDdlWhxdr8oFaeI8AhyEMY33IqjYhLx5x8I3dSN8JjXOApv23rd7qT1rRWhl2BRUGQqgBgrfSBD6FT9rGqyzcaONBhonOKogqm2XKB8l4YnnvYAgo8DqZoY8h7ehF9nhKA-WWKYmrbuMa7e2NpDkwEo45n_8FX7MOBEjxs3ms6dEhW2VHqkG1hChJ9yITExdf6bToUZoQfN7le-Sj4rlP0V6lnhS8Q8ivrcTO4WfDu7TfaLgthyXsuOJQMb23sj_dozWGtQHLNhUtJE"
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
        info.fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", file);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log(p);
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