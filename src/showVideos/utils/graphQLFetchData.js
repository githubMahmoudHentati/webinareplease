import {useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";
import {setshowVideosActions , setShowVideoConstraintDataOnchange} from "../store/showVideosAction";


export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    // Read Data from Hooks
    const {paginationProps ,  values }=Hooks()

    // use Query to fetch Data
    const {loading:calendar_loadingNow, data: GetCalendarDataNow}
        = useQuery(graphQL_shema().Get_Lives, {
        fetchPolicy:  "cache-and-network",
        variables: { input : {
                "limit": paginationProps.pageSize,
                "offset": values.search !== '' ? 0 :(paginationProps.current-1)*10,
                "order_dir": paginationProps.order,
                "order_column": paginationProps.columnKey,
                "search_word":values.search,
                "date":"",
                "status":values.type==="tous"?"":values.type==="archivés"?"archived":values.type==="encours"?"live":values.type==="avenir"?"upcoming":""
            } },
        context: { clientName: "second" },
        onCompleted :(data)=>{
                dispatch(setshowVideosActions(data.getLives));
                dispatch(setShowVideoConstraintDataOnchange({
                    constraintDataNameChange: "loading",
                    constraintDataValueChange: false
                }))
        }
    })

    return({
        GetCalendarDataNow
    })
}