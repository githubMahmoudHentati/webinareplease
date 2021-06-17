import {ConnexionConstraints} from "../utils/ConnexionConstraints";

const {connexion} = ConnexionConstraints()

const ConnexionInitialState = {

    connexion: connexion(),


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

        default:{
            return state
        }

    }
}
