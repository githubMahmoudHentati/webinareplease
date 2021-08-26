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
    const LoadingEnvoiMail = () => {
        return ({
            loading : false
        })
    }

    return({
        ContactClient,
        LoadingEnvoiMail
    })

}