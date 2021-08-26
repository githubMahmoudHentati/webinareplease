
import {useDispatch, useSelector} from "react-redux";
import {setPackagePayementAction , setPackagePayementActionInput} from "../store/PackagePayementAction";



export  const Hooks=( )=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.PackagePayementReducer)

    const handleClickCardZero = () =>{
        // dispatch active card
        dispatch(setPackagePayementAction({
            PackagePayementName: "activeCard",
            PackagePayementValue: 1
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonZero",
            PackagePayementValue: true
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonOne",
            PackagePayementValue: false
        }));
        //dispatch 2eme button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonTwo",
            PackagePayementValue: false
        }));
    }

    const handleClickCardOne = () =>{
        // dispatch active card
        dispatch(setPackagePayementAction({
            PackagePayementName: "activeCard",
            PackagePayementValue: 2
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonZero",
            PackagePayementValue: false
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
            PackagePayementValue: 3
        }));
        //dispatch 1ere button radio
        dispatch(setPackagePayementAction({
            PackagePayementName: "checkedRadioButtonZero",
            PackagePayementValue: false
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
            dispatch(setPackagePayementActionInput({
                PackagePayementInputName: event.target.name,
                PackagePayementInputValue: event.target.value
            }));

    };
    /*Function select*/
    const handlePackagePayementSelect = (value,action) => {
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
        handleClickCardZero,
        values,
    })
}