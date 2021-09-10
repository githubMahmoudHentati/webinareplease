import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./shemaGraphQL";
import {useDispatch} from "react-redux";
import {setAppSetLogin} from "../redux/actions";
import {useState} from "react";


export const GraphQLFetchData=(storageData)=> {
    const dispatch = useDispatch()
    // Read Data from Hooks

    // use Query to fetch Data
    const [verificationToken, setVerificationToken] = useState(false);
    const token = localStorage.getItem('jwtToken')?localStorage.getItem('jwtToken'):'';
    const [tokenAPI]=useLazyQuery(graphQL_shema().tokenVerification, {
        context: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        skip: !storageData.appState.loggedIn,
        fetchPolicy:  "cache-and-network",
        variables: { token : `Bearer ${token}`},
        onCompleted :async (data)=>{
            if (data.tokenverification.code===200)
            {
                dispatch(setAppSetLogin(token));
            }
            setVerificationToken(true)
        }
    })
    return({
        verificationToken,
        tokenAPI
    })
}