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
        // Add File list Configuration joindre fichiers
        export function setConfigurationFileList(e){
          return{
              type:"SET_ConfigurationFileList",
              payload:e
          }
        }


        export function setChapterList(e){

            return{
                type: "SET_CHAPTER_LIST",
                payload:e,
            }
        }
        export function removeChapter(e){

            return{
                type: "REMOVE_CHAPTER",
                payload:e,
            }
        }
        export function editChapter(e){

            return{
                type: "EDIT_CHAPTER",
                payload:e,
            }
        }

        export function setQuestionList(e){

            return{
                type: "SET_QUESTION_LIST",
                payload:e,
            }
        }
        export function removeQuestion(e){

            return{
                type: "REMOVE_QUESTION",
                payload:e,
            }
        }
        export function editQuestion(e){

            return{
                type: "EDIT_QUESTION",
                payload:e,
            }
        }
        // Delete File list Configuration joindre fichiers
       export function setDeleteFileList(e){
          return{
              type:"SET_DeleteFileList",
              payload:e
         }
       }
       // Add File list Configuration "Diapositive"
       export function setDiapositivesFileList(e){
         return{
          type:"SET_DiapositivesFileList",
          payload:e
         }
       }
      // Add File list Configuration "Diapositive"
       export function setDiapositivesDelete(e){
         return{
          type:"SET_DiapositivesDelete",
          payload:e
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

        export function setDatePlanFormat(e){
            return{
                type:"SET_DatePlanFormat",
                payload:e
            }
        }

        export function setDatePlanByPost(e){
            return{
                type:"SET_DatePlanByPost",
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
    export function setTab(e){
        return{
            type:"SET_TAB",
            payload:e
        }
    }










