import {combineReducers} from 'redux'

import {Reducer} from "./reducer"
import {FormDirectVideoReducer} from '../../formDirectVideo/store/formDirectVideoReducer'


export const rootReducer = combineReducers({
    Reducer,
    FormDirectVideoReducer
})