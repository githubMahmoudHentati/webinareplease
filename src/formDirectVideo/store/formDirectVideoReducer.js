const INITIAL_STATE = {
    modalSpeaker:false,
    switchSpeaker:false,
    directAutomaticArchiving:false,
    SpeakerList:[{id:0,name: "Nom ",lastName:'Prénom', title:"Titre",email:""}],
    speaker :{id:null,name: "",lastName:"", title:"",email:""},
    videoMode:"",
    directPlan:false
}

export const  FormDirectVideoReducer=(state=INITIAL_STATE , action)=>{

    switch (action.type){
        case "SET_ModalSpeaker":
            return{
                ...state,
                modalSpeaker: action.payload
            }
        case "SET_Onchange":
            const {nameChange,valueChange}=action.payload
            return{
                ...state,
                [nameChange]: valueChange
            }
        case "SET_Speaker":
            const {nameSpeaker,value}=action.payload
            return(
                {...state, speaker:{...state.speaker, [nameSpeaker]:value}}
            )
        case "SET_EditSpeaker":
            return {...state,
                speaker: action.payload
            }

        case "SET_SpeakerList":
            const {id, name, lastName, title, email} = action.payload
            let newArr = state.SpeakerList.map((item, index) => (action.payload.id === index ? {
                    ...item,
                    id: id,
                    name: name,
                    lastName: lastName,
                    title: title,
                    email: email
                } : item
            ))
            return (
                !action.payload.id ? {
                        ...state,
                        SpeakerList: [...state.SpeakerList, action.payload]
                    } :
                    {
                        ...state,
                        SpeakerList: newArr
                    }
            )

        case "SET_DeleteSpeaker":
            state.SpeakerList.map((el,i) => (i === action.payload.id ? state.SpeakerList.splice(i,1):state.SpeakerList))
            return {...state,
                speaker: state.SpeakerList
            }

        default:{
            return state
        }
    }
}
