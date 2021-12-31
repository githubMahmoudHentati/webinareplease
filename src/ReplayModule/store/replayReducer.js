import {ReplayConstraints}  from "../utils/replayConstraints"

const {Login} = ReplayConstraints()

const ReplayINITIALSTATE = {
    Login : Login(),
}

export const ReplayReducer = (state=ReplayINITIALSTATE , action)=>{

    switch (action.type){

        case "SET_ReplayInputs" :
            const {ReplayInputNameChange,RepalyInputValueChange}=action.payload
            const LoginOnchangeObj = {...state.Login,[ReplayInputNameChange]: RepalyInputValueChange}
            return {
                ...state,
                Login:LoginOnchangeObj
            }
        default:{
            return state
        }
    }

}