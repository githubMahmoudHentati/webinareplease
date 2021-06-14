const INITIAL_STATE = {
    ListVideos : {},
}

export const ShowVideosReducerReducer = (state=INITIAL_STATE , action)=>{

    switch (action.type){

        case "SET_ShowVideos":
            return{
                ...state,
                ListVideos: action.payload
            }
        default:{
            return state
        }

    }



}
