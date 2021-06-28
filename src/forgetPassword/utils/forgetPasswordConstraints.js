import React from 'react';

export const ForgetPasswordConstraints = ()=>{

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