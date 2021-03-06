import {ShowVideosList} from "../utils/ShowVideosConstraints"

const {paginationProps,FilterVideos,showVideoConstraintData ,showDivsConditions , loadingDeleteShowVideo , valuesInfosLives , valueExportLives , valueInfosGuests , valueInputInfosGuest , valueModalInfosGuest}=ShowVideosList();

const ShowVideosINITIALSTATE = {
    ListVideos : [],
    FilterVideos:FilterVideos(),
    paginationProps:paginationProps(),
    constraintDataShowVideo: showVideoConstraintData(),
    showdivscondition:showDivsConditions(),
    loadingDelete:loadingDeleteShowVideo(),
    valuesInfosLives:valuesInfosLives(),
    valueExportLives:valueExportLives(),
    valueInfosGuests:valueInfosGuests(),
    DiffusionLink:[],
    valueInputInfosGuest:valueInputInfosGuest(),
    valueModalInfosGuest:valueModalInfosGuest()
}

export const ShowVideosReducerReducer = (state=ShowVideosINITIALSTATE , action)=>{

    switch (action.type){

        case "SET_ShowVideos":
            return{
                ...state,
                ListVideos: action.payload
            }
        case "SET_DiffusionLink":
            return{
                ...state,
                DiffusionLink: action.payload
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
        case "SET_PaginationPropsValue" :
            return {
                ...state,
                paginationProps:{...state.paginationProps, ...action.payload}
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
        case "SET_EXPORTLIVES":
            const {exportLivesName,exportLivesValue}=action.payload
            const exportLivesObj = {...state.valueExportLives,[exportLivesName]: exportLivesValue}
            return{
                ...state,
                valueExportLives:exportLivesObj
            }
        case "SET_INFOSGUEST":
            const {infosGuestName,infosGuestsValue}=action.payload
            const infosGuestObj = {...state.valueInfosGuests,[infosGuestName]: infosGuestsValue}
            return{
                ...state,
                valueInfosGuests:infosGuestObj
            }
        case "SET_INFOSGUESTINPUT":
            const {infosGuestInputName,infosGuestsInputValue}=action.payload
            const infosGuestInputObj = {...state.valueInputInfosGuest,[infosGuestInputName]: infosGuestsInputValue}
            return{
                ...state,
                valueInputInfosGuest:infosGuestInputObj
            }
        case "SET_INFOSGUESTModal":
            const {infosGuestModalName,infosGuestsModalValue}=action.payload
            const infosGuestModalObj = {...state.valueModalInfosGuest,[infosGuestModalName]: infosGuestsModalValue}
            return{
                ...state,
                valueModalInfosGuest:infosGuestModalObj
            }
        case "SET_FILTER":
            const {deletedItems}=action.payload
            let indexes1 =
                state.paginationProps.id
                    .filter((item) => {
                        return !(deletedItems).includes(item.id);
                    })
            return{
                ...state,
                paginationProps: {...state.paginationProps, id:indexes1}
            }
        default:{
            return state
        }

    }



}
