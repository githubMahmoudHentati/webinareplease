import {useMutation} from "@apollo/client";
import {graphQL_shema} from "./graphQL";
import {useHistory} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setConstSubscription, setSignUpConstraintDataOnchange} from "../store/signUpAction";



export const GraphQLFetchData = (valuesSignUp , valuesCard) => {

    const valuesPrices = useSelector((state) => state.PackagePayementReducer.packagePayement)// reducer PackagePayement
    const history = useHistory()
    const dispatch = useDispatch()
    const [CreateAccount] = useMutation(graphQL_shema().SignUp, {
        variables: {
            input: valuesSignUp.signUp
        },
        onCompleted: async (data) => {
            if (data.addUser.code === 200) {


                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "signUpError",
                    constraintDataValueChange: false
                }))
                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "successSignUp",
                    constraintDataValueChange: true
                }))

                if (valuesSignUp.signUp.subscriptionId === 1) {

                    history.push("/ConfirmAccount")

                } else
                    dispatch(setSignUpConstraintDataOnchange({
                        constraintDataNameChange: "current",
                        constraintDataValueChange: valuesSignUp.constraintData.current + 1
                    }))

                localStorage.setItem('mailConfirmationToken', data.addUser.token);

            } else if (data.addUser.code === 400) {
                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "signUpError",
                    constraintDataValueChange: true
                }))
                document.documentElement.style.setProperty('--inputErrorForm', "red");
                document.documentElement.style.setProperty('--inputBorderErrorForm', "red");
            }

            dispatch(setSignUpConstraintDataOnchange({
                constraintDataNameChange: "loadingSignUp",
                constraintDataValueChange: false
            }))

        }
    });

    // create customer
    const [CREATECUSTOMER] = useMutation(graphQL_shema().CreateCustomer,{
        variables : {email:valuesSignUp.signUp.email},
        context: { clientName: "first" },
        onCompleted:  (data)=>{
            dispatch(setConstSubscription({
                ConstSubscriptionOnchangeNameChange: "customerId",
                ConstSubscriptionOnchangeValueChange: data.createCustomer.customerId
            }))
        }
    })


     // mutation Subricption Customer
    const [CREATESUBSCRIPTIONCustomer] = useMutation(graphQL_shema().CreateSubscription,{
        variables : { input :{
            "customerId":valuesSignUp.constSubscription.customerId,
            "priceId":"price_1JAAjrKvrhYT2AZi2wZ7EVZm"
            }
        },
        context: { clientName: "first" },
        onCompleted:  (data)=>{
            dispatch(setConstSubscription({
                ConstSubscriptionOnchangeNameChange: "clientSecret",
                ConstSubscriptionOnchangeValueChange: data.createSubscription.clientSecret
            }))
            dispatch(setConstSubscription({
                ConstSubscriptionOnchangeNameChange: "subscriptionId",
                ConstSubscriptionOnchangeValueChange: data.createSubscription.subscriptionId
            }))
        }
    })

    // mutation Payement Intent
    const [CREATEPayementintent] = useMutation(graphQL_shema().payementIntent,{
        variables : { input :{
                "amount": valuesPrices.packASYouGo*100,
                "paymentMethodType": "card",
                "currency": "eur"
            }
        },
        context: { clientName: "first" },
        onCompleted:  (data)=>{
            dispatch(setConstSubscription({
                ConstSubscriptionOnchangeNameChange: "clientSecret",
                ConstSubscriptionOnchangeValueChange: data.createPaymentIntent.clientSecret
            }))
        }
    })


    return ({
        CreateAccount,
        CREATECUSTOMER,
        CREATESUBSCRIPTIONCustomer,
        CREATEPayementintent
    })
}

