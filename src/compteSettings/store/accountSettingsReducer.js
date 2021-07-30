import {AccountSettingsConstraints} from "../utils/accountSettingsConstraints";

const {
    generalInformation,
    subscription,
    bills,
    billCount,
    constraintData,
    securityAccount,
    loadingUpdatePassword,
    paginationAbonnement
} = AccountSettingsConstraints()

const AccountSettingsInitialState = {

    generalInformation: generalInformation(),

    subscription: subscription(),

    bills: bills(),

    billsCount: billCount(),

    constraintData: constraintData(),

    securityAccount: securityAccount(),

    loadingUpdatePassword: loadingUpdatePassword(),

    paginationAbonnement: paginationAbonnement()

}

export const AccountSettingsReducer = (state = AccountSettingsInitialState, action) => {

    switch (action.type) {

        //******** general reducer case************//

        case "SET_GeneralInformationOnchange":
            const {generalInformationNameChange, generalInformationValueChange} = action.payload
            const generalInformationOnOnchangeObj = {
                ...state.generalInformation,
                [generalInformationNameChange]: generalInformationValueChange
            }
            return {
                ...state,
                generalInformation: generalInformationOnOnchangeObj
            }

        //******** configuration reducer case************//

        case "SET_SubscriptionOnchange":
            const {subscriptionNameChange, subscriptionValueChange} = action.payload
            const subscriptionOnOnchangeObj = {...state.subscription, [subscriptionNameChange]: subscriptionValueChange}
            return {
                ...state,
                subscription: subscriptionOnOnchangeObj
            }

        case "SET_BillsOnchange":
            const {billsNameChange, billsValueChange} = action.payload
            const billsOnOnchangeObj = {...state.bills, [billsNameChange]: billsValueChange}
            return {
                ...state,
                subscription: billsOnOnchangeObj
            }
        case "SET_BillCountOnchange":
            const {billCountNameChange, billCountValueChange} = action.payload
            const billCountOnOnchangeObj = {...state.billsCount, [billCountNameChange]: billCountValueChange}
            return {
                ...state,
                billsCount: billCountOnOnchangeObj
            }

        case "SET_AccountSetting":
            const {generalInformation, subscription, bills, billCount} = action.payload.dataUserInfo
            return {
                ...state,
                generalInformation, subscription, bills, billCount
            }

        case "SET_ConstraintDataOnchange":
            const {constraintDataNameChange, constraintDataValueChange} = action.payload
            const constraintDataOnOnchangeObj = {
                ...state.constraintData,
                [constraintDataNameChange]: constraintDataValueChange
            }
            return {
                ...state,
                constraintData: constraintDataOnOnchangeObj
            }

        //******** Security Account************//

        case "SET_SecurityAccountPassword":
            const {securityAccountNameChange, securityAccountValueChange} = action.payload
            const securityAccountOnchangeObj = {
                ...state.securityAccount,
                [securityAccountNameChange]: securityAccountValueChange
            }
            return {
                ...state,
                securityAccount: securityAccountOnchangeObj
            }
        //******** Empty Input Password ************//

        case "SET_EmptyPasswordInput":
            return {
                ...state,
                securityAccount: action.payload
            }
        //*********************** Update Password ***********************//
        case "SET_LoadingUpdatePassword":
            const {LoadingUpdatePasswordNameChange, LoadingUpdatePasswordValueChange} = action.payload
            const LoadingUpdatePasswordOnchangeObj = {
                ...state.loadingUpdatePassword,
                [LoadingUpdatePasswordNameChange]: LoadingUpdatePasswordValueChange
            }
            return {
                ...state,
                loadingUpdatePassword: LoadingUpdatePasswordOnchangeObj
            }

        //*********************** Pagination P ***********************//
        case "SET_PaginationAbonnement":
            const {PaginationAbonnementNameChange, PaginationAbonnementValueChange} = action.payload
            const PaginationAbonnementOnchangeObj = {
                ...state.paginationAbonnement,
                [PaginationAbonnementNameChange]: PaginationAbonnementValueChange
            }
            return {
                ...state,
                paginationAbonnement: PaginationAbonnementOnchangeObj
            }
            

        default: {
            return state
        }

    }
}
