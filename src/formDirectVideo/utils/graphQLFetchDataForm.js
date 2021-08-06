import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch} from "react-redux";
import moment from "moment";
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {setAppSetLogin} from "../../utils/redux/actions";
import {setLiveInfo,setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction"
import {setConfigurationOnchange, setGeneralOnchange} from "../store/formDirectVideoAction";
import {setAccountSetting, setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";
import {FormDirectConstraints} from "../utils/formDirectConstraints";
import defaultImg from '../../assets/webinarplease-thumb.jpg';

export const GraphQLFetchDataForm = (values) => {
    const {generals,configuration,invitation,socialTools,constraintData} = FormDirectConstraints()
    const history = useHistory()
    const dispatch = useDispatch()
    const idLive = localStorage.getItem('idLive')?localStorage.getItem('idLive'):'';
    console.log("values-graphQL",values)
    console.log("idLive",idLive)
    let period = values.general.period? values.general.period.format('HH:mm:ss'):"";
    let newStartDate= typeof values.general.startDate!="string"?(values.general.startDate).format('YYYY-MM-DD'):values.general.startDate
    let newStartHour= typeof values.general.startHour!="string"?(values.general.startHour).format('HH:mm:ss'):values.general.startHour

    const [CreateLive, {
        data: dataCreate,
        loading: loading_EventCreated,
        error: error_EventCreated,
    }] = useMutation(graphQL_shema().createLive, {
        context: { clientName: "second" },
        variables: {
            input: {
                generalInfo: {
                    thumbnail: values.general.fileList && values.general.fileList.length ?
                        values.general.fileList[0].thumbUrl : defaultImg,
                    liveTitle: values.general.liveTitle,
                    liveDescription: values.general.liveDescription,
                    livePlan: {
                        plan: values.general.liveAction,
                        startDate: newStartDate&&newStartHour?newStartDate+ "T" + newStartHour+ "Z":"",
                        duration: ""
                    },
                    liveAccess: values.general.directAccessMode !== "freeAccess",
                    pwd: values.general.pwd,
                    securedPasswordOption: false
                },
                configuration: {
                    liveProgram: values.configuration.directProgram,

                    interOption: {
                        chat: values.configuration.chat,
                        comment: values.configuration.comments,
                        like: values.configuration.likeMention
                    },

                    multiOption: {
                        isRm: values.configuration.richeMediaDiffusion,
                        shareFile: values.configuration.attachments
                    },
                    autoArchLive: {
                        auto: values.configuration.liveAutomaticArchiving,
                        visible: values.configuration.videoMode !== "notVisibleVideo",
                        theme: "themeX"
                    },
                    tags: values.configuration.tags,
                    addSpeaker: values.configuration.addSpeakerList,
                    themes: values.configuration.theme,
                },
                social: [
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "Facebook Post",
                        link: values.general.liveLink,
                        active: true,
                        planifications: values.socialTools[0].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "Youtube Post",
                        link: values.general.liveLink,
                        active: false,
                        planifications: values.socialTools[1].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "LinkedIn Post",
                        link: values.general.liveLink,
                        active: false,
                        planifications: values.socialTools[2].plan
                    }
                ]
            }
        },
        onCompleted: async (data) => {
            if (data.addLive.code === 200) {
                history.push("/showVideos")
                dispatch(setLiveInfo({general:generals,configuration:configuration,invitation:invitation,socialTools:socialTools,constraintData:constraintData}))

            } else if (data.addLive.code === 403) {

            }
        }
    });

    const [updateLive, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().updateLive, {
        context: { clientName: "second" },
        variables: {
            id: idLive,
            form: {
                generalInfoOutput: {
                    thumbnail: values.general.fileList && values.general.fileList.length ?
                        values.general.fileList[0].thumbUrl : defaultImg,
                    liveTitle: values.general.liveTitle,
                    liveDescription: values.general.liveDescription,
                    livePlan: {
                        plan: values.general.liveAction,
                        startDate: newStartDate&&newStartHour?newStartDate+ "T" + newStartHour+ "Z":"",
                        duration: ""
                    },
                    liveAccess: values.general.directAccessMode !== "freeAccess",
                    pwd: values.general.pwd,
                    securedPasswordOption: false
                },
                configurationOutput: {
                    liveProgram: values.configuration.directProgram,

                    interOption: {
                        chat: values.configuration.chat,
                        comment: values.configuration.comments,
                        like: values.configuration.likeMention
                    },

                    multiOption: {
                        isRm: values.configuration.richeMediaDiffusion,
                        shareFile: values.configuration.attachments
                    },
                    autoArchLive: {
                        auto: values.configuration.liveAutomaticArchiving,
                        visible: values.configuration.videoMode !== "notVisibleVideo",
                        theme: "themeX"
                    },
                    tags: values.configuration.tags,
                    addSpeaker: values.configuration.addSpeakerList,
                    themes: values.configuration.theme,
                },
                social: [
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "Facebook Post",
                        link: values.general.liveLink,
                        active: true,
                        planifications: values.socialTools[0].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "Youtube Post",
                        link: values.general.liveLink,
                        active: false,
                        planifications: values.socialTools[1].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : defaultImg,
                        Type: "LinkedIn Post",
                        link: values.general.liveLink,
                        active: false,
                        planifications: values.socialTools[2].plan
                    }
                ]
            }
        },
        onCompleted: async (data) => {
            if (data.addLive.code === 200) {
                history.push("/showVideos")
                dispatch(setLiveInfo({general:generals,configuration:configuration,invitation:invitation,socialTools:socialTools,constraintData:constraintData}))

            } else if (data.addLive.code === 403) {

            }
        }
    });

    const [generateSecuredPassword,{loading:loading_securedPassword, data:data_securedPassword}]
        = useMutation(graphQL_shema().generateSecuredPassword, {
        skip:values.general.securedPasswordOption,
        variables: {input:{autoGenerate:true}},
        context: { clientName: "second" },
        onCompleted :async (data)=>{
            if (data.generatePwd.code===200)
            {

                await dispatch(setGeneralOnchange({generalNameChange:"pwd", generalValueChange:data.generatePwd.pwd}));
                // await values.form.setFieldsValue({...values.form.getFieldsValue(),securedPasswordOption:data.generatePwd.pwd})
                // console.log("form.getFieldsValue()",values.form.getFieldsValue())
                await dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:true}));
            }
        }
    })

    const [themesDisplayQueryAction,{loading: loading_themesDisplay, data: ThemesDisplayData}]
        = useMutation(graphQL_shema().themesDisplayQuery, {
        context: { clientName: "second" },
        onCompleted: async (data) => {
            dispatch(setConfigurationOnchange({configurationNameChange:"themesList", configurationValueChange:data.getThemesList}));
        }
    })

    const {loading:LiveUpdated_Info, data: LiveUpdatedInfData}
        = useQuery(graphQL_shema().Get_UpdatedLive_Info, {
        variables: { "id":idLive  },
        skip:idLive?false:true,
        fetchPolicy:  "cache-and-network",
        onCompleted: async (data)=>{
            let startDate=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("YYYY-MM-DD")
            let startHour=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("HH:mm:ss")
            console.log("startDate",startDate,"startHour",startHour)
            await dispatch(setLiveInfo({
                general:{
                    thumbnail:data.getlive.generalInfoOut.thumbnail,
                    fileList:[{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: "https://webinarplease.com/assets/images/content1-3.jpg?v=6",
                        thumbUrl: "https://webinarplease.com/assets/images/content1-3.jpg?v=6",
                    }],
                    liveTitle:data.getlive.generalInfoOut.liveTitle,
                    liveDescription:data.getlive.generalInfoOut.liveDescription,
                    liveLink:data.getlive.generalInfoOut.liveLink+"/"+data.getlive.generalInfoOut.liveTitle,
                    liveAction:data.getlive.generalInfoOut.livePlan.plan,
                    livePlan:{
                        plan: false,
                        startDate:"",
                        duration:"",
                    },
                    startDate: startDate,
                    startHour: startHour,
                    period: data.getlive.generalInfoOut.livePlan.duration,
                    directAccessMode: !data.getlive.generalInfoOut.liveAccess?"freeAccess":"liveAccess",
                    liveAccess: data.getlive.generalInfoOut.liveAccess,
                    pwd: data.getlive.generalInfoOut.pwd,
                    liveSharedLink: data.getlive.generalInfoOut.liveLink,
                    securedPasswordOption: data.getlive.generalInfoOut.securedPasswordOption,
                },
                configuration:{
                    directProgram: data.getlive.configurationOut.liveProgram,
                    notVisibleVideo: false,
                    visibleVideo: false,
                    modalSpeaker: values.configuration.modalSpeaker,
                    switchSpeaker: values.configuration.switchSpeaker,
                    liveAutomaticArchiving: false,
                    SpeakerList: values.configuration.SpeakerList,
                    addSpeakerList:values.configuration.addSpeakerList,
                    speaker: values.configuration.speaker,
                    loadingSpeakerInfo:false,
                    chat: data.getlive.configurationOut.interOption.chat,
                    comments: data.getlive.configurationOut.interOption.comment,
                    likeMention: data.getlive.configurationOut.interOption.like,
                    attachments: data.getlive.configurationOut.multiOption.shareFile,
                    richeMediaDiffusion: data.getlive.configurationOut.multiOption.isRm,
                    videoMode: data.getlive.configurationOut.videoMode?"visibleVideo":"notVisibleVideo",
                    theme:values.configuration.theme,
                    themesList:[],
                    tags:data.getlive.configurationOut.tags,
                },
                socialTools:[
                    {
                        id: 0,
                        idServer:data.getlive.socialOut.length>0?data.getlive.socialOut[0].id:0,
                        title:data.getlive.socialOut.length>0?data.getlive.socialOut[0].title:"",
                        type: "Facebook post",
                        switch: data.getlive.socialOut.length>0?data.getlive.socialOut[0].active:false,
                        link:data.getlive.socialOut.length>0?data.getlive.socialOut[0].link:"",
                        logo: <img src={fbPost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut.length>0?data.getlive.socialOut[0].planifications:[{id:0,active: true, startDate: "", endDate: ""}]
                    },
                    {
                        id: 1,
                        idServer:data.getlive.socialOut.length>0?data.getlive.socialOut[1].id:1,
                        title:data.getlive.socialOut.length>0?data.getlive.socialOut[1].title:"",
                        type: "Youtube post",
                        switch: data.getlive.socialOut.length>0?data.getlive.socialOut[1].active:false,
                        link:data.getlive.socialOut.length>0?data.getlive.socialOut[1].link:"",
                        logo: <img src={youtubePost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut.length>0?data.getlive.socialOut[1].planifications:[{id:1,active: true, startDate: "", endDate: ""}]
                    },
                    {
                        id: 2,
                        idServer:data.getlive.socialOut.length>0?data.getlive.socialOut[2].id:2,
                        title:data.getlive.socialOut.length>0?data.getlive.socialOut[2].title:"",
                        type: "Linkdln post",
                        switch: data.getlive.socialOut.length>0?data.getlive.socialOut[2].active:false,
                        link:data.getlive.socialOut.length>0?data.getlive.socialOut[2].link:"",
                        logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut.length>0?data.getlive.socialOut[2].planifications:[{id:2,active: true, startDate: "", endDate: ""}]
                    },
                ]
            }));
            await dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:true}))
        }
    })


    return ({
        CreateLive,
        updateLive,
        generateSecuredPassword,
        loading_securedPassword,
        data_securedPassword,
        themesDisplayQueryAction,
        LiveUpdatedInfData
    })
}

