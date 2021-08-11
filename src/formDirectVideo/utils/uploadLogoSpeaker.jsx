import axios from 'axios';
import {useEffect, useState} from 'react';
import {
    setConfigurationOnchange,
    setConfigurationSpeaker,
    setGeneralOnchange,
    setErrorUpload,
    setLoadingUpload
} from "../store/formDirectVideoAction";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";


export const UploadLogoSpeaker = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()


    const beforeUpload=(info)=>{
        info.file.status='done'
    }

    const removeLogoSpeaker=()=>{
        dispatch(setConfigurationSpeaker({nameSpeaker:"logoSpeaker",valueSpeaker:[]}))
    }

    const onSave = async (file, fileInfos)=>{
        let url = process.env.REACT_APP_API_WEBINARPLEASE_HOST
        let token = localStorage.getItem('jwtToken')
        dispatch(setLoadingUpload(true))
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
            let value=result.data.data.uploadLogo;
            dispatch(setLoadingUpload(false))
            if (result.data.data.uploadLogo){
                dispatch(setErrorUpload(false))
            }else{
                value=""
                dispatch(setErrorUpload(true))
            }
            dispatch(setConfigurationSpeaker({
                nameSpeaker: "logoSpeaker", valueSpeaker: (
                    [{
                        uid: '-1',
                        name: (fileInfos && fileInfos.file.name) || 'xxx.png',
                        status: 'done',
                        url: value,
                        thumbUrl: value,
                    }]
                )
            }))
        }).catch(error => {
            console.log(error)
        });
    }

    const onChangeFile =  async (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
        //await dispatch(setConfigurationSpeaker({nameSpeaker:"logoSpeaker",valueSpeaker:(fileList)}))
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
        fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", file);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log("ppppppppppp",p);
        }
        onSave(formData, info)
    }

    useEffect(async () => {

    }, []);


    return {
        onChangeFile,
        beforeUpload,
        removeLogoSpeaker,
        fileList
    };
};
