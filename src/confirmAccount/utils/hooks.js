import {useSelector} from "react-redux";
import {GraphQLFetchData} from "./graphQLFetchData";


export  const Hooks=()=> {
    const values = useSelector((state) => state.ConfirmAccountReducer)
    const {ReSendConfirmMailAction} = GraphQLFetchData(values)

//******************connexion************************//


    const ResendConfirmAccount =()=>{
        values.constraintData.leaveToast&&ReSendConfirmMailAction()
    }

    return({
        ResendConfirmAccount,
        values
    })
}