import {ConnexionConstraints} from "../utils/ConnexionConstraints";

const {connexion,constraintData} = ConnexionConstraints()

const ConnexionInitialState = {

    connexion: connexion(),
    constraintData: constraintData()


}

export const  ConnexionReducer=(state=ConnexionInitialState , action)=>{

    switch (action.type){

        //******** connexion reducer case************//

        case "SET_ConnexionOnchange":
            const {ConnexionNameChange,ConnexionValueChange}=action.payload
            const ConnexionOnOnchangeObj = {...state.connexion,[ConnexionNameChange]: ConnexionValueChange}
            return{
                ...state,
                connexion:ConnexionOnOnchangeObj
            }

        case "SET_ConnexionCredential":
            return{
                ...state,
                connexion:action.payload
            }

        case "SET_ConnexionConstraintDataOnchange":
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
