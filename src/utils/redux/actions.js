
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


export function setAppSetLogin(e){
    return{
        type:"SET_AppSetLogin",
        payload:e
    }
}

export function setAppSetLogout(){
    return{
        type:"SET_AppSetLogout",
    }
}

export function setSideMenu(e){
    return{
        type:"SET_SideMenu",
        payload:e
    }
}



