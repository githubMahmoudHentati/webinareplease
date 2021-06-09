export function setModalSpeaker(e){

    return{
        type: "SET_ModalSpeaker",
        payload:e,
    }

}

export function setSwitchSpeaker(e){

    return{
        type: "SET_switchSpeaker",
        payload:e,
    }

}

export function setSpeaker(e){

    return{
        type: "SET_Speaker",
        payload:e,
    }

}

export function setEditSpeaker(e){

    return{
        type: "SET_EditSpeaker",
        payload:e,
    }

}

export function setSpeakerList(e){

    return{
        type: "SET_SpeakerList",
        payload:e,
    }

}

export function setDeleteSpeaker(e){

    return{
        type: "SET_DeleteSpeaker",
        payload:e,
    }
}

