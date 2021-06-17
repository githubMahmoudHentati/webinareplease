import {SignUpConstraints} from "../utils/signUpConstraints";

const {signUp} = SignUpConstraints()

const SignUpInitialState = {

    signUp: signUp(),

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

        default:{
            return state
        }

    }
}
