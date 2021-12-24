import { useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setFilterVideosActions,
    setInfosLive,
    setLoadingDeleteShowVideo,
    setPaginationProps,
    setshowDivsConditions,
    setshowVideosActions,
    setShowVideoConstraintDataOnchange,
    setExportLive,
    setDiffusionLink,
    setInfosGuest,
    setInfosGuestInput,
    setInfosGuestModal
} from "../store/showVideosAction"
import {useLazyQuery, useMutation} from "@apollo/client";
import {graphQL_shema} from "./graphQL";
import {StatusMessage} from "./StatusMessage";
import {useHistory} from "react-router-dom";
import {setDirectSetting} from "../../utils/redux/actions";
import moment from "moment";
import {

    setFormDirectLiveConstraintDataOnchange,
    setLiveInfo
} from "../../formDirectVideo/store/formDirectVideoAction"
import {FormDirectConstraints} from "../../formDirectVideo/utils/formDirectConstraints";

import useWindowDimensions from "../../utils/components/getWindowDimensions";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";



const {generals,configuration,invitation,socialTools} = FormDirectConstraints()


let itemsRunAPI
const dateFormat = 'YYYY-MM-DD';
export  const Hooks=()=> {
    let idLiveToDelete = []
    const [keyState , setKeyState]=useState(null)
    const [liveObj , setLiveObj] = useState({
        order:'descend',
        pageSize:10,
        columnKey:0,
        current:1,
        id:[],
        idLive:0
    })

    const history = useHistory();
    const dispatch = useDispatch()

    const {success_Delete , error_Delete ,  error_getLives}=StatusMessage()

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
    //Reducer export lives
    const exportLives = useSelector((state)=> state.ShowVideosReducerReducer.valueExportLives)
    //Reducer infos Guests
    const infosGuests = useSelector((state)=> state.ShowVideosReducerReducer.valueInfosGuests)
    //Reducer infos Guests
    const infosGuestsModal = useSelector((state)=> state.ShowVideosReducerReducer.valueModalInfosGuest)
    //Reducer
    //Reducer export lives
    const DiffusionLinks = useSelector((state)=> state.ShowVideosReducerReducer.DiffusionLink)

    // use Selector redux
    const mailList = useSelector((state)=> state.ShowVideosReducerReducer.valueInfosGuests.mailList)



    // Diffusion Link
    //const diffusionLink = useSelector((state)=> state.ShowVideosReducerReducer.DiffusionLink)

    // matches Media query
    let matchesMedia = useWindowDimensions()  // fonction js pour afficher interface seulement en 767px de width

    //use Lazy Query
    //query getVideosLinks for embed Code
    const [GETDATEVIDEO]
        = useLazyQuery(graphQL_shema().Get_Lives,{
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

            }

    })



    // mutation delete lang from table of event
    const [DeleteItemMutation] = useMutation(graphQL_shema().Delete_Items,{
        refetchQueries:() => [{ query: graphQL_shema().Get_Lives, variables: { input : {
                    "limit": paginationProps.pageSize,
                    "offset": (paginationProps.current-1)*(paginationProps.pageSize),
                    "order_dir": paginationProps.order,
                    "order_column": parseInt(paginationProps.columnKey),
                    "search_word":values.search,
                    "date": ["", ""],
                    "status":values.type
                },

            },
        }],
        variables : {idLive: idLiveToDelete},
        context: { clientName: "second" },
        onCompleted: (data)=>{
            if(data.deleteLive.code === "200"){
                success_Delete()
            }else if(data.deleteLive.code === "400"){
                error_Delete(400)
            }else if(data.deleteLive.code === "404"){
                error_Delete(404)
            }else if(data.deleteLive.code === "401"){
                error_Delete(401)
            }
        }
    })
    //
      // mutation delete lang from table of event
      const [DeleteItemsMutation] = useMutation(graphQL_shema().Delete_Items,{
        variables : {idLive:paginationProps.id && paginationProps.id.length? paginationProps.id : liveObj.id},
        context: { clientName: "second" },
        onCompleted: (data)=>{
            // dispatch loading Delete Button
            dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:false}));
            if(data.deleteLive.code === "200"){
                // dispatch loading nombre des élements sélectionnés
                success_Delete()
            }else if(data.deleteLive.code === "400"){
                error_Delete(400)
            }else if(data.deleteLive.code === "404"){
                error_Delete(404)
            }
            else if(data.deleteLive.code === "401"){
                error_Delete(401)
            }
        }
    })

    // mutation Get infos live
    const [GETINFOSlIVES]= useMutation(graphQL_shema().Get_Live_Info,{
        variables : {liveId: (paginationProps.idLive ? paginationProps.idLive : liveObj.idLive)},
        context: { clientName: "second" },
        onCompleted:  (data)=>{
            if(data.getliveInfo.code === 200) {
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

    //LazyQuery Export Live
    const [EXPORTlIVE]
        = useLazyQuery(graphQL_shema().Export_Live,{
        fetchPolicy:  "cache-and-network",
        variables : {id:(paginationProps.idLive ? paginationProps.idLive : liveObj.idLive)},
        context: { clientName: "second" },
        onCompleted :(data)=>{
            dispatch(setExportLive({
                exportLivesName: "participantUrl",
                exportLivesValue: data.GetLinkExport.participantUrl
            }));
            dispatch(setExportLive({
                exportLivesName: "auditorUrl",
                exportLivesValue: data.GetLinkExport.auditorUrl
            }));
            dispatch(setExportLive({
                exportLivesName: "integrationUrl",
                exportLivesValue: data.GetLinkExport.integrationUrl
            }));
        }

    })

    //use Lazy Query
    //query getVideosLinks for embed Code
    const [GETLIVEEMAILS]
        = useMutation(graphQL_shema().get_live_emails,{
        context: { clientName: "second" },
        onCompleted : async (data)=>{
            await  dispatch(setInfosGuest({infosGuestName:"mailList",infosGuestsValue:data.getLiveEmails}));
        }

    })

    //******************Function Data Table************************//

    // mutation Get Diffusion Link
    const [getDiffusionLink , { data}] = useMutation(graphQL_shema().diffusion_link,{
        context: { clientName: "second" },
        onCompleted: (data)=>{

            dispatch(setDiffusionLink(data.getDiffusionLink));
            localStorage.setItem('diffLink',data.getDiffusionLink.diffLink)
            localStorage.setItem('visLink',data.getDiffusionLink.visLink)
            if (data.getDiffusionLink){
                if(data.getDiffusionLink.code === 200){
                    if(keyState.status === -1 || keyState.status === 1){
                        history.push("/webinarStudioLive")
                    }else{
                        window.open(data.getDiffusionLink.visLink, '_blank');
                    }
                }
            }
        }
    })


    /*Function Input*/
    const handleSearchRow = async(event , dates) => {
        if(event.key === 'Enter') {
           await dispatch(setFilterVideosActions({
                FilterVideosNameChange: event.target.name,
                FilterVideosValueChange: event.target.value
            }));
            await dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[]}))
            await dispatch(
                setPaginationProps({
                  PaginationPropsNameChange: "current",
                  PaginationPropsValueChange: 1,
                })
              );

            /*  GETDATEVIDEO()*/
            await GETDATEVIDEO({
                    variables:
                        {
                            input : {
                                "limit": paginationProps.pageSize,
                                "offset": 0,
                                "order_dir": paginationProps.order,
                                "order_column": parseInt(paginationProps.columnKey),
                                "search_word":values.searchFake,
                                "date": (dates && dates.length && [moment(dates[0]).format(dateFormat), moment(dates[1]).format(dateFormat)] )|| ["", ""],
                                "status":values.type
                            }
                        },
                }
            )
        }
    };
    /*Function Select*/
    const handleHeaderSelect = (value,action) => {
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: action.name,
            FilterVideosValueChange: action.value
        }));
         dispatch(
            setPaginationProps({
              PaginationPropsNameChange: "current",
              PaginationPropsValueChange: 1,
            })
          );
        if(action.name === 'type')  dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[]}));

        // lazy query if select run
        GETDATEVIDEO({
            variables:
                {
                    input : {
                        "limit": paginationProps.pageSize,
                        "offset": 0,
                        "order_dir": paginationProps.order,
                        "order_column": parseInt(paginationProps.columnKey),
                        "search_word":values.searchFake,
                        "date": (values.date && values.date.length && [moment(values.date[0]).format(dateFormat), moment(values.date[1]).format(dateFormat)] )|| ["", ""],
                        "status":value
                    }
                },
        })
    };
    /*Function DatePicker */
    const handleChangeDatePicker = (name, momentValue , dateStringValue) => {
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: name,
            FilterVideosValueChange: dateStringValue
        }));
    }
    /* Function change RangePicker */
    const onChangeRange = (name,datesValue,dateStringsValue) =>{
        dispatch(setFilterVideosActions({
            FilterVideosNameChange: name,
            FilterVideosValueChange: datesValue
        }));
    }
    /*Filtrer Videos*/
    const handleFiltrerVideos = async(dates, contributor) =>{
            await dispatch(
                setPaginationProps({
                  PaginationPropsNameChange: "current",
                  PaginationPropsValueChange: 1,
                })
              );
              await dispatch(setFilterVideosActions({
                FilterVideosNameChange: "date",
                FilterVideosValueChange: dates
            }));
            await dispatch(setFilterVideosActions({
                FilterVideosNameChange: "contributeur",
                FilterVideosValueChange: contributor
            }));
              /*  GETDATEVIDEO()*/
               await GETDATEVIDEO({
                    variables:
                        {
                            input : {
                                "limit": paginationProps.pageSize,
                                "offset": 0,
                                "order_dir": paginationProps.order,
                                "order_column": parseInt(paginationProps.columnKey),
                                "search_word":values.searchFake,
                                "date": (dates && dates.length && [moment(dates[0]).format(dateFormat), moment(dates[1]).format(dateFormat)] )|| ["", ""],
                                "status":values.type
                            }
                        },
                    }
                )
        
            await dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[]}))

   
    }
    const resetFilterVideos = async()=>{
        if((values && values.date) || values.contributeur)
        {
            await GETDATEVIDEO()
            await dispatch(setFilterVideosActions({
                FilterVideosNameChange: "date",
                FilterVideosValueChange: []
            }))
            await dispatch(setFilterVideosActions({
                FilterVideosNameChange: "contributeur",
                FilterVideosValueChange: null
            }))
        }
       

    }
    /*Delete Rows*/
    const handleClickDeleteIcon = async() =>{
        let filterListVid = [];

              // dispatch show Alert
      await dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
        },3000)

        // Time out to Run API Delete
        itemsRunAPI = setTimeout(async()=>{
       await DeleteItemsMutation().then(async(res)=> {
           const {data: {deleteLive}} = await res
           let deletedItems =deleteLive.deleteditems || []
           let notDeletedItems = deleteLive.undeleteditems || []
           filterListVid = DataVideos.data
          .filter((item) => {
            return !(deletedItems).includes(item.id);
          })
           if(filterListVid.length === 0)
        { await dispatch(setPaginationProps({
            PaginationPropsNameChange: "current",
            PaginationPropsValueChange: paginationProps.current !== 1 ? paginationProps.current - 1 : 1 ,
          }))}
          await GETDATEVIDEO();
        await dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[...notDeletedItems]}));
    })

        },3000)

        dispatch(setLoadingDeleteShowVideo({LoadingDeleteName:"loadingDelete",LoadingDeleteValue:true}));

    }

    // Delete One Row
    //fonction pour supprimer un live
    const handleDeleteOneRow =  async(liveId) =>{
        let filterListVid = [];

        // dispatch show Alert
        idLiveToDelete.push(liveId)

        dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:false}));
        setTimeout(()=>{
            dispatch(setshowDivsConditions({showDivsConditionsName:"clickDeleteIcon",showDivsConditionsValue:true}));
        },3000)

        // Time out to Run API Delete
        itemsRunAPI = setTimeout(async()=>{
            await DeleteItemMutation().then(async(res)=> {
                const {data: {deleteLive}} = await res
                let deletedItems =deleteLive.deleteditems || []

                filterListVid = DataVideos.data
                    .filter((item) => {
                        return !(deletedItems).includes(item.id);
                    })
               let notDeleted = paginationProps.id.filter(
                   (item) =>{
                       return !deletedItems.includes(item)
                   }
               )

                if(filterListVid.length === 0)
                { await dispatch(setPaginationProps({
                    PaginationPropsNameChange: "current",
                    PaginationPropsValueChange: paginationProps.current !== 1 ? paginationProps.current - 1 : 1 ,
                }))}
                await dispatch(setPaginationProps({PaginationPropsNameChange:"id",PaginationPropsValueChange:[...notDeleted]}));
            })

        },3000)


    }
    // Click Dropdown menu
    const handleClickDropdowMenu = ( e, liveId )=>{
        // dispatch id list Video
        e.preventDefault();
        setLiveObj({...liveObj,idLive:liveId})
        // dispatch(setPaginationProps({PaginationPropsNameChange:"idLive",PaginationPropsValueChange: liveId}));
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
    const handleClickAddLive = () =>{
        dispatch(setLiveInfo({general:generals(),configuration:configuration(),invitation:invitation(),socialTools:socialTools()}))
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"loadingLiveFetchData",constraintDataValueChange:true}));
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"crudOption",constraintDataValueChange:"Ajouter"}))
        history.push("/FormDirectVideo")
        localStorage.setItem('formPage', 'Ajouter')
        if(matchesMedia.matches){
            dispatch(setDirectSetting(5))
        }
    }

    /*Click Update live */
    const updateLive= async (id , status)=>{
        console.log("status120",status)
        localStorage.setItem('idLive', id);
        history.push("/FormDirectVideo")
        localStorage.setItem('formPage', 'Modifier')
        dispatch(setFormDirectLiveConstraintDataOnchange({constraintDataNameChange:"crudOption",constraintDataValueChange:"Modifier"}));
        dispatch(setPaginationProps({PaginationPropsNameChange:"statusLive",PaginationPropsValueChange:status}))
    }

    // fonction handleInfos
    const handleInfos = async ()=>{
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

    // fonction export live
    const handleExport = () =>{
        EXPORTlIVE()
        setTimeout(()=>{
            dispatch(setExportLive({exportLivesName:"visibleExport",exportLivesValue:true}));
        },300)
    }
    //handleCancel Modal export
    const handleCancelModalExport = () =>{
        dispatch(setExportLive({exportLivesName:"visibleExport",exportLivesValue:false}));
    }
    // Handle Click Visualiser/Diffuser
    const handleClickStreamin = async (e) =>{
        //await dispatch(setPaginationProps({PaginationPropsNameChange:"idDiffusion",PaginationPropsValueChange:e.id}));
        await setKeyState(e)
        await getDiffusionLink({
                 variables : {id:e.id},
        })
    }

    //*******infos Guests ****///
    const handleInfosGuests = async (val) => {
       await GETLIVEEMAILS({
           variables : {id:val , searchEmail:""}
       })

      await  dispatch(setInfosGuest({infosGuestName:"idLive",infosGuestsValue:val}));

       dispatch(setInfosGuestModal({infosGuestModalName:"visibleInfosGuests",infosGuestsModalValue:true}));

    }

    const handleCancelModalInfosGuest = () => {
        dispatch(setInfosGuestModal({infosGuestModalName:"visibleInfosGuests",infosGuestsModalValue:false}));
    }

    ///************** Filtrage Modal ***************//////
    const handleChangeInputModal =async (e) => {
        if(e.key === 'Enter') {
            await dispatch(setInfosGuestInput({infosGuestInputName:"valueInputModal",infosGuestsInputValue:e.target.value}));
            await GETLIVEEMAILS({
                variables: {id: infosGuests.idLive, searchEmail: e.target.value}
            })

        }
    }
    const handleChangeInputModalFake = async (e) =>{
        await dispatch(setInfosGuestInput({infosGuestInputName:"valueInputModalFake",infosGuestsInputValue:e.target.value}));
    }

    ///Export Div//////
    const saveDiv = () => {
        html2canvas(document.querySelector("#DivExport")).then(canvas => {
            document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "mm", "a4");
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save("listEmails.pdf");
        });
    }
    const saveDivXLSX = () => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const ws = XLSX.utils.json_to_sheet(mailList);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "listEmails" + fileExtension);

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
        loadingDelete,
        handleClickAddLive,
        matchesMedia,
        handleInfos,
        handleCancel,
        infosLives,
        updateLive,
        GETDATEVIDEO,
        onChangeRange,
        handleExport,
        handleCancelModalExport,
        exportLives,
        resetFilterVideos,
        handleClickStreamin,
        handleInfosGuests,
        handleCancelModalInfosGuest,
        infosGuests,
        handleChangeInputModal,
        saveDiv,
        handleChangeInputModalFake,
        saveDivXLSX,
        infosGuestsModal
    })
}