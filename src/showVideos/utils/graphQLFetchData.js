import {useMutation, useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";
import {setshowVideosActions , setShowVideoConstraintDataOnchange} from "../store/showVideosAction";
import {StatusMessage} from "./StatusMessage";

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    // Read Data from Hooks
    const {paginationProps ,  values }=Hooks()
    const {error_getLives}=StatusMessage()

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
            if(data.getLives.code === 200){
                dispatch(setshowVideosActions(data.getLives));
                dispatch(setShowVideoConstraintDataOnchange({
                    constraintDataNameChange: "loading",
                    constraintDataValueChange: false
                }))
            }else if(data.getLives.code === 400){
                error_getLives()
            }

        }
    })

    // mutation delete lang from table of event
    const [DeleteItemsMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive:paginationProps.id},
        context: { clientName: "second" },
        onCompleted: (data)=>{
           console.log("dataDelete",data)
        }
    })

    return({
        GetCalendarDataNow,
        DeleteItemsMutation
    })
}