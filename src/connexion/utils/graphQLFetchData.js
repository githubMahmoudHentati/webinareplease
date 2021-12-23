import {useMutation, useQuery} from "@apollo/client";
import {graphQL_shema} from "./graphQL";
import {Hooks} from "./hooks";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setConnexionConstraintDataOnchange} from "../store/connexionAction";
import {setAppSetLogin, setStorageData} from "../../utils/redux/actions";

export const GraphQLFetchData=(form)=> {
    const history = useHistory()
    const dispatch = useDispatch()
    const {values }=Hooks()
    const token = new URLSearchParams(window.location.search).get('token')
    const credentialsValues = useSelector((state) => state.Reducer)

    const { data: confirmAccountData}
        = useQuery(graphQL_shema().confirmAccountQuery, {
        fetchPolicy: 'cache-and-network',
        variables: { token : token },
        onCompleted: async (data) => {
            if (data.verifySubscriptionToken.code === 200) {
                localStorage.removeItem('mailConfirmationToken');
            }
            if (data.verifySubscriptionToken.code === 400) {
                history.push("/connexion")
            }
        }
    })

    const [Connexion] = useMutation(graphQL_shema().Connexion, {
        context: {
            headers: {
                Authorization: `Bearer ${credentialsValues.authToken}`
            }
        },
        variables: {input:values.connexion,
        },
        fetchPolicy: "no-cache",
        skip:!values.constraintData.loadingConnexion,
        onCompleted: async (data) => {
            if (data.login.code === 200) {
                history.push("/")
                dispatch(setAppSetLogin(data.login.token));
                localStorage.setItem('jwtToken', data.login.token);
                localStorage.setItem('lastName', data.login.lastName);
                localStorage.setItem('firstName',  data.login.firstName);
                localStorage.setItem('avatar',  data.login.thumbnail);
                if (values.constraintData.isRememberMe){
                    dispatch(setStorageData({credentialsData:{storageUsername:values.connexion.username,storagePassword: values.connexion.password,storageIsRememberMe: values.constraintData.isRememberMe}}))
                    // localStorage.setItem('username', values.connexion.username);
                    // localStorage.setItem('password', values.connexion.password);
                    // localStorage.setItem('isRememberMe', values.constraintData.isRememberMe);
                }
                else{
                    dispatch(setStorageData({credentialsData:{storageUsername:"",storagePassword: "",storageIsRememberMe: ""}}))
                    // localStorage.removeItem('username');
                    // localStorage.removeItem('password');
                    // localStorage.removeItem('isRememberMe');
                }

                document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
                document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
            } else if (data.login.code === 500) {

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
        confirmAccountData
    })
}

