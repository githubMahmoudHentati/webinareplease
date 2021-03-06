
import {useDispatch, useSelector} from "react-redux";

import {setSignUpConstraintDataOnchange, setSignUpOnchange} from "../store/signUpAction";
import {GraphQLFetchData} from "./graphQLFetchData";


export  const HooksSignUp=()=> {
    const dispatch = useDispatch()
    const valuesSignUp = useSelector((state) => state.SignUpReducer)
    const valuesCard = useSelector((state) => state.PackagePayementReducer.packagePayement.activeCard)// reducer PackagePayement
    const {CreateAccount , CREATECUSTOMER , CREATESUBSCRIPTIONCustomer , CREATEPayementintent}=GraphQLFetchData(valuesSignUp , valuesCard)

//******************generalInformation************************//
    const signUpOnChange = (event) => {
        dispatch(setSignUpOnchange({
            SignUpNameChange: event.target.name,
            SignUpValueChange: event.target.value
        }));
        dispatch(setSignUpConstraintDataOnchange({
            constraintDataNameChange: "signUpError",
            constraintDataValueChange: false
        }))
        if (valuesSignUp.constraintData.isMailValid===true)
        {
            document.documentElement.style.setProperty('--inputErrorForm', 'rgba(0 , 0 , 0 , 0.15)');
            document.documentElement.style.setProperty('--inputBorderErrorForm', '#40a9ff');
        }
    };

    const handleChangePhone = (val) => {
        dispatch(setSignUpOnchange({
            SignUpNameChange: 'phone',
            SignUpValueChange: val
        }));
     
    };

    const SignUpOnChangeButton = (event) => {
        document.documentElement.style.setProperty('--box-signup', "#d9d9d9")
        dispatch(setSignUpConstraintDataOnchange({constraintDataNameChange:event.target.value, constraintDataValueChange:event.target.checked}));
    };

    const signUpOnChangeSelect = (value,action) => {
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
        handleChangePhone,
        signUpOnChangeSelect,
        valuesSignUp,
        handleSubmitSignUp,
        SignUpOnChangeButton
    })
}