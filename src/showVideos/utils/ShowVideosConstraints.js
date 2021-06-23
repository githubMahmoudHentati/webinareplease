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
                pageSize:10,
                order:'ascend',
                columnKey:0,
                current:1
            }
        )
    }
    const showVideoConstraintData =()=>{
        return({
            loading:true
        })
    }

    return({
        FilterVideos,
        paginationProps,
        showVideoConstraintData
    })

}