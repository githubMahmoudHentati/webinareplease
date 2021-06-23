import {useMutation, useQuery} from "@apollo/react-hooks";
import {graphQL_shema} from "./graphQL";
import {useDispatch} from "react-redux";
import {Hooks} from "./hooks";

export const GraphQLFetchData=()=> {
    const dispatch = useDispatch()
    // Read Data from Hooks
    const {values }=Hooks()

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
            console.log("DataMutation :",data.sendMail.Code)
        }
    })

    return({
        ContactClientMutation
    })

}