import {ConfirmAccountContaintes} from "../utils/ConfirmAccountContaintes";

const {constraintData} = ConfirmAccountContaintes()

const confirmAccountInitialState = {

    constraintData: constraintData()


}

export const  ConfirmAccountReducer=(state=confirmAccountInitialState , action)=>{

    switch (action.type){

        //******** ConfirmAccount reducer case************//


        case "SET_ConfirmAccountConstraintDataOnchange":
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
