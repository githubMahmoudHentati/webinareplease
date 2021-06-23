import React, { useState,useEffect,useRef } from 'react';

export const AccountSettingsConstraints = ()=>{

    const generalInformation = () => {
        return (
            {
                avatar:"",
                firstName: "",
                LastName: "",
                email: "",
                city: "",
                address:"",
                numberPerson:"",
                postalCode:"",
                phone:"",
            }
        )
    }

    const subscription = () => {
        return (
            {
                subscriptionType:"",
                subscriptionAmount:"",
                subscriptionMode:"",
                usedStorage: "",
                diffusionDuration: "",
                paymentMode:"",
            }
        )
    }
    const bills = () => {
        return (
            [
                {
                    key: '',
                    bill: '',
                    issuedTime: '',
                    entitled: '',
                    amount: "",
                    status: "",
                    payment: ""
                },
            ]
        )
    }
    const constraintData =()=>{
        return({
            avatarLoading :false,
            loadingGeneralInformation:true
        })
    }

    return({
        generalInformation,
        subscription,
        bills,
        constraintData
    })

}