import {useLazyQuery, useQuery} from "@apollo/client";
import {graphQL_shema} from "./shemaGraphQL";
import {useDispatch} from "react-redux";
import {setAppSetLogin, setAppSetLogout} from "../redux/actions";
import {useState} from "react";
import {useHistory} from 'react-router-dom';


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
            }else{
                dispatch(setAppSetLogout());
            }
            setVerificationToken(true)
        }
    })
    return({
        verificationToken,
        tokenAPI
    })
}