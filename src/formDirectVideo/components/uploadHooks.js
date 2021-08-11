import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import axios from "axios";
import {
    setConfigurationFileList,
    setConfigurationSpeakerList,
    setGeneralOnchange
} from "../store/formDirectVideoAction";


export const UploadHooks = () =>{
    const dispatch = useDispatch()

    //******************** On Save General *****************//
    const onSaveGeneral =(file, fileInfos)=>{
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
                        name: (fileInfos && fileInfos.file.name) || "xxx.png",
                        status: 'done',
                        url: result.data.data.uploadLogo,
                        thumbUrl: result.data.data.uploadLogo,
                    }]
            }));
        }).catch(error => {
            console.log(error)
        });
    }
    //******************** On remove General *****************//
    const removeThumbnailGeneral=()=>{
        dispatch(setGeneralOnchange({generalNameChange:"fileList",generalValueChange:[]}))
    }

    //******************** handle change General *****************//
    const handleChangeGeneral = async info => {

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
        onSaveGeneral(formData, info)
    }
    //***********************End of Upload General***********************////////

    //******************** On Save Configuration *****************//
    const onSaveConfiguration =(file, fileInfos)=>{
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
            dispatch(setConfigurationFileList({configurationNameFileList:"fileListConfiguration", configurationValueFileList:
                    {
                        uid: '-1',
                        name: (fileInfos && fileInfos.file.name) || "xxx.png",
                        status: 'done',
                        url: result.data.data.uploadLogo,
                        thumbUrl: result.data.data.uploadLogo,
                    }
            }));

        }).catch(error => {
            console.log(error)
        });
    }
    //******************** On remove Configuration *****************//
    const removeThumbnailConfiguration=()=>{
        //dispatch(setGeneralOnchange({generalNameChange:"fileListConfiguration",generalValueChange:[]}))
    }

    //******************** handle change Configuration *****************//
    const handleChangeConfiguration = async info => {

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
        [...info.fileList].filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", [...info.fileList]);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log("ppppppppppp",p);
        }
        onSaveConfiguration(formData, info)
    }
    //***********************End of Upload Configuration***********************////////


    return({
        onSaveGeneral,
        removeThumbnailGeneral,
        handleChangeGeneral,
        removeThumbnailConfiguration,
        handleChangeConfiguration

    })
}