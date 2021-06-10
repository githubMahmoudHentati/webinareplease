import axios from 'axios';
import {useEffect, useState} from 'react';
import {setConfigurationOnchange, setConfigurationSpeaker} from "../store/formDirectVideoAction";
import {useDispatch} from "react-redux";


export const UploadLogoSpeaker = () => {
    const [fileList, setFileList] = useState([])
    const dispatch = useDispatch()

    const beforeUpload=(info)=>{
        info.file.status='done'
    }

    // const onSave =(file)=>{
    //     let url = process.env.REACT_APP_API_EVENT_HOST
    //     let token = process.env.REACT_APP_API_EVENT_TOKEN
    //     axios({
    //         url: url,
    //         method: 'post',
    //         headers: {
    //             Authorization: 'Bearer ' + token,
    //             'Content-Type': 'multipart/form-data',
    //         },
    //         data: file
    //     }).then((result) => {
    //         console.log("result",result.data.data.uploadLogo);
    //         setFileUpload(result.data.data.uploadLogo)
    //     }).catch(error => {
    //         console.log(error)
    //         setFileUpload("deleted")
    //     });
    // }

    const onChangeFile =  async (info) => {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        setFileList(fileList);
        await dispatch(setConfigurationSpeaker({nameSpeaker:"logoSpeaker",valueSpeaker:(fileList[0])}))
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
        formData.append("map", JSON.stringify(map));
        info.fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", file);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log(p);
        }

        // onSave(formData)
    }

    useEffect(async () => {

    }, []);


    return {
        onChangeFile,
        beforeUpload,
        fileList
    };
};
