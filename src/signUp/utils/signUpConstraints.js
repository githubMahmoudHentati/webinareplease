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
            }
        )
    }
    const constraintData =()=>{
        return({
            loadingSignUp:false
        })
    }


    return({
        constraintData,
        signUp,
    })

}