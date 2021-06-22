import React, { useState,useEffect,useRef } from 'react';

export const ConnexionConstraints = ()=>{

    const connexion = () => {
        return (
            {
               name:"",
                password:""
            }
        )
    }

    return({
        connexion,
    })

}