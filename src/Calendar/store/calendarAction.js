//******************** calendar actions***************//

export function setCalendarOnchange(e){

    return{
        type: "SET_CalendarOnchange",
        payload:e,
    };
}

//******************** calendar actions***************//

export function setCalendarVisibleOnchange(e){

    return{
        type: "SET_CalendarVisibleOnchange",
        payload:e,
    };
}