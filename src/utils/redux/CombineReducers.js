import {combineReducers} from 'redux'

import {Reducer} from "./reducer"
import {FormDirectVideoReducer} from '../../formDirectVideo/store/formDirectVideoReducer'
import {ShowVideosReducerReducer} from "../../showVideos/store/showVideosReducer";


export const rootReducer = combineReducers({
    Reducer,
    FormDirectVideoReducer,
    ShowVideosReducerReducer
})