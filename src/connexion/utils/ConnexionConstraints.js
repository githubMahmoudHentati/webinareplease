
export const ConnexionConstraints = ()=>{

    const connexion = () => {
        return (
            {
                username:"",
                password:""
            }
        )
    }
    const constraintData =()=>{
        return({
            loadingConnexion:false,
            connexionError:false,
            isRememberMe:false
        })
    }

    return({
        connexion,
        constraintData
    })

}