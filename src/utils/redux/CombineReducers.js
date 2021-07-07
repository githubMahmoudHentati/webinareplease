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


export const rootReducer = combineReducers({
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
    ConfirmAccountReducer
})