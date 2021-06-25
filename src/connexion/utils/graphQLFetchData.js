import {useLazyQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";
import {setAppSetLogin} from "../../utils/redux/actions";


export const GraphQLFetchData=(values)=> {
    const history = useHistory()
    const dispatch = useDispatch()


    const [Connexion, {
        data: dataUpdate,
        loading: loading_EventUpdated,
        error: error_EventUpdated,
    }] = useLazyQuery(graphQL_shema().Connexion, {
        variables: {input:values.connexion
        },
        onCompleted: async (data) => {
            if (data.login.Code===200)
                {
                    history.push("/")
                    dispatch(setAppSetLogin(data.login.Token));
                    localStorage.setItem('jwtToken', data.login.Token);
                }
            dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:false}))
        }
    });
    return({
        Connexion,
    })
}

