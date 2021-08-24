import {useQuery,useMutation,useLazyQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch,useSelector} from "react-redux";
import moment from "moment";
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {setLiveInfo,setFormDirectLiveConstraintDataOnchange} from "../store/formDirectVideoAction"
import {setConfigurationOnchange, setGeneralOnchange} from "../store/formDirectVideoAction";
import {FormDirectConstraints} from "../utils/formDirectConstraints";
import {setDirectSetting} from "../../utils/redux/actions";
import {StatusMessages} from "./StatusMessages";
import {v4 as uuidv4} from "uuid";


export const GraphQLFetchDataForm = (values) => {
    const directMenu = useSelector((state)=>state.Reducer.directMenu)
    const {generals,configuration,invitation,socialTools,constraintData} = FormDirectConstraints()
    const history = useHistory()
    const dispatch = useDispatch()
    const idLive = localStorage.getItem('idLive')?localStorage.getItem('idLive'):'';
    let ThumbUrlAttachementFile =values.configuration.fileListConfiguration.map(item=>item.url)
    let DiapositivesFile=values.configuration.diapositivesFileLists.map(item=>item.url)
    let TitleChapters = values.configuration.listChapter.map(item=>item.title)
    console.log("titleeeee",TitleChapters)
    let {success_submit , error_submit}=StatusMessages(idLive)
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
                        values.general.fileList[0].thumbUrl : "",
                    liveTitle: values.general.liveTitle,
                    liveDescription: values.general.liveDescription,
                    livePlan: {
                        plan: values.general.liveAction,
                        startDate: values.general.startDate&&values.general.startHour?values.general.startDate+ "T" + values.general.startHour+ ":00Z":"",
                        duration: values.general.period,

                    },
                    liveAccess: values.general.directAccessMode !== "freeAccess",
                    pwd: values.general.pwd,
                    securedPasswordOption: values.general.securedPasswordOption,
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
                    chapters:TitleChapters,
                    attachedFiles:ThumbUrlAttachementFile,
                    slides:DiapositivesFile,
                },
                social: [
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "Facebook Post",
                        link: values.general.liveLink,
                        active: values.socialTools[0].switch,
                        planifications: values.socialTools[0].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "Youtube Post",
                        link: values.general.liveLink,
                        active: values.socialTools[1].switch,
                        planifications: values.socialTools[1].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "LinkedIn Post",
                        link: values.general.liveLink,
                        active: values.socialTools[2].switch,
                        planifications: values.socialTools[2].plan
                    }
                ]
            }
        },
        onCompleted: async (data) => {
            if (data.addLive.code === 200) {
                history.push("/showVideos")
                localStorage.removeItem('idLive')
                dispatch(setLiveInfo({general:generals(),configuration:configuration(),invitation:invitation(),socialTools:socialTools(),constraintData:constraintData()}))
                dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingCreateEditLive",constraintDataValueChange:false}));
                dispatch(setDirectSetting(0))
                values.constraintData.leaveToast&& await success_submit(200)

            } else if (data.addLive.code === 400) {
                values.constraintData.leaveToast && await error_submit(400)
            }
        }
    });

    const [UpdateLive, {
        data: liveUpdate,
        loading: loadingLiveUpdated,
    }] = useMutation(graphQL_shema().UpdateLive, {
        context: { clientName: "second" },
        variables: {
            id: idLive,
            form: {
                generalInfoOutput: {
                    thumbnail: values.general.fileList && values.general.fileList.length ?
                        values.general.fileList[0].thumbUrl : "https://www.cerballiance.fr/sites/www.cerballiance.fr/files/media/image/2020-12/iStock-1210073353-covid-test-sanguin-achetee_0.jpg",
                    liveTitle: values.general.liveTitle,
                    liveDescription: values.general.liveDescription,
                    livePlan: {
                        plan: values.general.liveAction,
                        startDate: values.general.startDate&&values.general.startHour?values.general.startDate+ "T" + values.general.startHour+ ":00Z":"",
                        duration: values.general.period,
                    },
                    liveAccess: values.general.directAccessMode !== "freeAccess",
                    pwd: values.general.pwd,
                    securedPasswordOption: values.general.securedPasswordOption
                },
                configurationOutput: {
                    liveProgram: values.configuration.directProgram,

                    speakers: values.configuration.addSpeakerList,

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
                    themes: values.configuration.theme,
                    attachedFiles:ThumbUrlAttachementFile,
                    slides:DiapositivesFile,
                },
                social: [
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "Facebook Post",
                        link: values.general.liveLink,
                        active: values.socialTools[0].switch,
                        planifications: values.socialTools[0].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "Youtube Post",
                        link: values.general.liveLink,
                        active: values.socialTools[1].switch,
                        planifications: values.socialTools[1].plan
                    },
                    {
                        title: values.general.liveTitle,
                        logo: values.general.fileList && values.general.fileList.length ?
                            values.general.fileList[0].thumbUrl : "",
                        Type: "LinkedIn Post",
                        link: values.general.liveLink,
                        active: values.socialTools[2].switch,
                        planifications: values.socialTools[2].plan
                    }
                ]
            }
        },
        onCompleted: async (data) => {
            if (data.editLive.code === "200") {
                history.push("/showVideos")
                localStorage.removeItem('idLive')
                dispatch(setLiveInfo({general:generals(),configuration:configuration(),invitation:invitation(),socialTools:socialTools(),constraintData:constraintData()}))
                dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingCreateEditLive",constraintDataValueChange:false}));
                values.constraintData.leaveToast&&success_submit(200)
            } else if (data.editLive.code === "403") {
                values.constraintData.leaveToast&&error_submit(400)
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

                 dispatch(setGeneralOnchange({generalNameChange:"pwd", generalValueChange:data.generatePwd.pwd}));
                // await values.form.setFieldsValue({...values.form.getFieldsValue(),securedPasswordOption:data.generatePwd.pwd})
                // console.log("form.getFieldsValue()",values.form.getFieldsValue())
                 dispatch(setGeneralOnchange({generalNameChange:"loadingSecuredPassword", generalValueChange:true}));
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

    const [getLiveData,{loading:LiveUpdated_Info, data: LiveUpdatedInfData}]
        = useLazyQuery(graphQL_shema().Get_UpdatedLive_Info, {
        variables: { "id":idLive  },
        skip:!idLive||values.constraintData.loadingLiveFetchData?true:false,
        fetchPolicy:  "cache-and-network",
        onCompleted: async (data)=>{
            let startDate=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("YYYY-MM-DD")
            let startHour=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("HH:mm")

            console.log("startDate",startDate,"startHour",startHour)
            let speakerList=[...data.getlive.configurationOut.speakers]
            dispatch(setLiveInfo({
                general:{
                    thumbnail:data.getlive.generalInfoOut.thumbnail,
                    fileList:data.getlive.generalInfoOut.thumbnail.length?[{
                        uid: '-1',
                        name: data.getlive.generalInfoOut.thumbnail.substring(data.getlive.generalInfoOut.thumbnail.lastIndexOf("/")+1,data.getlive.generalInfoOut.thumbnail.length),
                        status: 'done',
                        url: data.getlive.generalInfoOut.thumbnail,
                        thumbUrl: data.getlive.generalInfoOut.thumbnail,
                    }]:[],
                    liveTitle:data.getlive.generalInfoOut.liveTitle,
                    liveDescription:data.getlive.generalInfoOut.liveDescription,
                    liveLink:data.getlive.generalInfoOut.liveLink,
                    liveAction:data.getlive.generalInfoOut.livePlan.plan,
                    livePlan:{
                        plan: false,
                        startDate:"",
                        duration:data.getlive.generalInfoOut.livePlan.duration,
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
                    modalSpeaker: values.configuration.modalSpeaker,
                    switchSpeaker: values.configuration.switchSpeaker,
                    liveAutomaticArchiving: data.getlive.configurationOut.autoArchLive.auto,
                    SpeakerList:speakerList.map(({avatar: logoSpeaker,mail : email,function:title,id:id, ...rest
                                                 },index)  => ({
                        logoSpeaker:[{
                            uid: '-1',
                            name: speakerList[index].avatar.substring(speakerList[index].avatar.lastIndexOf("/")+1,speakerList[index].avatar.length),
                            status: 'done',
                            url: speakerList[index].avatar,
                            thumbUrl:speakerList[index].avatar,
                        }],email,title,id:index+1,
                        ...rest
                    })),
                    addSpeakerList:values.configuration.addSpeakerList,
                    speaker:  values.configuration.speaker,
                    loadingSpeakerInfo:false,
                    chat: data.getlive.configurationOut.interOption.chat,
                    comments: data.getlive.configurationOut.interOption.comment,
                    likeMention: data.getlive.configurationOut.interOption.like,
                    attachments: data.getlive.configurationOut.multiOption.shareFile,
                    richeMediaDiffusion: data.getlive.configurationOut.multiOption.isRm,
                    videoMode: data.getlive.configurationOut.autoArchLive.visible?"visibleVideo":"notVisibleVideo",
                    theme: data.getlive.configurationOut.themes,
                    themesList:[],
                    tags:data.getlive.configurationOut.tags,
                    listChapter:data.getlive.configurationOut.chapters.map((item)=>{
                        return({
                            id:item.chapterOrder,
                            title:item.chapterTitle
                        })
                    }),
                    diapositivesFileLists:data.getlive.configurationOut.slides.map((item)=>{
                        return({
                            uid: uuidv4(),
                            name:item.replace((item.substring(0,item.lastIndexOf("/")+6)),''),
                            status: 'done',
                            url: item,
                            thumbUrl: item,
                        })
                    }),
                    fileListConfiguration:data.getlive.configurationOut.attachedFiles.map((item)=>{
                           return({
                               uid: uuidv4(),
                               name:item.replace((item.substring(0,item.lastIndexOf("/")+6)),''),
                               status: 'done',
                               url: item,
                               thumbUrl: item,
                           })
                    }),
                    listQuestion: [],
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
                        plan: data.getlive.socialOut.length>0 && data.getlive.socialOut[0].planifications ?data.getlive.socialOut[0].planifications:[{id:0,active: true, startDate: "", endDate: ""}]
                    },
                    {
                        id: 1,
                        idServer:data.getlive.socialOut.length>0?data.getlive.socialOut[1].id:1,
                        title:data.getlive.socialOut.length>0?data.getlive.socialOut[1].title:"",
                        type: "Youtube post",
                        switch: data.getlive.socialOut.length>0?data.getlive.socialOut[1].active:false,
                        link:data.getlive.socialOut.length>0?data.getlive.socialOut[1].link:"",
                        logo: <img src={youtubePost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut.length>0 && data.getlive.socialOut[1].planifications ?data.getlive.socialOut[1].planifications:[{id:1,active: true, startDate: "", endDate: ""}]
                    },
                    {
                        id: 2,
                        idServer:data.getlive.socialOut.length>0?data.getlive.socialOut[2].id:2,
                        title:data.getlive.socialOut.length>0?data.getlive.socialOut[2].title:"",
                        type: "Linkdln post",
                        switch: data.getlive.socialOut.length>0?data.getlive.socialOut[2].active:false,
                        link:data.getlive.socialOut.length>0?data.getlive.socialOut[2].link:"",
                        logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut.length>0 &&  data.getlive.socialOut[2].planifications ?data.getlive.socialOut[2].planifications:[{id:2,active: true, startDate: "", endDate: ""}]
                    },
                ]
            }));
            dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:true}))

        }
    })


    return ({
        CreateLive,
        UpdateLive,
        generateSecuredPassword,
        loading_securedPassword,
        data_securedPassword,
        themesDisplayQueryAction,
        idLive,
        getLiveData
    })
}

