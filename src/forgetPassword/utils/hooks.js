import {useDispatch, useSelector} from "react-redux";
import {
    setForgetPasswordConstraintDataOnchange,
    setForgetPasswordOnchange
} from "../store/forgetPasswordAction";
import {GraphQLFetchData} from "./graphQLFetchData";



export  const Hooks=()=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ForgetPasswordReducer)
    const {ForgetPassword}=GraphQLFetchData(values)
//******************connexion************************//
    const forgetPasswordOnChange = (event) => {
        dispatch(setForgetPasswordOnchange({
            forgetPasswordNameChange: event.target.name,
            forgetPasswordValueChange: event.target.value
        }));
    };

    const handleSubmit =()=>{
        dispatch(setForgetPasswordConstraintDataOnchange({constraintDataNameChange:"loadingForgetPassword",constraintDataValueChange:true}))
        ForgetPassword()
    }

    return({
        forgetPasswordOnChange,
        handleSubmit,
        values
    })
}