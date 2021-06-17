import {combineReducers} from 'redux'

import {Reducer} from "./reducer"
import {FormDirectVideoReducer} from '../../formDirectVideo/store/formDirectVideoReducer'
import {ShowVideosReducerReducer} from "../../showVideos/store/showVideosReducer";
import {AccountSettingsReducer} from "../../compteSettings/store/accountSettingsReducer";
import {SignUpReducer} from "../../signUp/store/signUpReducer";
import {ContactClientReducer} from "../../contactClient/store/ContactClientReducer";
import {ConnexionReducer} from "../../connexion/store/connexionReducer";


export const rootReducer = combineReducers({
    Reducer,
    AccountSettingsReducer,
    FormDirectVideoReducer,
    ShowVideosReducerReducer,
    SignUpReducer,
    ContactClientReducer,
    ConnexionReducer
})