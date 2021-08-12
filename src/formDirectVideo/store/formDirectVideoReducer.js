import {FormDirectConstraints} from "../utils/formDirectConstraints";
import {Form} from "antd";
const {generals,configuration,invitation,socialTools,constraintData} = FormDirectConstraints()

const formDirectInitialState = {

    general: generals(),

    configuration: configuration(),

    invitation:invitation(),

    socialTools: socialTools(),

    constraintData: constraintData(),

    form : [],

    error:false,
    loading:false
}


export const  FormDirectVideoReducer=(state=formDirectInitialState , action)=>{
    switch (action.type){

        //******** general reducer case************//

        case "SET_GeneralOnchange":
            const {generalNameChange,generalValueChange}=action.payload
            const generalOnOnchangeObj = {...state.general,[generalNameChange]: generalValueChange}
            return{
                ...state,
                general:generalOnOnchangeObj
            }

        //******** configuration reducer case************//

        case "SET_ConfigurationModalSpeaker":
            const modalSpeakerObj={...state.configuration ,modalSpeaker: action.payload }
            return{
                ...state,
                configuration: modalSpeakerObj
            }

        case "SET_ConfigurationOnchange":
            const {configurationNameChange,configurationValueChange}=action.payload
            const configurationOnOnchangeObj = {...state.configuration,[configurationNameChange]: configurationValueChange}
            return{
                ...state,
                configuration:configurationOnOnchangeObj
            }

        case "SET_ConfigurationSpeaker":
            const {nameSpeaker,valueSpeaker}=action.payload
            const configurationSpeakerObj = {...state.configuration,speaker:{...state.configuration.speaker, [nameSpeaker]:valueSpeaker}}

            return(
                {...state, configuration:configurationSpeakerObj}
            )

        case "SET_ConfigurationInitialSpeaker":
            const initialSpeakerObj={...state.configuration ,speaker: action.payload }

            return {...state,
                configuration: initialSpeakerObj
            }

        case "SET_ConfigurationSpeakerList":
            const {id, name, lastName, title, email,logoSpeaker} = action.payload
            console.log("logoSpeaker",logoSpeaker)
            let newArr = state.configuration.SpeakerList.map((item, index) => (id === index ? {
                    ...item,
                    id: id,
                    name: name,
                    lastName: lastName,
                    title: title,
                    email: email,
                    logoSpeaker: logoSpeaker
                    } : item
            ))
            console.log("newArr",newArr)
            const configurationSpeakerListObj=!id ?{...state.configuration,SpeakerList: [...state.configuration.SpeakerList, {...action.payload, id: state.configuration.SpeakerList.length }]}:{...state.configuration,SpeakerList:newArr}

            return (
                {
                        ...state,
                        configuration: configurationSpeakerListObj
                    }
            )
        case "SET_ConfigurationFileList":
            const {configurationNameFileList , configurationValueFileList}=action.payload
            const newArrayUploadList =  [...state.configuration.fileListConfiguration,configurationValueFileList]
            console.log("fileeeeeeeeeeeeeeList",newArrayUploadList)
            const ConfigurationFileListObj = {...state.configuration,fileListConfiguration:newArrayUploadList}
            return{
                ...state,
                configuration:ConfigurationFileListObj
            }
        case "SET_ConfigurationDeleteSpeaker":
            state.configuration.SpeakerList.map((el,i) => (i === action.payload.id ? state.configuration.SpeakerList.splice(i,1):state.configuration.SpeakerList))
            const configurationDeleteSpeakerObj = {...state.configuration , SpeakerList: state.configuration.SpeakerList}
            return {...state,
                configuration: configurationDeleteSpeakerObj
            }

        //************** Invitation reducer case*************//
        case 'SET_InvitationOnchangeRules' :
            const {invitationNameChangeRules,invitationValueChangeRules}=action.payload
            const invitationOnchangeRulesObj = {...state.invitation,addRules:{...state.invitation.addRules, [invitationNameChangeRules]:invitationValueChangeRules}}
            return {...state,
                invitation: invitationOnchangeRulesObj
            }

        case "SET_InvitationOnchange":
            const {invitationNameChange,invitationValueChange}=action.payload
            const invitationOnOnchangeObj = {...state.invitation,[invitationNameChange]: invitationValueChange}
            return{
                ...state,
                invitation:invitationOnOnchangeObj
            }
        //************** SocialTools reducer case************//

        case  'SET_ActivePost':
            const {activePostChecked,activePostIndex}=action.payload
            const socialToolsActivePost = state.socialTools.map(el => (el.id === activePostIndex ? {...el, switch:activePostChecked} : el))
            return{
                ...state,
                socialTools: socialToolsActivePost
            }

        case 'SET_AddPlan':
            const {addPlanIndex} =action.payload
            let addPlanNewArr=state.socialTools[addPlanIndex].plan.map((el,i) => ({...el,active:false})).concat({active:true,startDate:"",endDate:""})
            const socialToolsAddPlan = state.socialTools.map(el => (addPlanIndex===el.id? {...el,
                plan: addPlanNewArr
            }:el))
            return{
                ...state,
                socialTools: socialToolsAddPlan
            }

        case 'SET_ActivePlan':
            const {indexPost,indexPlan}=action.payload
            let activePlanNewArr=state.socialTools[indexPost].plan.map((el,i) => (i === indexPlan ? {...el,active:!el.active}:{...el,active:false}))
            const socialToolsActivePlan =state.socialTools.map(el => (el.id === indexPost ? {...el,
                plan: activePlanNewArr
            } : el))
            return{
                ...state,
                socialTools: socialToolsActivePlan
            }

        case 'SET_ClosePlan':
            const{closePlanIndexPost,closePlanIndexPlan}=action.payload
            state.socialTools[closePlanIndexPost].plan.map((el,i) => (i === closePlanIndexPlan ? state.socialTools[closePlanIndexPost].plan.splice(closePlanIndexPlan,1):state.socialTools[closePlanIndexPost].plan))
            const socialToolsClosePlan =state.socialTools.map(el => (el.id === closePlanIndexPost ? {...el,
                plan: state.socialTools[closePlanIndexPost].plan
            } : el))
            return{
                ...state,
                socialTools: socialToolsClosePlan
            }

        case 'SET_DatePlan':
            const {dateIndexPost,dateIndexPlan,typeDate,dateValue}=action.payload
            let datePlanNewArr=state.socialTools[dateIndexPost].plan.map((el,i) => (i === dateIndexPlan ? {...el,[typeDate]:dateValue.format("YYYY-MM-DDTHH:mm:ssZ")}:el))
            const socialToolsDatePlan =state.socialTools.map(el => (el.id === dateIndexPost ? {...el,
                plan: datePlanNewArr
            } : el))
            return{
                ...state,
                socialTools: socialToolsDatePlan
            }

        case 'SET_LiveForm' :
            return {...state,
                form: action.payload
            }

        case 'SET_LiveInfo' :
            const {general,configuration,socialTools}= action.payload
            return  {...state,general,configuration,socialTools}

        case "SET_FormDirectLiveConstraintDataOnchange":
            const {constraintDataNameChange,constraintDataValueChange}=action.payload
            const constraintDataOnOnchangeObj = {...state.constraintData,[constraintDataNameChange]: constraintDataValueChange}
            return{
                ...state,
                constraintData:constraintDataOnOnchangeObj
            }

        case 'SET_InitialLiveInfo' :
            return  formDirectInitialState

        case 'SET_UPLOAD_ERROR' :
            return{
            ...state,
            error:action.payload
        }
        case 'SET_UPLOAD_LOADING' :
            return{
            ...state,
            loading:action.payload
        }

        default:{
            return state
        }

    }
}
