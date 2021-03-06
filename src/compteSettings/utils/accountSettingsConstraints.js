
export const AccountSettingsConstraints = ()=>{


    const generalInformation = () => {
        return (
            {
                vignette:"",
                firstName: "",
                LastName: "",
                email: "",
                city: "",
                adresse:"",
                numberPerson:"",
                postalCode:"",
                phone:"",
                society:"",
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
            isMailValid:true,
            colorStickyBar: "RGBA(0, 0, 0, 0.04)"
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