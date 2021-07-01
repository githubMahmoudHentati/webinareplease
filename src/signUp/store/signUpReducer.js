import {SignUpConstraints} from "../utils/signUpConstraints";

const {signUp,constraintData} = SignUpConstraints()

const SignUpInitialState = {

    signUp: signUp(),
    constraintData:constraintData()


}

export const  SignUpReducer=(state=SignUpInitialState , action)=>{

    switch (action.type){

        //******** general reducer case************//

        case "SET_SignUpOnchange":
            const {SignUpNameChange,SignUpValueChange}=action.payload
            const SignUpOnOnchangeObj = {...state.signUp,[SignUpNameChange]: SignUpValueChange}
            return{
                ...state,
                signUp:SignUpOnOnchangeObj
            }

        case "SET_SignUpConstraintDataOnchange":
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
