
export const ResetPasswordConstraints = ()=>{

    const resetPassword = () => {
        return (
            {
                newPassword:"",
                confirmPassword:""
            }
        )
    }
    const constraintData =()=>{
        return({
            loadingResetPassword:false,
            passwordSent:false,
            tokenInvalid:false,
            tokenExpired:false
        })
    }

    return({
        resetPassword,
        constraintData
    })

}