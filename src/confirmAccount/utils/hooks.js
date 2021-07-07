import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setForgetPasswordConstraintDataOnchange,
    setForgetPasswordOnchange
} from "../store/forgetPasswordAction";
import {GraphQLFetchData} from "./graphQLFetchData";
import {ConfirmAccountReducer, ForgetPasswordReducer} from "../store/forgetPasswordReducer";


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