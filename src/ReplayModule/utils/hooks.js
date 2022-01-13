import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReplayInputs} from "../store/replayAction";

const Hooks = () => {
    const dispatch = useDispatch()
    //Filter Data
    const values = useSelector((state) => state.ReplayReducer)
    const passworddRedux = useSelector((state)=> state.ReplayReducer.Login.password)
    const password = useSelector((state)=> state.ReplayReducer.Login.passwordAPI)


    const handleChangePassword = (e) => {
        dispatch(setReplayInputs({ReplayInputNameChange:"password",RepalyInputValueChange:e.target.value}));
    }
    const handleConfirmPassword = (e) => {
        if(passworddRedux === password){
            dispatch(setReplayInputs({ReplayInputNameChange:"confirmPassword",RepalyInputValueChange:true}));
        }else {
            dispatch(setReplayInputs({ReplayInputNameChange:"confirmPassword",RepalyInputValueChange:false}));
        }

    }
    return({
        handleChangePassword,
        values,
        handleConfirmPassword
    })
}
export default Hooks