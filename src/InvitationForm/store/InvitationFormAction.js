export const setCryptext = ({payload}) =>{
    return {
        type:"SET_CRYPTEXT",
        payload: payload
    }
}
export const setInfoToRegsiter = ({payload}) =>{
    return {
        type:"SET_INFO_TO_REGISTER",
        payload: payload
    }
}
export const setSelectedField = ({payload}) =>{
    return {
        type:"SET_SELECTED_FIELD",
        payload: payload
    }
}
export const setSelectedParticipationField = ({payload}) =>{
    return {
        type:"SET_SELECTED_PARTICIPATION_FIELD",
        payload: payload
    }
}
export const setVisibleInscriptionPage = ({payload}) =>{
    return {
        type:"SET_VISIBLE_INSCRIPTION_PAGE",
        payload: payload
    }
}