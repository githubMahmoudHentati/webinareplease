import {combineReducers} from 'redux'

import {Reducer} from "./reducer"
import {FormDirectVideoReducer} from '../../formDirectVideo/store/formDirectVideoReducer'
import {ShowVideosReducerReducer} from "../../showVideos/store/showVideosReducer";
import {AccountSettingsReducer} from "../../compteSettings/store/accountSettingsReducer";
import {SignUpReducer} from "../../signUp/store/signUpReducer";
import {ContactClientReducer} from "../../contactClient/store/ContactClientReducer";
import {ConnexionReducer} from "../../connexion/store/connexionReducer";
import {ForgetPasswordReducer} from "../../forgetPassword/store/forgetPasswordReducer";
import {ResetPasswordReducer} from "../../resetPassword/store/resetPasswordReducer";
import {PackagePayementReducer} from "../../PackagePayement/store/PackagePayementReducer";
import {CalendarReducer} from "../../Calendar/store/calendarReducer";
import {ConfirmAccountReducer} from "../../confirmAccount/store/forgetPasswordReducer";
import {InvitationReducer} from "../../InvitationForm/store/InvitationFormReducer";
import { persistReducer } from 'redux-persist';
import {ReplayReducer} from "../../ReplayModule/store/replayReducer";
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['Reducer']
};

const rootReducer = combineReducers({
    Reducer,
    AccountSettingsReducer,
    FormDirectVideoReducer,
    ShowVideosReducerReducer,
    SignUpReducer,
    ContactClientReducer,
    ConnexionReducer,
    ForgetPasswordReducer,
    ResetPasswordReducer,
    PackagePayementReducer,
    CalendarReducer,
    ConfirmAccountReducer,
    ReplayReducer,
    InvitationReducer
})

export default  persistReducer(persistConfig , rootReducer)