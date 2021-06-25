import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterVideosActions, setLoadingDeleteShowVideo,
    setPaginationProps,
    setshowDivsConditions,
    setshowVideosActions
} from "../store/showVideosAction"
import {ShowVideosReducerReducer} from "../store/showVideosReducer";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {GraphQLFetchData} from "./graphQLFetchData";
import {StatusMessage} from "./StatusMessage";

let itemsRunAPI , itemsDeleted

export  const Hooks=()=> {

    const {success_Delete , error_Delete , error_Filter}=StatusMessage()

    const dispatch = useDispatch()
    //Filter Data
    const values = useSelector((state) => state.ShowVideosReducerReducer.FilterVideos)
    //Data of Query
    const DataVideos = useSelector((state)=> state.ShowVideosReducerReducer.ListVideos)
    //Pagination Props
    const paginationProps=useSelector((state)=> state.ShowVideosReducerReducer.paginationProps)
    //Sorter Table Props
    const sorterProps = useSelector((state)=> state.ShowVideosReducerReducer.sorterProps)
    // loading
    const loadingSpinner = useSelector((state)=> state.ShowVideosReducerReducer.constraintDataShowVideo)
   //condition
    const conditions = useSelector((state)=> state.ShowVideosReducerReducer.showdivscondition)
   //loading Delete Show Video
    const loadingDelete = useSelector((state)=> state.ShowVideosReducerReducer.loadingDelete)



    console.log("loadingDelete",loadingDelete)

    console.log("paginationPropsHeloo",paginationProps.id)

    //use Lazy Query
    //query getVideosLinks for embed Code
    const [GETDATEVIDEO ,{error,data: GetlIVES}]
        = useLazyQuery(graphQL_shema().Get_Lives,{
        onCompleted:(data)=>{
            if(data.getLives.code === 200){
                dispatch(setshowVideosActions(data.getLives));
            }
            else if(data.getLives.code === 400){
                error_Filter()
            }
        }
    })
    // mutation delete lang from table of event
    const [DeleteItemsMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive:paginationProps.id},
        context: { clientName: "second" },
        onCompleted: (data)=>{
            if(data.deleteLive.code === 200){
                // dispatch loading Delete Button
                dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:false}));
                // dispatch loading nombre des élements sélectionnés
                dispatch(setshowDivsConditions({showDivsConditionsName:"elementSelected",showDivsConditionsValue:0}));
                success_Delete()
            }else if(data.deleteLive.code === 400){
                error_Delete(400)
            }else if(data.deleteLive.code === 404){
                error_Delete(404)
            }

        }
    })

    //******************Function Data Table************************//

    /*Function Input*/
    const handleSearchRow = (event) => {
        if(event.key === 'Enter') {
            console.log("handleSearchRow", event.target.value, event.target.name)
            dispatch(setFilterVideosActions({
                FilterVideosNameChange: event.target.name,
                FilterVideosValueChange: event.target.value
            }));
        }

    };
    /*Function Select*/
    const handleHeaderSelect = (value,action) => {
        console.log("handleHeaderSelect",action.name, action.value)
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: action.name,
            FilterVideosValueChange: action.value
        }));
    };
    /*Function DatePicker */
    const handleChangeDatePicker = (name, momentValue , dateStringValue) => {
        console.log("handleChangeDatePicker",name ,dateStringValue )
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: name,
            FilterVideosValueChange: dateStringValue
        }));
    }
    /*Filtrer Videos*/
    const handleFiltrerVideos = () =>{
     console.log("handleFiltrerVideos" , values)
        GETDATEVIDEO({
            variables:{
                input : {
                    "limit": paginationProps.pageSize,
                    "offset": values.search !== '' ? 0 :(paginationProps.current-1)*10,
                    "order_dir": paginationProps.order,
                    "order_column": paginationProps.columnKey,
                    "search_word":values.search,
                    "date":values.date,
                    "status":values.type==="tous"?"":values.type==="archivés"?"archived":values.type==="encours"?"live":values.type==="avenir"?"upcoming":""
                }
            },
            context: { clientName: "second" },
        })
    }
    /*Delete Rows*/
    const handleClickDeleteIcon = () =>{
        // dispatch show Alert
        dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
        },3000)
        // Delete items from table
         let items = DataVideos.data.filter(item => {
            return !(paginationProps.id.includes(item.id))
        })
        // dispatch list Video
        dispatch(setshowVideosActions({data:items}));

        // liste des items supprimer
         itemsDeleted = DataVideos.data.filter(item => {

            return (paginationProps.id.includes(item.id))
        })

        // Time out to Run API Delete
        itemsRunAPI = setTimeout(()=>{
            DeleteItemsMutation()
        },3000)

        dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:true}));

    }

    // Delete One Row
    //fonction pour supprimer un live
    const handleDeleteOneRow =  (e) =>{


            // dispatch show Alert
            dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
            setTimeout(()=>{
                dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
            },3000)

            // dispatch list Video
            dispatch(setshowVideosActions({data:DataVideos.data.filter(item=>{return item.id !== e[0]})}))

            // deleted row
            itemsDeleted = DataVideos.data.filter(item => {
                return item.id === e[0]
            })

        // Time out to Run API Delete
        itemsRunAPI =  setTimeout(()=>{
            DeleteItemsMutation()
        },3000)

    }
    const handleClickDropdowMenu =(e)=>{
        // dispatch id list Video
        dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:e}));
    }

    /* Click Annuler button Alert*/
    const handleClickAnnulerAlert=()=>{
        dispatch(setshowDivsConditions({showDivsConditionsName:"showElementSelected",showDivsConditionsValue:true}));
        dispatch(setshowDivsConditions({showDivsConditionsName:"rubDeleteItems",showDivsConditionsValue:true}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"rubDeleteItems",showDivsConditionsValue:false}));
        },3000)
        // recover items deleted

        dispatch(setshowVideosActions({data:[...itemsDeleted , ...DataVideos.data]}));

        //ClearTimeOut to Run API Delete
        clearTimeout(itemsRunAPI);
    }

    return({
        handleSearchRow,
        handleHeaderSelect,
        handleChangeDatePicker,
        handleFiltrerVideos,
        handleClickDeleteIcon,
        handleClickAnnulerAlert,
        handleDeleteOneRow,
        handleClickDropdowMenu,
        DataVideos,
        paginationProps,
        values,
        sorterProps,
        loadingSpinner,
        conditions,
        loadingDelete
    })


}