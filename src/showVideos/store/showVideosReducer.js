import {ShowVideosList} from "../utils/ShowVideosConstraints"

const {paginationProps,FilterVideos,showVideoConstraintData ,showDivsConditions , loadingDeleteShowVideo , valuesInfosLives}=ShowVideosList();

const ShowVideosINITIALSTATE = {
    ListVideos : [],
    formPage: localStorage.getItem('form-page') || 'add',
    FilterVideos:FilterVideos(),
    paginationProps:paginationProps(),
    constraintDataShowVideo: showVideoConstraintData(),
    showdivscondition:showDivsConditions(),
    loadingDelete:loadingDeleteShowVideo(),
    valuesInfosLives:valuesInfosLives(),
}

export const ShowVideosReducerReducer = (state=ShowVideosINITIALSTATE , action)=>{

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
            const {PaginationPropsNameChange,PaginationPropsValueChange}=action.payload
            return {
                ...state,
                paginationProps:{...state.paginationProps, [PaginationPropsNameChange]:PaginationPropsValueChange}
            }
        case "SET_ShowVideoConstraintDataOnchange":
            const {constraintDataNameChange,constraintDataValueChange}=action.payload
            const constraintDataOnOnchangeObj = {...state.constraintDataShowVideo,[constraintDataNameChange]: constraintDataValueChange}
            return{
                ...state,
                constraintDataShowVideo:constraintDataOnOnchangeObj
            }
        case "SET_showDivsConditions":
            const {showDivsConditionsName,showDivsConditionsValue}=action.payload
            const showDivsConditionsObj = {...state.showdivscondition,[showDivsConditionsName]: showDivsConditionsValue}
            return{
                ...state,
                showdivscondition:showDivsConditionsObj
            }
        case "SET_LoadingDeleteShowVideo":
            const {LoadingDeleteName,LoadingDeleteValue}=action.payload
            const LoadingDeleteObj = {...state.loadingDelete,[LoadingDeleteName]: LoadingDeleteValue}
            return{
                ...state,
                loadingDelete:LoadingDeleteObj
            }
        case "SET_INFOSLIVES":
            const {infosLivesName,infosLivesValue}=action.payload
            const infosLivesObj = {...state.valuesInfosLives,[infosLivesName]: infosLivesValue}
            return{
                ...state,
                valuesInfosLives:infosLivesObj
            }
            case "UPDATE_FORM_DIRECT_VIDEO":
            const formPage = action.payload
            return{
                ...state,
                formPage:formPage
            }
        default:{
            return state
        }

    }



}
