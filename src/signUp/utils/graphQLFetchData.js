import {useQuery,useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {setConnexionConstraintDataOnchange} from "../../connexion/store/connexionAction";
import {useDispatch} from "react-redux";


export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const [CreateAccount, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().SignUp, {
        variables: {input:values.signUp
        },
        onCompleted: async (data) => {
            dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingSignUp",constraintDataValueChange:false}))
            {history.push("/connexion")}
        }
    });
    return({
        CreateAccount,
    })
}

