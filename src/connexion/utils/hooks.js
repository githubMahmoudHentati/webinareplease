import {useDispatch, useSelector} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";



export  const Hooks=(connexionAction)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ConnexionReducer)
//******************connexion************************//
    const connexionOnChange = async (event) => {
        await dispatch(setConnexionOnchange({
            ConnexionNameChange: event.target.name,
            ConnexionValueChange: event.target.value
        }));
        dispatch(setConnexionConstraintDataOnchange({
            constraintDataNameChange: "connexionError",
            constraintDataValueChange: false
        }))
        document.documentElement.style.setProperty('--errorForm', 'rgba(0 , 0 , 0 , 0.15)');
        document.documentElement.style.setProperty('--borderErrorForm', '#40a9ff');
    };

    const connexionOnChangeButton = (event) => {
        dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:event.target.value, constraintDataValueChange:event.target.checked}));
    };


    const handleSubmit=async ()=>{
        await dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:true}))
        connexionAction()
    }

    return({
        connexionOnChangeButton,
        connexionOnChange,
        handleSubmit,
        values
    })
}