import React, { useState,useEffect,useRef } from 'react';

export const AccountSettingsConstraints = ()=>{

    const generalInformation = () => {
        return (
            {
                avatar:"",
                name: "Mahmoud",
                lastName: "Hentati",
                email: "mahmoud.henteti@sastec-group.com",
                city: "Sfax",
                address:"bebe bhaare",
                employeeNumberID:"2",
                zipCode:"3000",
                phone:"56249943",
                previousPassword:"00001111",
                newPassword:"00002222",
            }
        )
    }

    const subscription = () => {
        return (
            {
                subscriptionType:"Forfait Pro",
                subscriptionAmount:"99EUR/Mois",
                subscriptionMode:"ENgagement et paiement mensuel",
                usedStorage: "500 Mo/1Go",
                diffusionDuration: "20 mins/100min",
                paymentMode:"Paiement avec stripe",
                subscriptionBillList:[
                    {
                        key: '1',
                        bill: '102402',
                        issuedTime: '01/01/2021',
                        entitled: 'Forfait pro',
                        amount: "99$",
                        status: "Nom Non  traité",
                        payment:""
                    },
                    {
                        key: '1',
                        bill: '102402',
                        issuedTime: '01/01/2021',
                        entitled: 'Forfait pro',
                        amount: "99$",
                        status: "Nom Non  traité",
                        payment:""
                    },
                    {
                        key: '1',
                        bill: '102402',
                        issuedTime: '01/01/2021',
                        entitled: 'Forfait pro',
                        amount: "99$",
                        status: "Nom Non  traité",
                        payment:""
                    },
                ]
            }
        )
    }

    return({
        generalInformation,
        subscription,
    })

}