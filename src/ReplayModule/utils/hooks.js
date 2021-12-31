import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReplayInputs} from "../store/replayAction";

const Hooks = () => {
    const dispatch = useDispatch()
    //Filter Data
    const values = useSelector((state) => state.ReplayReducer)

    const handleChangePassword = (e) => {
        dispatch(setReplayInputs({ReplayInputNameChange:"password",RepalyInputValueChange:e.target.value}));
    }
    const handleConfirmPassword = () => {
        dispatch(setReplayInputs({ReplayInputNameChange:"confirmPassword",RepalyInputValueChange:true}));
    }
    return({
        handleChangePassword,
        values,
        handleConfirmPassword
    })
}
export default Hooks