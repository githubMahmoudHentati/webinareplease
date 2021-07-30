import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterVideosActions, setInfosLive, setLoadingDeleteShowVideo,
    setPaginationProps,
    setshowDivsConditions,
    setshowVideosActions,
    setShowVideoConstraintDataOnchange
} from "../store/showVideosAction"
import fbPost from  "../../assets/facebookPost.svg"
import linkedinPost from  "../../assets/linkedinPost.svg"
import youtubePost from  "../../assets/youtubePost.svg"
import {ShowVideosReducerReducer} from "../store/showVideosReducer";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {StatusMessage} from "./StatusMessage";
import {useHistory} from "react-router-dom";
import {setDirectSetting} from "../../utils/redux/actions";
import moment from "moment";
import {setFormDirectLiveConstraintDataOnchange,setLiveInfo} from "../../formDirectVideo/store/formDirectVideoAction"
import {FormDirectConstraints} from "../../formDirectVideo/utils/formDirectConstraints";
const {generals,configuration,invitation,socialTools,constraintData} = FormDirectConstraints()

let itemsRunAPI , itemsDeleted

export  const Hooks=()=> {
    let idLiveToDelete = []
    const [visible , setVisible] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    const {success_Delete , error_Delete , error_Filter ,  error_getLives}=StatusMessage()

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
    //Reducer infos lives
    const infosLives = useSelector((state)=> state.ShowVideosReducerReducer.valuesInfosLives)
    // matches Media query
    let matchesMedia = window.matchMedia("(max-width: 767px)") // fonction js pour afficher interface seulement en 767px de width

       console.log("paginatioklklsdjfhksdjhfksdjfhnProps",paginationProps)
    if(DataVideos.data){
        console.log("paginationPropsHeloo",DataVideos.data.map(item=>item.status))
    }

    //use Lazy Query
    //query getVideosLinks for embed Code
    const [GETDATEVIDEO ,{error,data: GetlIVES}]
        = useLazyQuery(graphQL_shema().Get_Lives,{
            fetchPolicy:  "cache-and-network",
            variables: { input : {
                    "limit": paginationProps.pageSize,
                    "offset": values.search !== '' ? 0 :(paginationProps.current-1)*10,
                    "order_dir": paginationProps.order,
                    "order_column": paginationProps.columnKey,
                    "search_word":values.search,
                    "date":[" ", ""],
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
    const [DeleteItemMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive: idLiveToDelete},
        context: { clientName: "second" },
        onCompleted: (data)=>{
            if(data.deleteLive.code === "200"){
                success_Delete()
                GETDATEVIDEO();
            }else if(data.deleteLive.code === "400"){
                error_Delete(400)
            }else if(data.deleteLive.code === "404"){
                error_Delete(404)
            }
        }
    })
    //
      // mutation delete lang from table of event
      const [DeleteItemsMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive:paginationProps.id},
        context: { clientName: "second" },
        onCompleted: (data)=>{
            if(data.deleteLive.code === "200"){
                // dispatch loading Delete Button
                dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:false}));
                // dispatch loading nombre des élements sélectionnés
                dispatch(setshowDivsConditions({showDivsConditionsName:"elementSelected",showDivsConditionsValue:0}));
                success_Delete()
            }else if(data.deleteLive.code === "400"){
                error_Delete(400)
            }else if(data.deleteLive.code === "404"){
                error_Delete(404)
            }
        }
    })

    // mutation Get infos live
    const [GETINFOSlIVES] = useMutation(graphQL_shema().Get_Live_Info,{
        variables : {liveId:paginationProps.idLive},
        context: { clientName: "second" },
        onCompleted:  (data)=>{
            if(data.getliveInfo.code === 200) {
                console.log("ajhdkfjhdksjfhksdjfhksdjfhksdj", data)
                 dispatch(setInfosLive({
                    infosLivesName: "inputUrlDiffusion",
                    infosLivesValue: data.getliveInfo.urlDiffusion
                }));
                dispatch(setInfosLive({
                    infosLivesName: "streamName",
                    infosLivesValue: data.getliveInfo.streamName
                }));
                 dispatch(setInfosLive({infosLivesName: "idLive", infosLivesValue: data.getliveInfo.idLive}));
                 dispatch(setInfosLive({infosLivesName: "pwdLive", infosLivesValue: data.getliveInfo.pwdLive}));
            }else if(data.getliveInfo.code === 400){
                error_getLives(400)
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
      /*  GETDATEVIDEO()*/
    }
    /*Delete Rows*/
    const handleClickDeleteIcon = async() =>{
        // dispatch show Alert
      await  dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
        },3000)

        // liste des items supprimer
         itemsDeleted = DataVideos.data.filter(item => {
            return (paginationProps.id.includes(item.id))
        })

        // Time out to Run API Delete
        itemsRunAPI = setTimeout(async()=>{
       await DeleteItemsMutation().then(async()=> {
          await GETDATEVIDEO();
        await dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[]}));})
        
        },3000)

        dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:true}));



    }

    // Delete One Row
    //fonction pour supprimer un live
    const handleDeleteOneRow =  async(liveId) =>{
 // dispatch show Alert
    idLiveToDelete.push(liveId)
  dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
 setTimeout(()=>{
     dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
 },3000)

 // Time out to Run API Delete
 setTimeout(()=>{
 DeleteItemMutation().then(()=> {
     //do s.th
  //GETDATEVIDEO();

 })
 
 },3000)

 dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:true}));
           
            
    }
    const handleClickDropdowMenu =(e)=>{
        // dispatch id list Video
        dispatch(setPaginationProps({PaginationPropsNameChange:"idLive",PaginationPropsValueChange:e[0]}));
    }

    /* Click Annuler button Alert*/
    const handleClickAnnulerAlert=()=>{
        // dispatch loading Delete Button
        dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:false}));
        //show selected element
        dispatch(setshowDivsConditions({showDivsConditionsName:"showElementSelected",showDivsConditionsValue:true}));
        dispatch(setshowDivsConditions({showDivsConditionsName:"rubDeleteItems",showDivsConditionsValue:true}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"rubDeleteItems",showDivsConditionsValue:false}));
        },3000)
        // recover items deleted

       /* dispatch(setshowVideosActions({data:[...itemsDeleted , ...DataVideos.data]}));*/

        //ClearTimeOut to Run API Delete
        clearTimeout(itemsRunAPI);
    }
    /*Click Add live */
    const handleClickAddLive = async ()=>{
        dispatch(setLiveInfo({general:generals(),configuration:configuration(),invitation:invitation(),socialTools:socialTools()}))
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:true}));
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"crudOption",constraintDataValueChange:"Ajouter"}))
        history.push("/FormDirectVideo")
        if(matchesMedia.matches){
            dispatch(setDirectSetting(5))
        }
    }

    /*Click Update live */
    const updateLive= async (id)=>{
        localStorage.setItem('idLive', id);
        history.push("/FormDirectVideo")
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"crudOption",constraintDataValueChange:"Modifier"}))

    }

    // fonction handleInfos
    const handleInfos =()=>{
           GETINFOSlIVES()
        setTimeout(()=>{
            dispatch(setInfosLive({infosLivesName:"visible",infosLivesValue:true}));
        },300)
    }

    //handleCancel MODAL
    const handleCancel = () => {
              dispatch(setInfosLive({infosLivesName:"visible",infosLivesValue:false}));
        //setVisible(false)
    };

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
        loadingDelete,
        handleClickAddLive,
        matchesMedia,
        handleInfos,
        handleCancel,
        infosLives,
        updateLive,
        GETDATEVIDEO
    })
}