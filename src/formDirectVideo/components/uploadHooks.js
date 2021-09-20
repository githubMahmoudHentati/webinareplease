import {useDispatch} from "react-redux";
import axios from "axios";
import {
    setConfigurationFileList,
    setGeneralOnchange,
    setDeleteFileList, setDiapositivesFileList, setDiapositivesDelete, setLoadingUpload,
} from "../store/formDirectVideoAction";
import { v4 as uuidv4 } from 'uuid';
import {setConstraintDataOnchange, setErrorVisibility} from "../../compteSettings/store/accountSettingsAction";
import Hooks from "../../formDirectVideo/utils/hooks";




export const UploadHooks = () =>{
    const dispatch = useDispatch()
    const {generalInformationOnChangeAvatar} = Hooks()

    //************************************** Start Upload General **************************************//////////////////////

    //******************** On Save General *****************//
    const onSaveGeneral =(file, fileInfos)=>{
       console.log("onSaveGeneral************")
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

            let value=result.data.data.uploadLogo;
            if (result.data.data.uploadLogo){
                dispatch(setErrorVisibility({
                    ErrorVisibilityName: "errorVisibility",
                    ErrorVisibilityValue: false
                }))
            }else{
                value=""
                dispatch(setErrorVisibility({
                    ErrorVisibilityName: "errorVisibility",
                    ErrorVisibilityValue: true
                }))
            }
            dispatch(setGeneralOnchange({generalNameChange:"fileList", generalValueChange:
                    [{
                        uid: '-1',
                        name: (fileInfos && fileInfos.file.name) || "xxx.png",
                        status: 'done',
                        url:value,
                        thumbUrl:value,
                    }]
            }));
            console.log("CHEEEEEEEEEEEECK")
            dispatch(setLoadingUpload(false))
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
        console.log("DDDDDD",info.file.status)
        if (info.file.status === 'uploading') {
            await  dispatch(setLoadingUpload(true))
            return;
        }
            console.log("handleChangeGeneral**********info", info)
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
        fileList.slice(-1);
        await  fileList.filter(file => file.type === "image/jpeg" || file.type === "image/png").map(async (e, index) => {
            const file = e.originFileObj;
            return formData.append("0", file);
        })
console.log("FILE",fileList)
            onSaveGeneral(formData, info)
    }

    //************************************** End Upload General **************************************//////////////////////

    //************************************** Start Upload Configuration (Joindre Fichiers) **************************************//////////////////////

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
            dispatch(setConfigurationFileList({configurationNameFileList:"fileListConfiguration", configurationValueFileList:
                    {
                        uid: uuidv4(),
                        name: (fileInfos && fileInfos.file.name) || "image.png",
                        status: 'done',
                        url: result.data.data.multipleUpload.path,
                        thumbUrl: result.data.data.multipleUpload.path,
                    }
            }));

        }).catch(error => {
            console.log(error)
        });
    }
    //******************** On remove Configuration *****************//
    const removeThumbnailConfiguration=(file)=>{
        dispatch(setDeleteFileList({deleteFileListsName:"fileListConfiguration",deleteFileListsValue:file}))
    }

    //******************** handle change Configuration *****************//
    const handleChangeConfiguration = async info => {

        let formData = new FormData();
        const variables = {
            files: null
      }
        const query = `
   mutation($files: Upload!) 
   { multipleUpload(files: $files) 
   {path} 
   }
`;
        const operations = JSON.stringify({query, variables: {variables}});
        formData.append("operations", operations);
        const map = {
         "0": ["variables.files"],
        };
        formData.append("map", JSON.stringify(map));
        [...info.fileList].map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", [...info.fileList]);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log("ppppppppppp",p);
        }
        onSaveConfiguration(formData, info)
    }

    //************************************** End Upload Configuration (Joindre Fichiers) **************************************//////////////////////

    //************************************** Start Upload Configuration (Diapositives Rich Media) **************************************//////////////////////

    //******************** On Save Diapositives Rich Media *****************//
    const onSaveDiapositives =(file, fileInfos)=>{
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
            dispatch(setDiapositivesFileList({diapositiveNameFileList:"diapositivesFileLists", diapositivesValueFileList:
                    {
                        uid: uuidv4(),
                        name: (fileInfos && fileInfos.file.name) || "image.png",
                        status: 'done',
                        url: result.data.data.uploadLogo,
                        thumbUrl: result.data.data.uploadLogo,
                    }
            }));
        }).catch(error => {
            console.log(error)
        });
    }
    //******************** On remove General *****************//
    const removeThumbnailDiapositives=(file)=>{
        dispatch(setDiapositivesDelete({diapositiveDeleteName:"diapositivesFileLists",diapositivesDeleteValue:file}))
    }

    //******************** handle change General *****************//
    const handleChangeDiapositives = async info => {

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
        [...info.fileList].filter(file => file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif").map(async (e, index) => {
            const file = e.originFileObj;
            console.log("*******************", file);
            return formData.append("0", file);
        })

        for (let p of formData) {
            console.log("ppppppppppp",p);
        }
        onSaveDiapositives(formData, info)
    }

    //************************************** End Upload Configuration (Diapositives Rich Media) **************************************//////////////////////


    return({
        onSaveGeneral,
        removeThumbnailGeneral,
        handleChangeGeneral,
        removeThumbnailConfiguration,
        handleChangeConfiguration,
        onSaveDiapositives,
        removeThumbnailDiapositives,
        handleChangeDiapositives
    })
}