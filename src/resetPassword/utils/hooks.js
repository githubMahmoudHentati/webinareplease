import {useDispatch, useSelector} from "react-redux";
import {
    setResetPasswordConstraintDataOnchange,
    setResetPasswordOnchange
} from "../store/resetPasswordAction";
import {GraphQLFetchData} from "./graphQLFetchData";



export  const Hooks=()=> {
    const dispatch = useDispatch()
    const darkMode = useSelector((state)=> state.Reducer.DarkMode)
    const values = useSelector((state) => state.ResetPasswordReducer)
    const {ResetPassword}=GraphQLFetchData(values)
//******************ResetPassword************************//
    const resetPasswordOnChange = (event) => {
        dispatch(setResetPasswordOnchange({
            resetPasswordNameChange: event.target.name,
            resetPasswordValueChange: event.target.value
        }));
    };

    const handleSubmit =()=>{
        dispatch(setResetPasswordConstraintDataOnchange({constraintDataNameChange:"loadingResetPassword",constraintDataValueChange:true}))
        ResetPassword()
    }

    return({
        resetPasswordOnChange,
        handleSubmit,
        values,
        darkMode
    })
}