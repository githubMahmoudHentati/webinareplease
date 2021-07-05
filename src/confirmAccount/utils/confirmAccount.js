import React from 'react';

export const ConfirmAccount = ()=>{

    const forgetPassword = () => {
        return (
            {
                email:"",
            }
        )
    }
    const constraintData =()=>{
        return({
            loadingForgetPassword:false,
            passwordSent:false
        })
    }

    return({
        forgetPassword,
        constraintData
    })

}