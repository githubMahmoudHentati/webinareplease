import {ContactClientConstraints} from "../utils/ContactClientConstraints";

const {ContactClient , LoadingEnvoiMail} = ContactClientConstraints()

const ContactClientInitialState = {
    contactClient: ContactClient(),
     loading : LoadingEnvoiMail(),
}

export const  ContactClientReducer=(state=ContactClientInitialState , action)=>{

    switch (action.type){

        //******** general reducer case************//

        case "SET_ContactClientOnchange":
            const {ContactClientNameChange,ContactClientValueChange}=action.payload
            const ContactClientOnOnchangeObj = {...state.contactClient,[ContactClientNameChange]: ContactClientValueChange}
            return{
                ...state,
                contactClient:ContactClientOnOnchangeObj
            }
        case "SET_EmptyContactInput":
            return{
                ...state,
                contactClient:action.payload
            }
        case "SET_LoadingEnvoieMail":
            const {loadingEnvoiMailNameChange,loadingEnvoiMailValueChange}=action.payload
            const loadingEnvoiMailOnOnchangeObj = {...state.loading,[loadingEnvoiMailNameChange]: loadingEnvoiMailValueChange}
            return{
                ...state,
                loading:loadingEnvoiMailOnOnchangeObj
            }

        default:{
            return state
        }

    }
}