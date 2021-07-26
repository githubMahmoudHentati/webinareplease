import React, { useState,useEffect,useRef } from 'react';

export const PackagePayementConstraints = () =>{

    const ActiveCard = () =>{

        return(
            {
                activeCard:0,
                checkedRadioButtonZero:false,
                checkedRadioButtonOne:false,
                checkedRadioButtonTwo:false,
                packFree:'Gratuit',
                packPro:'99',
                packASYouGo:'12',
                packStripe:'',
            }
        )
    }
    const InputPackagePayement = () =>{
        return(
            {
                email:"",
                carddetails:"",
                nom:"",
                pays:"",
                postalCode:""
            }
        )
    }

    return({
        ActiveCard,
        InputPackagePayement
    })
}