import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
var itemsRunAPI;



const HooksCalendar=(callback)=> {

    console.log("hooks calendar ")

//******************generalInformation************************//
    const setItemsRunAPI = (ItemsRunAPI) => {
        itemsRunAPI=ItemsRunAPI
    };
    return ({
        setItemsRunAPI,
        itemsRunAPI
    })
}

export  default HooksCalendar