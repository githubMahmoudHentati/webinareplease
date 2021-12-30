import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const createLive = gql`
        mutation($input:Form!) {
            addLive(input:$input) {
                code
                message
            }
        }
    `;

    const UpdateLive = gql`
       mutation($id:Int!, $form:FormUpdate!) {
            editLive(id:$id, form:$form) {
                code
                message
            }
        } 
    `;

    const generateSecuredPassword = gql`
        mutation($input:GeneratePwd) {
            generatePwd(input:$input) {
                code
                pwd
            }
        }
    `;

    const themesDisplayQuery = gql`
        mutation{
            getThemesList {
                id
                title
            }
        }
    `;

    const Get_UpdatedLive_Info = gql`
        query($id:Int!) {
            getlive(id:$id) {
                generalInfoOut{
                    thumbnail
                    liveTitle
                    liveDescription
                    liveLink
                    livePlan{
                        plan
                        startDate
                        duration
                    }
                    liveAccess
                    pwd
                    securedPasswordOption
                }
                configurationOut{
                    liveProgram
                    speakers{
                        name
                        lastName
                        function
                        avatar
                        mail
                    }
                    interOption{
                        chat
                        comment
                        like
                    }
                    multiOption{
                        isRm
                        shareFile
                    }
                    autoArchLive{
                        auto
                        visible
                    }
                    tags
                    themes
                    attachedFiles{
                        fileName
                    }
                    slides{
                    slideOrder
                    slide
                    }
                    chapters{
                      chapterOrder
                      chapterTitle
                     }
                     questions{
                     nsp
                     question
                     order
                     choices{ 
                     response 
                     }
                     }
                     languages
                }
                invitationOut{
                    mailsGroup
                    mails
                    mailRule
                    { beforeDay beforeHour beforeWeek isParticiped afterSubscription afterPrograming notVisualized }
                    maxOnlineGuests
                    maxOnsiteGuests
                    
                }
                socialOut{
                    id
                    title
                    logo
                    Type
                    link
                    active
                    planifications{
                        id
                        startDate
                        endDate
                        active
                    }
                }
            }
        }
    `
    const Get_MailsGroupList = gql`
        query{
            getGroupList{
                id
                name
            }
        }
        `

    //

    return({
        createLive,
        UpdateLive,
        generateSecuredPassword,
        themesDisplayQuery,
        Get_UpdatedLive_Info,
        Get_MailsGroupList
    })
}