import React, { useState,useEffect,useRef } from 'react';

export const ContactClientConstraints = ()=>{

    const ContactClient = () => {
        return (
            {
                name: "",
                lastName: "",
                email: "",
                message:"",
            }
        )
    }

    return({
        ContactClient,
    })

}