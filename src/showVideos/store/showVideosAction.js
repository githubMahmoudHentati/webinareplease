export function setshowVideosActions(e){

    return{
        type: "SET_ShowVideos",
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
export function updateFormDirectVideo(e){
    return{
        type :"UPDATE_FORM_DIRECT_VIDEO",
        payload:e
    }
}
