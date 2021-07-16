import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const Get_Lives = gql`
   query($input: NewLivesPagination) {
     getLives(input: $input) {
      data{
         id
         title
         logo
         status
         liveDate
      }
      recordsTotal
      recordsFiltered
      code
      }
     }
    `;
    const Delete_Items = gql`
    mutation($idLive:[Int!]!) {
    deleteLive(idLive:$idLive){
        deleteditems
        undeleteditems
        code
       }
     }
    `;

    const Get_Live_Info = gql `
       mutation($liveId:Int!) {
       getliveInfo(liveId:$liveId) {
        urlDiffusion
        streamName
        idLive
        pwdLive
        code
      }
     }
    `
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

    return ({
        Get_Lives,
        Delete_Items,
        Get_Live_Info,
        Get_UpdatedLive_Info
    })
}