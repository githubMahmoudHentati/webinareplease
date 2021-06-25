import {useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {setAppSetLogin} from "../redux/actions";


export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    // Read Data from Hooks

    // use Query to fetch Data
    const {loading:calendar_loadingNow, data: dataVerificationToken}
        = useQuery(graphQL_shema().tokenVerification, {
        fetchPolicy:  "cache-and-network",
        variables: { token : `${localStorage.getItem('jwtToken')}`},
        context: { clientName: "second" },
        onCompleted :(data)=>{
            if (data.login.Code===200)
            {
                dispatch(setAppSetLogin(localStorage.getItem('jwtToken')));
            }
        }
    })

    return({
        dataVerificationToken
    })
}