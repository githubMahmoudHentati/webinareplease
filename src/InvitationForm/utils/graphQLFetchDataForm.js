import {useMutation,useLazyQuery} from "@apollo/client";
import {useGraphqlSchema} from './graphQL'
import {setInfoToRegsiter, setLoading, setSelectedField, setVisibleInscriptionPage} from '../store/InvitationFormAction'
import {useSelector, useDispatch} from 'react-redux'

export const useGraphQLFetchDataForm = (cryptext) => {
    const {INFO_TO_REGISTER, CONFIRM_REGISTRATION , RESEND_INVITATION} = useGraphqlSchema();
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
            dispatch(setLoading({
                payload:{
                    loadingInscription:false
                }
            }))
            if(data.confirmRegistration && Object.keys(data.confirmRegistration).length>0){
                if(data.confirmRegistration.code === 200){
                    dispatch(setVisibleInscriptionPage({payload:{inscriptionSuccess:true, inscription: false,confirm:false, confirmSuccess:false}}))
                }else if(data.confirmRegistration.code ===400){
                    /****/
                    dispatch(setSelectedField({payload:{name:"errorExistEmail",value:true }}))

                }
            }

        }
    });
    const [resendInvitation] = useMutation(RESEND_INVITATION,{
        context: { clientName: "second" },
        variables: { email: infoToRegister.email , liveId : infoToRegister.idLive},
        onCompleted :async (data)=>{
            console.log("data****",data)
            dispatch(setLoading({
                payload:{
                    loadingSendMail:false
                }
            }))
            if(data.resendInvitation.code === 200){
                dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: false,confirm:false, confirmSuccess:true}}))
            }else{
                dispatch(setVisibleInscriptionPage({payload:{InscriptionSuccess:false, inscription: false,confirm:true, confirmSuccess:false}}))
            }
        }
    });

    return {getInfoToRegister,confirmRegistration,resendInvitation}

}
