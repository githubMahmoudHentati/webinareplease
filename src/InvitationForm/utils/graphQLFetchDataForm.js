import {useMutation,useLazyQuery} from "@apollo/client";
import {useGraphqlSchema} from './graphQL'
import {setInfoToRegsiter,setSelectedField, setVisibleInscriptionPage} from '../store/InvitationFormAction'
import {useSelector, useDispatch} from 'react-redux'

export const useGraphQLFetchDataForm = (cryptext) => {
    const {INFO_TO_REGISTER, CONFIRM_REGISTRATION} = useGraphqlSchema();
    const dispatch=useDispatch()
    const infoToRegister = useSelector(state=>state.InvitationReducer.infoToRegister)
    const [getInfoToRegister] = useMutation(INFO_TO_REGISTER,{
        context: { clientName: "second" },
        variables: { token : `${cryptext}`},
        onCompleted :async (data)=>{
            console.log("data****",data)
            if(data && data.infoToRegister){
                dispatch(setInfoToRegsiter({payload:data.infoToRegister}))
            }
        }
    });

    const [confirmRegistration] =  useMutation(CONFIRM_REGISTRATION,{
        context: { clientName: "second" },
        onCompleted :async (data)=>{
            console.log("data****",data)
            if(data.confirmRegistration && Object.keys(data.confirmRegistration).length>0){
                if(data.confirmRegistration.code === 200){
                    dispatch(setVisibleInscriptionPage({payload:{inscriptionSuccess:true, inscription: false,confirm:false, confirmSuccess:false}}))
                }else if(data.confirmRegistration.code ===400){
                    dispatch(setSelectedField({payload:{name:"errorExistEmail",value:true }}))
                }
            }

        }
    });
    return {getInfoToRegister,confirmRegistration}

}
