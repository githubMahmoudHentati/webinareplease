import React, { useState,useEffect,useRef } from 'react';

export const SignUpConstraints = ()=>{

    const signUp = () => {
        return (
            {
                firstName: "",
                lastName: "",
                username:"xxxxx",
                email: "",
                phone:"",
                city: "",
                password:"",
                address:"",
                numberPerson:"",
                postalCode:"",
                society:"",
                subscriptionId:0
            }
        )
    }
    const constraintData =()=>{
        return({
            loadingSignUp:false,
            signUpError:false,
            isMailValid:true,
            current:0
        })
    }


    return({
        constraintData,
        signUp,
    })

}