export function setshowVideosActions(e){

    return{
        type: "SET_ShowVideos",
        payload:e,
    }

}
export function setDiffusionLink(e){

    return{
        type: "SET_DiffusionLink",
        payload:e,
    }

}

export function setFilterVideosActions(e){

    return{
        type:"SET_FilterVideos",
        payload:e,
    }

}

export function setPaginationProps(e){
    return{
        type:"SET_PaginationProps",
        payload:e,
    }
}
export function setPaginationPropsValue(e){
    return{
        type:"SET_PaginationPropsValue",
        payload:e,
    }
}

export function setShowVideoConstraintDataOnchange(e){
    return{
        type:"SET_ShowVideoConstraintDataOnchange",
        payload:e
    }
}


export function setshowDivsConditions(e){
    return {
        type : "SET_showDivsConditions",
        payload:e
    }
}

export function setLoadingDeleteShowVideo(e){
    return{
        type:"SET_LoadingDeleteShowVideo",
        payload:e
    }
}

export function setInfosLive(e){
    return{
        type :"SET_INFOSLIVES",
        payload:e
    }
}

export function setExportLive(e){
    return{
        type :"SET_EXPORTLIVES",
        payload:e
    }
}
export function setInfosGuest(e){
    return{
        type:"SET_INFOSGUEST",
        payload:e
    }
}
export function setInfosGuestInput(e){
    return{
        type:"SET_INFOSGUESTINPUT",
        payload:e
    }
}
export function setInfosGuestModal(e){
    return{
        type:"SET_INFOSGUESTModal",
        payload:e
    }
}
export function setFilter(e){
    return{
        type :"SET_FILTER",
        payload:e
    }
}
