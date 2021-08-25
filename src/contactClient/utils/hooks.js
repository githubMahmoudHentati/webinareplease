import {useDispatch, useSelector} from "react-redux";

import {setContactClientOnchange, setLoadingEnvoieMail} from "../store/ContactClientAction";


export  const Hooks=(ContactClientMutationAction , form)=> {
    const dispatch = useDispatch()
    const values = useSelector((state) => state.ContactClientReducer)

//******************generalInformation************************//
    const ContactClientOnChange = (event) => {
        dispatch(setContactClientOnchange({
            ContactClientNameChange: event.target.name,
            ContactClientValueChange: event.target.value
        }));
    };

    const handleSubmitContactClient = async ()=>{
        await ContactClientMutationAction()
        //loading Button
        dispatch(setLoadingEnvoieMail({
            loadingEnvoiMailNameChange: "loading",
            loadingEnvoiMailValueChange: true
        }))
    }

    return({
        ContactClientOnChange,
        handleSubmitContactClient,
        values
    })
}