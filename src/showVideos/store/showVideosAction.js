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

