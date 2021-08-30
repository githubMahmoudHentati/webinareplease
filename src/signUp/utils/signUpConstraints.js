
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
                adresse:"",
                numberPerson:1,
                postalCode:"",
                society:"",
                subscriptionId:0
            }
        )
    }
    const constraintData =()=>{
        return({
            confidentialityOption:false,
            loadingSignUp:false,
            signUpError:false,
            isMailValid:true,
            current:0
        })
    }
    const constSubscription = () =>{
        return({
            customerId:"",
            priceId:"",
            clientSecret:"",
            subscriptionId:""
        })
    }


    return({
        constraintData,
        signUp,
        constSubscription
    })

}