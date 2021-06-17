import {ContactClientConstraints} from "../utils/ContactClientConstraints";

const {ContactClient} = ContactClientConstraints()

const ContactClientInitialState = {

    contactClient: ContactClient(),

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

        default:{
            return state
        }

    }
}