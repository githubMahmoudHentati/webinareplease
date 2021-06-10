//*********************Genral actions *****************//

export function setGeneralOnchange(e){

    return{
        type: "SET_GeneralOnchange",
        payload:e,
    }
}

//***************Conficguration actions***************//

export function setConfigurationModalSpeaker(e){

    return{
        type: "SET_ConfigurationModalSpeaker",
        payload:e,
    }

}

export function setConfigurationOnchange(e){

    return{
        type: "SET_ConfigurationOnchange",
        payload:e,
    }
}

export function setConfigurationSpeaker(e){

    return{
        type: "SET_ConfigurationSpeaker",
        payload:e,
    }

}

export function setConfigurationInitialSpeaker(e){

    return{
        type: "SET_ConfigurationInitialSpeaker",
        payload:e,
    }

}

export function setConfigurationDeleteSpeaker(e){

    return{
        type: "SET_ConfigurationDeleteSpeaker",
        payload:e,
    }
}

export function setConfigurationSpeakerList(e){

    return{
        type: "SET_ConfigurationSpeakerList",
        payload:e,
    }

}





