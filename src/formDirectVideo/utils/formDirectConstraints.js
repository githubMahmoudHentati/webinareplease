import React, { useState,useEffect,useRef } from 'react';
import fbPost from "../../assets/facebookPost.svg";
import youtubePost from "../../assets/youtubePost.svg";
import linkedinPost from "../../assets/linkedinPost.svg";
import {Form} from "antd";

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
                liveSharedLink:"",
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
                SpeakerList: [{
                    id: 0,
                    name: "Nom ",
                    lastName: 'Prénom',
                    title: "Titre",
                    email: "",
                    logoSpeaker: "https://yamsoti.com/wp-content/uploads/2020/01/avatar-rectangle.png"
                }],
                addSpeakerList:{},
                speaker: {id: null, name: "", lastName: "", title: "", email: "", logoSpeaker: []},
                loadingSpeakerInfo:false,
                chat:false,
                comments:false,
                likeMention:false,
                attachments:false,
                richeMediaDiffusion:false,
                videoMode: "",
                theme:"",
                themesList:[],
                tags:[],
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
                logo: <img src={fbPost} style={{width: "24px", height: "24px"}}/>,
                plan: [{id:0,active: true, startDate: "", endDate: ""}]
            },
            {
                id: 1,
                type: "Youtube post",
                title:"",
                link:"",
                switch: false,
                logo: <img src={youtubePost} style={{width: "24px", height: "24px"}}/>,
                plan: [{id:1,active: true, startDate: "", endDate: ""}]
            },
            {
                id: 2,
                type: "Linkedlin post",
                title:"",
                link:"",
                switch: false,
                logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}}/>,
                plan: [{id:2,active: true, startDate: "", endDate: ""}]
            },
        ]
    }

     const invitation =()=>{

        return (
            {
                addRules: {
                    visibleInscription: false,
                    visibleRappelJ7: false,
                    visibleRappelJ1: false,
                    visibleRappelH1: false,
                    visibleInscription2: false,
                    visibleRappelJ72: false,
                    visibleRappelJ12: false,
                    visibleRappelH12: false
                },
                emails:[],
                emailsGroup:[]
            }
        )
    }

    const constraintData =()=>{
        return({
            loadingLiveFetchData:false
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
        // formLive
    })

}