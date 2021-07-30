import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setConstraintDataOnchange,
    setGeneralInformationOnchange
} from "../../compteSettings/store/accountSettingsAction";
import {SignUpReducer} from "../store/signUpReducer";
import {setSignUpConstraintDataOnchange, setSignUpOnchange} from "../store/signUpAction";
import {GraphQLFetchData} from "./graphQLFetchData";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";

export  const HooksSignUp=()=> {
    const dispatch = useDispatch()
    const valuesSignUp = useSelector((state) => state.SignUpReducer)
    const valuesCard = useSelector((state) => state.PackagePayementReducer.packagePayement.activeCard)// reducer PackagePayement
    const {CreateAccount , CREATECUSTOMER , CREATESUBSCRIPTIONCustomer , CREATEPayementintent}=GraphQLFetchData(valuesSignUp , valuesCard)

//******************generalInformation************************//
    const signUpOnChange = (event) => {
        console.log("event", event.target.value, event.target.name)
        dispatch(setSignUpOnchange({
            SignUpNameChange: event.target.name,
            SignUpValueChange: event.target.value
        }));
        dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "signUpError",
            constraintDataValueChange: false
        }))
        console.log("hooks",valuesSignUp.constraintData.isMailValid)
        if (valuesSignUp.constraintData.isMailValid===true)
        {
            document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
            document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        }
    };

    const SignUpOnChangeButton = (event) => {
        document.documentElement.style.setProperty('--box-signup', "#d9d9d9")
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:event.target.value, constraintDataValueChange:event.target.checked}));
    };

    const signUpOnChangeSelect = (value,action) => {
        console.log("event",action.name, action.value)
        dispatch(setSignUpOnchange({SignUpNameChange: action.name, SignUpValueChange: action.value}));
    };

    const handleSubmitSignUp = async () => {
        await dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "loadingSignUp",
            constraintDataValueChange: true
        }))
        !valuesSignUp.constraintData.confidentialityOption&&document.documentElement.style.setProperty('--box-signup', "red");
        CreateAccount()

       if(valuesCard === 2){
           CREATECUSTOMER() // Create Customer Stripe mutation

           setTimeout(()=>{
               CREATESUBSCRIPTIONCustomer() // Create Subsricption Stripe mutation
           },2000)
       }else if( valuesCard === 3){
           CREATEPayementintent() // Payement Intent
       }




    }

    return({
        signUpOnChange,
        signUpOnChangeSelect,
        valuesSignUp,
        handleSubmitSignUp,
        SignUpOnChangeButton
    })
}