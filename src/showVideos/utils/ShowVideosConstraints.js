import React, { useState,useEffect,useRef } from 'react';

export const ShowVideosList = ()=>{

    const FilterVideos = () => {
        return (
            {
                search:"",
                periode:"",
                date:"",
                contributeur:"",
                type:"tous"
            }
        )
    }
    const paginationProps=()=>{
        return(
            {
                order:'ascend',
                pageSize:10,
                columnKey:0,
                current:1,
                id:[0],
                idLive:0
            }
        )
    }
    const showVideoConstraintData =()=>{
        return({
            loading:true,
            loadingLiveFetchData:false,
        })
    }
    const showDivsConditions = () =>{
        return({
            elementSelected: 0,
            clickDeleteIcon:true,
            showElementSelected:false,
            rubDeleteItems:false
        })
    }
    const loadingDeleteShowVideo =()=>{
        return({
            loadingDelete:false
        })
    }

    const valuesInfosLives = () => {
        return({
            visible:false,
            inputUrlDiffusion:"",
            streamName:"",
            idLive:"",
            pwdLive:""
        })
    }

    return({
        FilterVideos,
        paginationProps,
        showVideoConstraintData,
        showDivsConditions,
        loadingDeleteShowVideo,
        valuesInfosLives
    })

}