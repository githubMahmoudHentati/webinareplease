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
            if (data.addUser.Code === 200) {
                //history.push("/connexion")

                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "signUpError",
                    constraintDataValueChange: false
                }))
                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "successSignUp",
                    constraintDataValueChange: true
                }))

                dispatch(setSignUpConstraintDataOnchange({
                    constraintDataNameChange: "current",
                    constraintDataValueChange: valuesSignUp.constraintData.current + 1
                }))

            } else if (data.addUser.Code === 403) {
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

