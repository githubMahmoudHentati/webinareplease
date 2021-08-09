import React, { useState,useEffect,useRef } from 'react';

export const AccountSettingsConstraints = ()=>{

    const generalInformation = () => {
        return (
            {
                vignette:"",
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
            loadingGeneralInformation:true,
            loadingUpdateAccountSetting:false,
            updateAccountSettingError:false,
            isMailValid:true
        })
    }
    const visible=()=>{
        return({
            errorVisibility:false
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
            loadingUpdatePassword : false,
            isMailValid:false
        })
    }
    const paginationAbonnement=()=>{
        return(
            {
                pageSize:10,
                current:1,
            }
        )
    }

    return({
        generalInformation,
        subscription,
        bills,
        billCount,
        constraintData,
        securityAccount,
        loadingUpdatePassword,
        paginationAbonnement,
        visible
    })

}