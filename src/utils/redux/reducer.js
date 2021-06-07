
const INITIAL_STATE = {
    accountMenu : 0,
    directMenu : 0,
    DarkMode : false
}

export const  Reducer=(state=INITIAL_STATE , action)=>{

    switch (action.type){
        case "SET_AccountMenu":
            return{
                ...INITIAL_STATE,
                accountMenu: action.payload
            }
        case "SET_DirectMenu":
            return{
                ...INITIAL_STATE,
                accountMenu: action.payload
            }
        case "SET_DarkMode":
            return {
                ...INITIAL_STATE,
                DarkMode: action.payload
            }
        default:{
            return INITIAL_STATE
        }


    }

}

