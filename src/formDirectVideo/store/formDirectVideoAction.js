//********************* General actions *****************//

export function setGeneralOnchange(e){

    return{
        type: "SET_GeneralOnchange",
        payload:e,
    }
}

//******************** Configuration actions***************//

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
//*******************Invitations actions*******************//

        export function setInvitationOnchangeRules(e){
            return{
                type:"SET_InvitationOnchangeRules",
                payload:e
            }
        }
        export function setInvitationOnchange(e){
            return{
                type:"SET_InvitationOnchange",
                payload:e
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


        export function setLiveForm(e){
            return{
                type:"SET_LiveForm",
                payload:e
            }
        }

        export function setDatePlan(e){
            return{
                type:"SET_DatePlan",
                payload:e
            }
        }



//***************************Update live info***************************//

        export function setLiveInfo(e){
            return{
                type:"SET_LiveInfo",
                payload:e
            }
        }

        export function setInitialLiveInfo(e){
            return{
                type:"SET_InitialLiveInfo",
                payload:e
            }
        }



    export function setFormDirectLiveConstraintDataOnchange(e){
        return{
            type:"SET_FormDirectLiveConstraintDataOnchange",
            payload:e
        }
    }
    export function setErrorUpload(e){
        return{
            type:"SET_UPLOAD_ERROR",
            payload:e
        }
    }
    export function setLoadingUpload(e){
        return{
            type:"SET_UPLOAD_LOADING",
            payload:e
        }
    }










