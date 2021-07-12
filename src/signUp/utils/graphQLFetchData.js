import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch, useSelector} from "react-redux";
import {setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";
import {setConstSubscription, setSignUpConstraintDataOnchange} from "../store/signUpAction";
import {setPackagePayementAction} from "../../PackagePayement/store/PackagePayementAction";


export const GraphQLFetchData = (valuesSignUp , valuesCard) => {

    const valuesPrices = useSelector((state) => state.PackagePayementReducer.packagePayement)// reducer PackagePayement

    console.log("jhgjhgjhgjhgjhgjhkjhkjhkjchkjhfkd",valuesSignUp)
    const history = useHistory()
    const dispatch = useDispatch()
    const [CreateAccount, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().SignUp, {
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

                if (valuesSignUp.signUp.subscriptionId === 0) {

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
            console.log("123456789654123654789",data)
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
            console.log("azerfdsqwxcvbgty123",data)
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
            console.log("azerfdsqwxcvbgt54654654654654y123",data)
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

