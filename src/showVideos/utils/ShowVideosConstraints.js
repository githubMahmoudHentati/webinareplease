
export const ShowVideosList = ()=>{

    const FilterVideos = () => {
        return (
            {
                search:"",
                searchFake:"",
                periode:"",
                date:[],
                contributeur: null,
                type:"",
            }
        )
    }
    const paginationProps=()=>{
        return(
            {
                order:'descend',
                pageSize:10,
                columnKey:0,
                current:1,
                id:[],
                idLive:0,
                statusLive:-1,
                idDiffusion:null,
                statusMessages:true
            }
        )
    }
    const showVideoConstraintData =()=>{
        return({
            loading:true,
            loadingLiveFetchData:false,
        })
    }
    const showDivsConditions = () =>{
        return({
            elementSelected: 0,
            clickDeleteIcon:true,
            showElementSelected:false,
            rubDeleteItems:false
        })
    }
    const loadingDeleteShowVideo =()=>{
        return({
            loadingDelete:false
        })
    }

    const valuesInfosLives = () => {
        return({
            visible:false,
            inputUrlDiffusion:"",
            streamName:"",
            idLive:"",
            pwdLive:"",
        })
    }

    const valueExportLives = () =>{
        return({
            visibleExport : false,
            liveId:"",
            participantUrl : "",
            auditorUrl : "",
            integrationUrl : "",
            translatorUrl : "",
            permalink : "",
            password : "",
            participantUrlT: "",
            auditorUrlT:"",
        })
    }
    const valueInfosGuests = () =>{
        return({
            idLive:null,
            mailList:[],
        })
    }
    const valueInputInfosGuest = () =>{
        return({
            valueInputModal:"",
            valueInputModalFake:""
        })
    }
    const valueModalInfosGuest = () =>{
        return({
            visibleInfosGuests : false,
        })
    }

    return({
        FilterVideos,
        paginationProps,
        showVideoConstraintData,
        showDivsConditions,
        loadingDeleteShowVideo,
        valuesInfosLives,
        valueExportLives,
        valueInfosGuests,
        valueInputInfosGuest,
        valueModalInfosGuest
    })

}