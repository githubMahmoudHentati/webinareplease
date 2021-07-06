import React, { useState,useEffect,useRef } from 'react';
import fbPost from "../../assets/facebookPost.svg";
import youtubePost from "../../assets/youtubePost.svg";
import linkedinPost from "../../assets/linkedinPost.svg";
import {Form} from "antd";

export const FormDirectConstraints = ()=>{

    const generals = () => {
        return (
            {
                fileList:"",
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
                    logoSpeaker: {thumbUrl: "https://yamsoti.com/wp-content/uploads/2020/01/avatar-rectangle.png"}
                }],
                speaker: {id: null, name: "", lastName: "", title: "", email: "", logoSpeaker: {}},
                LiveInteractiveOption:[],
                chat:false,
                comments:false,
                likeMention:false,
                attachments:false,
                richeMediaDiffusion:false,
                videoMode: "",
                theme:"",
                tags:[]
            }
        )
    }

    const socialTools = () => {
        return [
            {
                id: 0,
                type: "Facebook post",
                switch: true,
                logo: <img src={fbPost} style={{width: "24px", height: "24px"}}/>,
                plan: [{active: true, startDate: "", endDate: ""}]
            },
            {
                id: 1,
                type: "Youtube post",
                switch: false,
                logo: <img src={youtubePost} style={{width: "24px", height: "24px"}}/>,
                plan: [{active: true, startDate: "", endDate: ""}]
            },
            {
                id: 2,
                type: "Linkedlin post",
                switch: false,
                logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}}/>,
                plan: [{active: true, startDate: "", endDate: ""}]
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
        // formLive
    })

}