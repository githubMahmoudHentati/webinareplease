import {AccountSettingsConstraints} from "../utils/accountSettingsConstraints";

const {generalInformation,subscription,bills,constraintData,securityAccount , loadingUpdatePassword} = AccountSettingsConstraints()

const AccountSettingsInitialState = {

    generalInformation: generalInformation(),

    subscription: subscription(),

    bills : bills(),

    constraintData :constraintData(),

    securityAccount:securityAccount(),

    loadingUpdatePassword : loadingUpdatePassword()

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
            const constraintDataOnOnchangeObj = {...state.constraintData,[constraintDataNameChange]: constraintDataValueChange}
            return{
                ...state,
                constraintData:constraintDataOnOnchangeObj
            }

        //******** Security Account************//

        case "SET_SecurityAccountPassword":
            const {securityAccountNameChange,securityAccountValueChange}=action.payload
            const securityAccountOnchangeObj = {...state.securityAccount,[securityAccountNameChange]: securityAccountValueChange}
            return{
                ...state,
                securityAccount:securityAccountOnchangeObj
            }
        //******** Empty Input Password ************//

        case "SET_EmptyPasswordInput":
            return{
                ...state,
                securityAccount:action.payload
            }
            //*********************** Update Password ***********************//
        case "SET_LoadingUpdatePassword":
            const {LoadingUpdatePasswordNameChange,LoadingUpdatePasswordValueChange}=action.payload
            const LoadingUpdatePasswordOnchangeObj = {...state.loadingUpdatePassword,[LoadingUpdatePasswordNameChange]: LoadingUpdatePasswordValueChange}
            return{
                ...state,
                loadingUpdatePassword:LoadingUpdatePasswordOnchangeObj
            }


        default:{
            return state
        }

    }
}
