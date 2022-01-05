import React from 'react';
import fbPost from "../../assets/facebookPost.svg";
import youtubePost from "../../assets/youtubePost.svg";
import linkedinPost from "../../assets/linkedinPost.svg";
import {v4 as uuidv4} from "uuid";
import logo from "../../assets/logo_webinarplease.svg"



export const FormDirectConstraints = ()=>{

    const generals = () => {
        return (
            {
                thumbnail:"",
                fileList:[],
                liveTitle:"",
                liveDescription:"",
                liveAction:false,
                livePlan:{
                    plan: false,
                    startDate:"",
                    duration:"",
                },
                startDate:"",
                startHour:"",
                period:"",
                directAccessMode: "freeAccess",
                liveAccess: false,
                pwd:"",
                liveLink:"https://demo-tv.webtv-solution.com/pearl/live",
                securedPasswordOption:false,
                loadingSecuredPassword:false
            }
        )
    }

    const configuration = () => {
        return (
            {
                directProgram:"",
                notVisibleVideo: false,
                visibleVideo: false,
                modalSpeaker: false,
                switchSpeaker: false,
                liveAutomaticArchiving: false,
                SpeakerList: [],
                addSpeakerList:{},
                speaker: {id: null, name: "", lastName: "", title: "", email: "", logoSpeaker: []},
                loadingSpeakerInfo:false,
                chat:false,
                comments:false,
                likeMention:false,
                attachments:false,
                richeMediaDiffusion:false,
                videoMode: "",
                theme:[],
                themesList:[],
                tags:[],
                fileListConfiguration:[],
                listChapter: [],
                listQuestion: [],
                diapositivesFileLists:[],
                switchLanguages: false,
                languages:[]
            }
        )
    }

    const socialTools = () => {
        return [
            {
                id: 0,
                title:"",
                type: "Facebook post",
                switch: true,
                link:"",
                logo: <img src={fbPost} style={{width: "24px", height: "24px"}} alt={""}/>,
                plan: []
            },
            {
                id: 1,
                type: "Youtube post",
                title:"",
                link:"",
                switch: false,
                logo: <img src={youtubePost} style={{width: "24px", height: "24px"}} alt={""}/>,
                plan: []
            },
            {
                id: 2,
                type: "Linkedlin post",
                title:"",
                link:"",
                switch: false,
                logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}} alt={""}/>,
                plan: []
            },
        ]
    }

     const invitation =()=>{

        return (
            {
                addRules: {
                    afterPrograming: true,
                    beforeWeek: false,
                    beforeDay: false,
                    beforeHour: false,
                    afterSubscription: false,
                    isParticiped: false,
                    notVisualized: false,
                    replay: false
                },
                emails:[],
                emailsGroup:[],
                listMailsGroup:[],
                maxOnlineGuests:0,
                maxOnsiteGuests:0
            }
        )
    }

    const Templates = () => {

        return (
            {
                background2 : "#FFFFFF",
                background3 : "#1890ff",
                background4 : "#FFFFFF",
                primaireColor : "#1890ff",
                texteEmail :"#F2F2F2",
                secondaireColor : "#FFA400",
                LogoValueFileList:[
                    {
                        uid: uuidv4(),
                        name: "logo.png",
                        status: 'done',
                        url: logo,
                        thumbUrl: logo,
                    }
                ],
                imageValueFileList:[]
            }
        )

    }

    const constraintData =()=>{
        return({
            loadingLiveFetchData:false,
            loadingCreateEditLive:false,
            crudOption:"",
            leaveToast:true,
            errorMenuFormStyle:false,
            scrollIntoView: false,
        })
    }

    // const formLive =()=>{
    //     return (
    //             form
    //     )
    // }

    return({
        generals,
        configuration,
        socialTools,
        invitation,
        constraintData,
        Templates
        // formLive
    })

}