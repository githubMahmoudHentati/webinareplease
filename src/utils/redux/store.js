import {createStore} from "redux";
import {rootReducer} from './CombineReducers'

const store = createStore(rootReducer);

export default store


