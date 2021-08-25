import {useMutation} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";
import {setEmptyContactInput , setLoadingEnvoieMail} from "../store/ContactClientAction";
import {ContactClientConstraints} from "./ContactClientConstraints";
import {StatusMessages} from "./StatusMessages";


export const GraphQLFetchData=(form)=> {
    const dispatch = useDispatch()
    // Read Data from Hooks
    const {values }=Hooks()
    const {ContactClient}=ContactClientConstraints()
     // status message
    const {success_message , error_message}=StatusMessages()
    // mutation delete lang from table of event
    const [ContactClientMutation] = useMutation(graphQL_shema().CONTACT_CLIENT,{
        variables : {input:
                {
                    fromFirstName: values.contactClient.name,
                    fromLastName: values.contactClient.lastName,
                    fromAddr: values.contactClient.email,
                    content: values.contactClient.message
                }
        },
        context: { clientName: "first" },
        onCompleted: (data)=>{
            if(data.sendMail.code === 200){
                dispatch(setEmptyContactInput(ContactClient()))
                form.resetFields();
                success_message();
                //loading Button
                dispatch(setLoadingEnvoieMail({
                    loadingEnvoiMailNameChange: "loading",
                    loadingEnvoiMailValueChange: false
                }))
            }else if(data.sendMail.code === 400){
                error_message()
            }

        }
    })

    return({
        ContactClientMutation
    })

}