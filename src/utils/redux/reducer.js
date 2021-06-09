
const INITIAL_STATE = {
    accountMenu : 0,
    directMenu : 0,
    DarkMode : false
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
                accountMenu: action.payload
            }
        case "SET_DarkMode":
            return {
                ...state,
                DarkMode: action.payload
            }
        default:{
            return state
        }


    }

}

