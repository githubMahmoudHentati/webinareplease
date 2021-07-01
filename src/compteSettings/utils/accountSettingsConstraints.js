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
    const billCount = () =>{
        return(
            {
                billCount:""
            }
        )
    }
    const constraintData =()=>{
        return({
            avatarLoading :false,
            loadingGeneralInformation:true
        })
    }
    const securityAccount = () => {
        return (
            {
                oldPassWord: "",
                newPassWord: "",
            }
        )
    }
    const loadingUpdatePassword = () => {
        return ({
            loadingUpdatePassword : false
        })
    }

    return({
        generalInformation,
        subscription,
        bills,
        billCount,
        constraintData,
        securityAccount,
        loadingUpdatePassword,
    })

}