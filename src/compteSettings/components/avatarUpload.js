import {Upload, message, Avatar, Button} from 'antd';
import {LoadingOutlined, PlusOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import React ,{useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setConstraintDataOnchange, setGeneralInformationOnchange} from "../store/accountSettingsAction";
import {Hooks} from "../utils/hooks";

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

    };

    return (
        <Upload
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