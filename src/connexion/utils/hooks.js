import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";


export  const Hooks=()=> {
    const dispatch = useDispatch()
    //const values = useSelector((state) => state.SignUpReducer)

//******************generalInformation************************//
//     const connexionOnChange = (event) => {
//         console.log("event", event.target.value, event.target.name)
//         dispatch(setSignUpOnchange({
//             SignUpNameChange: event.target.name,
//             SignUpValueChange: event.target.value
//         }));
//     };

    const handleSubmit =()=>{

    }

    return({
        // connexionOnChange,
        handleSubmit,
        //values
    })
}