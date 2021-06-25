

//******************** general information actions***************//

export function setContactClientOnchange(e){

    return{
        type: "SET_ContactClientOnchange",
        payload:e,
    }
}

//*******************Empty Input Contact Client*******************//

export function setEmptyContactInput(e){
    return{
        type:"SET_EmptyContactInput",
        payload:e
    }
}

//*********************Loading Button Envoie Contact ********************//

export function setLoadingEnvoieMail(e){

    return{
        type:"SET_LoadingEnvoieMail",
        payload:e
    }
}