import locale_fr from "antd/es/locale/fr_FR";

const InvitationInitialState={
    loading:{
        loadingSendMail:false,
        loadingInscription:false
    },
    cryptext:"",
    infoToRegister:{
        lastName: "xxxxxx",
        firstName: "xxxxxx",
        email: "",
        participation:[
            {
                id:1,
                name:`A distance `,
                value:0,
            },
            {
                id:2,
                name:`Présentiel `,
                value:0,
            }
        ],
        selectedParticipation:{
            id:1,
            name:`A distance `,
            value:0,
        },
        showRobot: true,
        errorEmail:false,
        errorExistEmail:false,
        empty:[],
        lang:locale_fr,
        date: new Date(),
        description: "xxxxxxxx",
        title:"xxxxxxxx",
        lastNameInvitor: "",
        firstNameInvitor: "",
    },
    visibleInscriptionPage:{
        inscription:true,
        confirm:false,
        confirmSuccess:false,
        inscriptionSuccess:false
    }
}

export const InvitationReducer = (state=InvitationInitialState, action) =>{
    console.log("state",state)
    switch(action.type){
        case "SET_Loading" :
            return{
                ...state,
                loading: action.payload,
            }
        case 'SET_CRYPTEXT' :
            return{
                ...state,
                cryptext: action.payload
            }

        case 'SET_INFO_TO_REGISTER' :
            console.log("action.payload",action.payload)
            state.infoToRegister.participation[0].value=action.payload.availableOnlinePlaces
            state.infoToRegister.participation[1].value=action.payload.availableOnsitePlaces
            let findNotEmptyPlaces=state.infoToRegister.participation.filter(x=>x.value !== 0)
           console.log("findNotEmptyPlaces",findNotEmptyPlaces)
           console.log("findNotEmptyPlaces.length",findNotEmptyPlaces.length)
            if(findNotEmptyPlaces.length===2 || !findNotEmptyPlaces.length ){
                state.infoToRegister.selectedParticipation=state.infoToRegister.participation[0]
            }else{
                state.infoToRegister.selectedParticipation=findNotEmptyPlaces[0]
            }
            return{
                ...state,
                infoToRegister: {...state.infoToRegister,...action.payload},
            }

        case 'SET_SELECTED_FIELD' :
            console.log("SET_SELECTED_FIELD")
            state.infoToRegister[action.payload.name]=action.payload.value;
            console.log("[action.payload.name]",action.payload.name)
            console.log("[action.payload.value]",action.payload.value)
            console.log("state.infoToRegister[action.payload.name]",state.infoToRegister[action.payload.name])
            return{
                ...state,
                infoToRegister:  {...state.infoToRegister}
            }
        case 'SET_SELECTED_PARTICIPATION_FIELD' :

            state.infoToRegister.selectedParticipation=state.infoToRegister.participation.find(participation=>participation.id+'-'+participation.value===action.payload)
            return{
                ...state,
                infoToRegister: {...state.infoToRegister,... state.infoToRegister.selectedParticipation},
            }
        case 'SET_VISIBLE_INSCRIPTION_PAGE' :
            return{
                ...state,
                visibleInscriptionPage: action.payload,
            }


        default:
            return state;
    }
}