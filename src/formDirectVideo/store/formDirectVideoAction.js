//*********************Genral actions *****************//

export function setGeneralOnchange(e){

    return{
        type: "SET_GeneralOnchange",
        payload:e,
    }
}

//*******************Configuration actions***************//

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

//*******************SocialTool actions*******************//

        export function setActivePost(e){
            return{
                type:"SET_ActivePost",
                payload:e
            }
        }

        export function setAddPlan(e){
            return{
                type:"SET_AddPlan",
                payload:e
            }
        }

        export function setActivePlan(e){
            return{
                type:"SET_ActivePlan",
                payload:e
            }
        }

        export function setClosePlan(e){
            return{
                type:"SET_ClosePlan",
                payload:e
            }
        }







