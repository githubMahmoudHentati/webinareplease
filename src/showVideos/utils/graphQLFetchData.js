import {useMutation, useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";
import {setshowVideosActions , setShowVideoConstraintDataOnchange} from "../store/showVideosAction";
import {StatusMessage} from "./StatusMessage";
import {setLiveInfo,setFormDirectLiveConstraintDataOnchange} from "../../formDirectVideo/store/formDirectVideoAction"
import {setDirectSetting} from "../../utils/redux/actions";
import {FormDirectConstraints} from "../../formDirectVideo/utils/formDirectConstraints";
import moment from "moment";
import {useEffect} from "react";


const dateFormat = 'YYYY-MM-DD';

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()

    const {generals,configuration,invitation,socialTools} = FormDirectConstraints()

    // Read Data from Hooks
    const {paginationProps ,  values }=Hooks()
    const {error_getLives}=StatusMessage()

    // use Query to fetch Data
    const {data:dataLives}
        = useQuery(graphQL_shema().Get_Lives, {
        fetchPolicy:  "cache-and-network",
        variables: { input : {
                "limit": paginationProps.pageSize,
                "offset": (paginationProps.current-1)* (paginationProps.pageSize),
                "order_dir": paginationProps.order,
                "order_column": parseInt(paginationProps.columnKey),
                "search_word":values.search,
                "date":  values.date && values.date.length ? [moment(values.date[0]).format(dateFormat), moment(values.date[1]).format(dateFormat)] : ["", ""],
                "status":values.type
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
            localStorage.removeItem('idLive')
            dispatch(setLiveInfo({general:generals(),configuration:configuration(),invitation:invitation(),socialTools:socialTools()}))
            dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:false}));
            dispatch(setDirectSetting(0))
        }
    })

    // mutation delete lang from table of event
    const [DeleteItemsMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive:paginationProps.id},
        context: { clientName: "second" },
        onCompleted: (data)=>{
        }
    })


    useEffect(()=>{
        if(dataLives)
        dispatch(setshowVideosActions(dataLives.getLives));
    },[dataLives])


    return({
       // GetCalendarDataNow,
        DeleteItemsMutation,
    })
}