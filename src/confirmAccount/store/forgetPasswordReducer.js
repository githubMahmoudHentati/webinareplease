import {ConfirmAccount} from "../utils/confirmAccount";

const {forgetPassword,constraintData} = ConfirmAccount()

const ConnexionInitialState = {

    forgetPassword: forgetPassword(),
    constraintData: constraintData()


}

export const  ForgetPasswordReducer=(state=ConnexionInitialState , action)=>{

    switch (action.type){

        //******** connexion reducer case************//

        case "SET_ForgetPasswordOnchange":
            const {forgetPasswordNameChange,forgetPasswordValueChange}=action.payload
            const forgetPasswordOnOnchangeObj = {...state.forgetPassword,[forgetPasswordNameChange]: forgetPasswordValueChange}
            return{
                ...state,
                forgetPassword:forgetPasswordOnOnchangeObj
            }

        case "SET_ForgetPasswordConstraintDataOnchange":
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
