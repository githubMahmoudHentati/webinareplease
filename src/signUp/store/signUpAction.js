

//******************** general information actions***************//

        export function setSignUpOnchange(e){

            return{
                type: "SET_SignUpOnchange",
                payload:e,
            }
        }

//*******************Constraint Data actions*******************//

        export function setSignUpConstraintDataOnchange(e){
            return{
                type:"SET_SignUpConstraintDataOnchange",
                payload:e
            }
        }


//*******************constSubscription Data actions*******************//

export function setConstSubscription(e){
    return{
        type:"SET_ConstSubscriptionOnchange",
        payload:e
    }
}








