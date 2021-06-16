import {AccountSettingsConstraints} from "../utils/accountSettingsConstraints";

const {generalInformation,subscription} = AccountSettingsConstraints()

const AccountSettingsInitialState = {

    generalInformation: generalInformation(),

    subscription: subscription(),

}

export const  AccountSettingsReducer=(state=AccountSettingsInitialState , action)=>{

    switch (action.type){

        //******** general reducer case************//

        case "SET_GeneralInformationOnchange":
            const {generalInformationNameChange,generalInformationValueChange}=action.payload
            const generalInformationOnOnchangeObj = {...state.generalInformation,[generalInformationNameChange]: generalInformationValueChange}
            return{
                ...state,
                generalInformation:generalInformationOnOnchangeObj
            }

        //******** configuration reducer case************//

        case "SET_SubscriptionOnchange":
            const {subscriptionNameChange,subscriptionValueChange}=action.payload
            const subscriptionOnOnchangeObj = {...state.subscription,[subscriptionNameChange]: subscriptionValueChange}
            return{
                ...state,
                subscription:subscriptionOnOnchangeObj
            }


        default:{
            return state
        }

    }
}
