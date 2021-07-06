import {CalendarConstraints} from "../utils/calendarConstraints";

const { calendar} = CalendarConstraints()

const CalendarInitialState = {

    calendar: calendar(),

}

export const  CalendarReducer=(state=CalendarInitialState , action)=>{

    switch (action.type){
        //******** calendar reducer case************//

        case "SET_CalendarOnchange":
            const {CalendarNameChange,CalendarValueChange}=action.payload
            const CalendarOnOnchangeObj = {...state.calendar,[CalendarNameChange]: CalendarValueChange}
            return{
                ...state,
                calendar:CalendarOnOnchangeObj
            }

        default:{
            return state
        }
    }

}