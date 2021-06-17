import React, { useState,useEffect,useRef } from 'react';

export const FilterVideosList = ()=>{

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

    return({
        FilterVideos,
    })

}