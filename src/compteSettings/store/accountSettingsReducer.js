import {AccountSettingsConstraints} from "../utils/accountSettingsConstraints";

const {generalInformation,subscription,bills,constraintData} = AccountSettingsConstraints()

const AccountSettingsInitialState = {

    generalInformation: generalInformation(),

    subscription: subscription(),

    bills : bills(),

    constraintData :constraintData()

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

        case "SET_BillsOnchange":
            const {billsNameChange,billsValueChange}=action.payload
            const billsOnOnchangeObj = {...state.bills,[billsNameChange]: billsValueChange}
            return{
                ...state,
                subscription:billsOnOnchangeObj
            }

        case "SET_AccountSetting":
            const {generalInformation,subscription,bills}=action.payload.dataUserInfo
            return{
                ...state,
                generalInformation,subscription,bills
            }

        case "SET_ConstraintDataOnchange":
            const {constraintDataNameChange,constraintDataValueChange}=action.payload
            const constraintDataOnOnchangeObj = {...state.subscription,[constraintDataNameChange]: constraintDataValueChange}
            return{
                ...state,
                constraintData:constraintDataOnOnchangeObj
            }



        default:{
            return state
        }

    }
}
