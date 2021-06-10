const INITIAL_STATE = {
    general:{
        directPlan:false,
        directAccessMode:"",
        freeAccess:false,
        securedAccess:false,
    },

    configuration:{
        modalSpeaker:false,
        switchSpeaker:false,
        directAutomaticArchiving:false,
        SpeakerList:[{id:0,name: "Nom ",lastName:'Prénom', title:"Titre",email:"",logoSpeaker:{thumbUrl:"https://yamsoti.com/wp-content/uploads/2020/01/avatar-rectangle.png"}}],
        speaker :{id:null,name: "",lastName:"", title:"",email:"",logoSpeaker:{}},
        videoMode:"",
    },
}

export const  FormDirectVideoReducer=(state=INITIAL_STATE , action)=>{

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
            const {id, name, lastName, title, email} = action.payload
            let newArr = state.configuration.SpeakerList.map((item, index) => (action.payload.id === index ? {
                    ...item,
                    id: id,
                    name: name,
                    lastName: lastName,
                    title: title,
                    email: email
                } : item
            ))
            const configurationSpeakerListObj=!action.payload.id ?{...state.configuration,SpeakerList: [...state.configuration.SpeakerList, action.payload]}:{...state.configuration,SpeakerList:newArr}

            return (
                {
                        ...state,
                        configuration: configurationSpeakerListObj
                    }
            )

        case "SET_ConfigurationDeleteSpeaker":
            state.configuration.SpeakerList.map((el,i) => (i === action.payload.id ? state.configuration.SpeakerList.splice(i,1):state.configuration.SpeakerList))
            const configurationDeleteSpeakerObj = {...state.configuration , SpeakerList: state.configuration.SpeakerList}
            return {...state,
                configuration: configurationDeleteSpeakerObj
            }

        default:{
            return state
        }
    }
}
