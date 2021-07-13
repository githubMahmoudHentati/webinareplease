import {CalendarConstraints} from "../utils/calendarConstraints";

const { calendar , calendarVisibleModal} = CalendarConstraints()

const CalendarInitialState = {

    calendar: calendar(),
    calendarVisible : calendarVisibleModal()

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

        //******** calendar Visible Modal reducer case************//

        case "SET_CalendarVisibleOnchange":
            const {CalendarVisibleNameChange,CalendarVisibleValueChange}=action.payload
            const CalendarVisibleOnOnchangeObj = {...state.calendarVisible,[CalendarVisibleNameChange]: CalendarVisibleValueChange}
            return{
                ...state,
                calendarVisible:CalendarVisibleOnOnchangeObj
            }

        default:{
            return state
        }
    }

}