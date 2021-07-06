import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch} from "react-redux";
import {setConstraintDataOnchange} from "../../compteSettings/store/accountSettingsAction";
import {setSignUpConstraintDataOnchange} from "../store/signUpAction";
import {setPackagePayementAction} from "../../PackagePayement/store/PackagePayementAction";


export const GraphQLFetchData = (valuesSignUp) => {
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
                    history.push("/connexion")
                } else
                    dispatch(setSignUpConstraintDataOnchange({
                        constraintDataNameChange: "current",
                        constraintDataValueChange: valuesSignUp.constraintData.current + 1
                    }))

                //valuesSignUp.signUp.subscriptionId===0&&history.push("/connexion")

            } else if (data.addUser.code === 403) {
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
    return ({
        CreateAccount,
    })
}

