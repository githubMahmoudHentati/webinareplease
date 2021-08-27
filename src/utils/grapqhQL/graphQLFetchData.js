import {useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./shemaGraphQL";
import {useDispatch} from "react-redux";
import {setAppSetLogin} from "../redux/actions";
import {useState} from "react";


export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    // Read Data from Hooks

    // use Query to fetch Data
    const [verificationToken, setVerificationToken] = useState(false);
    const token = localStorage.getItem('jwtToken')?localStorage.getItem('jwtToken'):'';
    useQuery(graphQL_shema().tokenVerification, {
        fetchPolicy:  "cache-and-network",
        variables: { token : `Bearer ${token}`},
        onCompleted :async (data)=>{
            if (data.tokenverification.code===200)
            {
                await dispatch(setAppSetLogin(localStorage.getItem('jwtToken')));
            }
            setVerificationToken(true)
        }
    })
    return({
        verificationToken
    })
}