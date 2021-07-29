
const INITIAL_STATE = {
    accountMenu : 0,
    directMenu : 0,
    DarkMode : false,
    iframeStyle:{height:"20%"},
    appState: { loggedIn: false },
    gqlError: { msg: '' },
    authToken : '',
    activeSideMenu:false,
    lang:localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng"):"fr"
}

export const  Reducer=(state=INITIAL_STATE , action)=>{

    switch (action.type){
        case "SET_AccountMenu":
            return{
                ...state,
                accountMenu: action.payload
            }
        case "SET_DirectMenu":
            return{
                ...state,
                directMenu: action.payload
            }
        case "SET_DarkMode":
            return {
                ...state,
                DarkMode: action.payload
            }
        case "SET_AppSetLogin":
            return {
                ...state,
                appState: { loggedIn: true },
                authToken : action.payload
            }
        case "SET_AppSetLogout":
            return {
                ...state,
                appState: { loggedIn: false },
                authToken : ''
            }
        case "CHANGE_LANG_FR":
            return {...state,lang:"fr"}
        case "CHANGE_LANG_EN":
            return {...state,lang:"en"}

        default:{
            return state
        }


    }

}

