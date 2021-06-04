
const INITIAL_STATE = {
    accountMenu : 0,

}

export const  Reducer=(state=INITIAL_STATE , action)=>{

    switch (action.type){
        case "SET_AccountMenu":
            return{
                ...INITIAL_STATE,
                accountMenu: action.payload
            }

        default:{
            return INITIAL_STATE
        }


    }

}

