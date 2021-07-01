import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";
import {setAppSetLogin} from "../../utils/redux/actions";


export const GraphQLFetchData=(form)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {values }=Hooks()


    const [Connexion, {
        data: dataUpdate,
        loading: loading_Connexion,
        error: error_EventUpdated,
    }] = useMutation(graphQL_shema().Connexion, {
        variables: {input:values.connexion,
        },
        fetchPolicy: "no-cache",
        skip:!values.constraintData.loadingConnexion,
        onCompleted: async (data) => {
            if (data.login.Code === 200) {
                history.push("/")
                dispatch(setAppSetLogin(data.login.Token));
                localStorage.setItem('jwtToken', data.login.Token);
                if (values.constraintData.isRememberMe){
                    localStorage.setItem('username', values.connexion.username);
                    localStorage.setItem('password', values.connexion.password);
                    localStorage.setItem('isRememberMe', values.constraintData.isRememberMe);
                }
                else{
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    localStorage.removeItem('isRememberMe');
                }

                document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
                document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
            } else if (data.login.Code === 500) {

                dispatch(setConnexionConstraintDataOnchange({
                    constraintDataNameChange: "connexionError",
                    constraintDataValueChange: true
                }))
                form.setFieldsValue( {
                    password:""
                });
                document.documentElement.style.setProperty('--errorForm', "red");
                document.documentElement.style.setProperty('--borderErrorForm', "red");
            }

            dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:false}))

        }
    });
    return({
        Connexion,
    })
}

