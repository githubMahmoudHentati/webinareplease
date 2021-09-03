import {useDispatch, useSelector} from "react-redux";
import {setConnexionConstraintDataOnchange, setConnexionOnchange} from "../store/connexionAction";
import {Reducer} from "../../utils/redux/reducer";



export  const Hooks=(connexionAction)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ConnexionReducer)
    const storageValues = useSelector((state) => state.Reducer)
//******************connexion************************//
    const connexionOnChange = async (event) => {
         dispatch(setConnexionOnchange({
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
        dispatch(setConnexionConstraintDataOnchange({constraintDataNameChange:"loadingConnexion",constraintDataValueChange:true}))
        connexionAction()
    }

    return({
        connexionOnChangeButton,
        connexionOnChange,
        handleSubmit,
        values,
        storageValues
    })
}