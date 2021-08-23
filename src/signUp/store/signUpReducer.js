import {SignUpConstraints} from "../utils/signUpConstraints";

const {signUp,constraintData,constSubscription} = SignUpConstraints()

const SignUpInitialState = {

    signUp: signUp(),
    constraintData:constraintData(),
    constSubscription:constSubscription()

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
        case "SET_ConstSubscriptionOnchange":
            const {ConstSubscriptionOnchangeNameChange,ConstSubscriptionOnchangeValueChange}=action.payload
            const ConstSubscriptionOnchangeOnOnchangeObj = {...state.constSubscription,[ConstSubscriptionOnchangeNameChange]: ConstSubscriptionOnchangeValueChange}
            return{
                ...state,
                constSubscription:ConstSubscriptionOnchangeOnOnchangeObj
            }

        default:{
            return state
        }

    }
}
