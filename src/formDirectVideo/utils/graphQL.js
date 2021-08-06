import React from 'react';
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

    const updateLive = gql`
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
                    interOption{
                        chat
                        comment
                        like
                    }
                    multiOption{
                        isRm
                        shareFile
                    }
                    tags
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
    //


    return({
        createLive,
        updateLive,
        generateSecuredPassword,
        themesDisplayQuery,
        Get_UpdatedLive_Info
    })
}