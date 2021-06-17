import React, { useState,useEffect,useRef } from 'react';

export const SignUpConstraints = ()=>{

    const signUp = () => {
        return (
            {
                name: "",
                lastName: "",
                email: "",
                phone:"",
                city: "",
                password:"",
                address:"",
                employeeNumberID:"",
                zipCode:"",
                society:"",
                employeeNumber:"2"
            }
        )
    }

    return({
        signUp,
    })

}