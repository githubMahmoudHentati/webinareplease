import {FilterVideosList} from "../utils/FilterVideosConstraints"

const {FilterVideos}=FilterVideosList();

const INITIAL_STATE = {
    ListVideos : [],
    FilterVideos:FilterVideos(),
    PaginationProps:{}
}

export const ShowVideosReducerReducer = (state=INITIAL_STATE , action)=>{

    switch (action.type){

        case "SET_ShowVideos":
            return{
                ...state,
                ListVideos: action.payload
            }
        case "SET_FilterVideos" :
            const {FilterVideosNameChange,FilterVideosValueChange}=action.payload
            const FilterVideosOnOnchangeObj = {...state.FilterVideos,[FilterVideosNameChange]: FilterVideosValueChange}
            return {
                ...state,
                FilterVideos:FilterVideosOnOnchangeObj
            }
        case "SET_PaginationProps" :
            return {
                ...state,
                PaginationProps:action.payload
            }
        default:{
            return state
        }

    }



}
