import {ResetPasswordConstraints} from "../utils/resetPasswordConstraints";

const {resetPassword,constraintData} = ResetPasswordConstraints()

const ResetInitialState = {

    resetPassword: resetPassword(),
    constraintData: constraintData()


}

export const  ResetPasswordReducer=(state=ResetInitialState , action)=>{

    switch (action.type){

        //******** connexion reducer case************//

        case "SET_ResetPasswordOnchange":
            const {resetPasswordNameChange,resetPasswordValueChange}=action.payload
            const resetPasswordOnOnchangeObj = {...state.resetPassword,[resetPasswordNameChange]: resetPasswordValueChange}
            return{
                ...state,
                resetPassword:resetPasswordOnOnchangeObj
            }

        case "SET_ResetPasswordConstraintDataOnchange":
            const {constraintDataNameChange,constraintDataValueChange}=action.payload
            const constraintDataOnOnchangeObj = {...state.constraintData,[constraintDataNameChange]: constraintDataValueChange}
            return{
                ...state,
                constraintData:constraintDataOnOnchangeObj
            }

        default:{
            return state
        }

    }
}
