import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPackagePayementAction , setPackagePayementActionInput} from "../store/PackagePayementAction";
import {PackagePayementReducer} from "../store/PackagePayementReducer";


export  const Hooks=( )=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.PackagePayementReducer)
    console.log("valuesPackageRducerReduce",values)

    const handleClickCardOne = () =>{
        // dispatch active card
        dispatch(setPackagePayementAction({
            PackagePayementName: "activeCard",
            PackagePayementValue: 1
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonOne",
            PackagePayementValue: true
        }));
        //dispatch 2eme button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonTwo",
            PackagePayementValue: false
        }));
    }

    const handleClickCardTwo = () =>{
        // dispatch active card
        dispatch(setPackagePayementAction({
            PackagePayementName: "activeCard",
            PackagePayementValue: 2
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonOne",
            PackagePayementValue: false
        }));
        //dispatch 2eme button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonTwo",
            PackagePayementValue: true
        }));
    }
    /*Function Input*/
    const handlePackagePayementInput = (event) => {
            console.log("handleSearchRow", event.target.value, event.target.name)
            dispatch(setPackagePayementActionInput({
                PackagePayementInputName: event.target.name,
                PackagePayementInputValue: event.target.value
            }));

    };
    /*Function select*/
    const handlePackagePayementSelect = (value,action) => {
        console.log("handleHeaderSelect",action.name, action.value)
        dispatch(setPackagePayementActionInput({
            PackagePayementInputName: action.name,
            PackagePayementInputValue: action.value
        }));

    };

    return({
        handleClickCardOne,
        handleClickCardTwo,
        handlePackagePayementInput,
        handlePackagePayementSelect,
        values,
    })
}