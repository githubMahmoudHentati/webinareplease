
export function setAccountSetting(e){

    return{
        type: "SET_AccountMenu",
        payload:e,
    }

}

export function setDirectSetting(e){

    return{
        type: "SET_DirectMenu",
        payload:e,
    }

}

export function setDarkMode(e){
    return{
        type:"SET_DarkMode",
        payload:e
    }
}



