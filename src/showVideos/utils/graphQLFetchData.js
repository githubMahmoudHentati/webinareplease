import {useMutation, useLazyQuery , useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch, useSelector} from "react-redux";
import {Hooks} from "./hooks";
import {
    setshowVideosActions,
    setShowVideoConstraintDataOnchange,
    setFilterVideosActions, setPaginationProps
} from "../store/showVideosAction";
import {StatusMessage} from "./StatusMessage";
import {setLiveInfo,setFormDirectLiveConstraintDataOnchange} from "../../formDirectVideo/store/formDirectVideoAction"
import {setDirectSetting} from "../../utils/redux/actions";
import {FormDirectConstraints} from "../../formDirectVideo/utils/formDirectConstraints";
import moment from "moment";
import {useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import fbPost from "../../assets/facebookPost.svg";
import youtubePost from "../../assets/youtubePost.svg";
import linkedinPost from "../../assets/linkedinPost.svg";


const dateFormat = 'YYYY-MM-DD';

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    const credentialsValues = useSelector((state) => state.Reducer)
    const {generals,configuration,invitation,socialTools} = FormDirectConstraints()
    const valuePagination = useSelector(
        (state) => state.ShowVideosReducerReducer.paginationProps
    );
    //Reducer infos Guests
    const infosGuests = useSelector((state)=> state.ShowVideosReducerReducer.valueInfosGuests)

    // Read Data from Hooks
    const {paginationProps ,  values }=Hooks()
    const {error_getLives}=StatusMessage()

    {console.log("POP§§§§§",paginationProps)}
    {console.log("POP§§§§§SSSSS>>>>>",values)}
    // use Query to fetch Data
    const {data:dataLives}
        = useQuery(graphQL_shema().Get_Lives, {
        fetchPolicy:  "cache-and-network",
        variables: { input : {
                "limit": paginationProps.pageSize,
                "offset": (paginationProps.current-1) * (paginationProps.pageSize),
                "order_dir": paginationProps.order ,//? 'descend' : paginationProps.order ,
                "order_column": parseInt(paginationProps.columnKey),
                "search_word":values.search,
                "date":["", ""],
                "status":values.type
            } },
        context: {
            headers: {
                Authorization: `Bearer ${credentialsValues.authToken}`
            }
        },
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
            dispatch(setshowVideosActions(data.getLives));
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
        if(dataLives){
            dispatch(setshowVideosActions(dataLives.getLives));
        }
    },[dataLives])


    return({
       // GetCalendarDataNow,
        DeleteItemsMutation,
    })
}