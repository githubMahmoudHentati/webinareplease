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
import {setLiveInfo,setFormDirectLiveConstraintDataOnchange} from "../../formDirectVideo/store/formDirectVideoAction"
import Hookss from "../../formDirectVideo/utils/hooks"
import {ShowVideosReducerReducer} from "../store/showVideosReducer";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {GraphQLFetchData} from "./graphQLFetchData";
import {StatusMessage} from "./StatusMessage";
import {useHistory} from "react-router-dom";
import {setDirectSetting} from "../../utils/redux/actions";
import moment from "moment";
let itemsRunAPI , itemsDeleted

export  const Hooks=()=> {

    const [visible , setVisible] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    //const {GETLiveUpdatedInfo}=GraphQLFetchData()
    
    const valuesFormDirectVideo=Hookss().values

    const [GETLiveUpdatedInfo ,{loading:LiveUpdated_Info, data: LiveUpdatedInfData}]
        = useLazyQuery(graphQL_shema().Get_UpdatedLive_Info, {
        fetchPolicy:  "cache-and-network",
        onCompleted: async (data)=>{
            history.push("/FormDirectVideo")
            let startDate=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("YYYY-MM-DD")
            let startHour=moment(data.getlive.generalInfoOut.livePlan.startDate,"YYYY-MM-DDTHH:mm:ss+01:00").format("HH:mm:ss")
            console.log("startDate",startDate,"startHour",startHour)
            await dispatch(setLiveInfo({
                general:{
                    thumbnail:data.getlive.generalInfoOut.thumbnail,
                    fileList:[{
                        uid: '-1',
                        name: 'xxx.png',
                        status: 'done',
                        url: "https://webinarplease.com/assets/images/content1-3.jpg?v=6",
                        thumbUrl: "https://webinarplease.com/assets/images/content1-3.jpg?v=6",
                    }],
                    liveTitle:data.getlive.generalInfoOut.liveTitle,
                    liveDescription:data.getlive.generalInfoOut.liveDescription,
                    liveAction:data.getlive.generalInfoOut.livePlan.plan,
                    livePlan:{
                        plan: false,
                        startDate:"",
                        duration:"",
                    },
                    startDate: startDate,
                    startHour: startHour,
                    period: data.getlive.generalInfoOut.livePlan.duration,
                    directAccessMode: !data.getlive.generalInfoOut.liveAccess?"freeAccess":"liveAccess",
                    liveAccess: data.getlive.generalInfoOut.liveAccess,
                    pwd: data.getlive.generalInfoOut.pwd,
                    liveSharedLink: data.getlive.generalInfoOut.liveLink,
                    securedPasswordOption: data.getlive.generalInfoOut.securedPasswordOption,
                },
                configuration:{
                    directProgram: data.getlive.configurationOut.liveProgram,
                    notVisibleVideo: false,
                    visibleVideo: false,
                    modalSpeaker: false,
                    switchSpeaker: false,
                    liveAutomaticArchiving: false,
                    SpeakerList: [{
                        id: 0,
                        name: "Nom ",
                        lastName: 'Prénom',
                        title: "Titre",
                        email: "",
                        logoSpeaker: "https://yamsoti.com/wp-content/uploads/2020/01/avatar-rectangle.png"
                    }],
                    addSpeakerList:{},
                    speaker: {id: null, name: "", lastName: "", title: "", email: "", logoSpeaker: []},
                    loadingSpeakerInfo:false,
                    chat: data.getlive.configurationOut.interOption.chat,
                    comments: data.getlive.configurationOut.interOption.comment,
                    likeMention: data.getlive.configurationOut.interOption.like,
                    attachments: data.getlive.configurationOut.multiOption.shareFile,
                    richeMediaDiffusion: data.getlive.configurationOut.multiOption.isRm,
                    videoMode: data.getlive.configurationOut.videoMode?"visibleVideo":"notVisibleVideo",
                    theme:"",
                    themesList:[],
                    tags:data.getlive.configurationOut.tags,
                },
                socialTools:[
                    {
                        id: 0,
                        idServer:data.getlive.socialOut[0].id,
                        title:data.getlive.socialOut[0].title,
                        type: "Facebook post",
                        switch: data.getlive.socialOut[0].active,
                        link:data.getlive.socialOut[0].link,
                        logo: <img src={fbPost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut[0].planifications
                    },
                    {
                        id: 1,
                        idServer:data.getlive.socialOut[1].id,
                        type: "Youtube post",
                        title:data.getlive.socialOut[1].title,
                        link:data.getlive.socialOut[1].link,
                        switch: data.getlive.socialOut[1].active,
                        logo: <img src={youtubePost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut[1].planifications
                    },
                    {
                        id: 2,
                        idServer:data.getlive.socialOut[2].id,
                        type: "Linkedlin post",
                        title:data.getlive.socialOut[2].title,
                        link:data.getlive.socialOut[2].link,
                        switch: data.getlive.socialOut[2].active,
                        logo: <img src={linkedinPost} style={{width: "24px", height: "24px"}}/>,
                        plan: data.getlive.socialOut[2].planifications
                    },
                ]
            }));
            await dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:true}))
        }
    })

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

        dispatch(setshowVideosActions({data:[...itemsDeleted , ...DataVideos.data]}));

        //ClearTimeOut to Run API Delete
        clearTimeout(itemsRunAPI);
    }
    /*Click Add live */
    const handleClickAddLive =()=>{
        history.push("/FormDirectVideo")
        if(matchesMedia.matches){
            dispatch(setDirectSetting(5))
        }
    }

    const updateLive= async (id)=>{
        await GETLiveUpdatedInfo({variables: { "id":id  }})
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
        updateLive
    })
}