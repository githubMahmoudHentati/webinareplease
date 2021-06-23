

//******************** general information actions***************//

        export function setGeneralInformationOnchange(e){

            return{
                type: "SET_GeneralInformationOnchange",
                payload:e,
            }
        }

//*******************Subscription actions*******************//

        export function setSubscriptionOnchange(e){
            return{
                type:"SET_SubscriptionOnchange",
                payload:e
            }
        }

//*******************Bills actions*******************//
        export function setBillsOnchange(e){
            return{
                type:"SET_BillsOnchange",
                payload:e
            }
        }

//*******************Fetching Data actions*******************//

export function setAccountSetting(e){
            return{
                type:"SET_AccountSetting",
                payload:e
            }
        }

//*******************Constraint Data actions*******************//

export function setConstraintDataOnchange(e){
            return{
                type:"SET_ConstraintDataOnchange",
                payload:e
            }
        }

//*******************Update Password Account*******************//

export function setSecurityAccountPassword(e){
    return{
        type:"SET_SecurityAccountPassword",
        payload:e
    }
}

//*******************Empty Input Password*******************//

export function setEmptyPasswordInput(e){
    return{
        type:"SET_EmptyPasswordInput",
        payload:e
    }
}







