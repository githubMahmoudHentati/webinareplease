import {PackagePayementConstraints} from "../utils/PackagePayementConstraints";

const {ActiveCard , InputPackagePayement}= PackagePayementConstraints()

const PackagePayementInitialState = {
    packagePayement: ActiveCard(),
    packagePayementInput : InputPackagePayement()
}

export const  PackagePayementReducer=(state=PackagePayementInitialState , action)=>{

    switch (action.type){

        //******** general reducer case************//

        case "SET_PackagePayement":
            const {PackagePayementName,PackagePayementValue}=action.payload
            const PackagePayementObj = {...state.packagePayement,[PackagePayementName]: PackagePayementValue}
            return{
                ...state,
                packagePayement:PackagePayementObj
            }
        case "SET_PackagePayementInput":
            const {PackagePayementInputName,PackagePayementInputValue}=action.payload
            const PackagePayementInputObj = {...state.packagePayementInput,[PackagePayementInputName]: PackagePayementInputValue}
            return{
                ...state,
                packagePayementInput:PackagePayementInputObj
            }

        default:{
            return state
        }
    }
}