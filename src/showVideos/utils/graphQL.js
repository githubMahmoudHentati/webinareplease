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
    `;
    const Export_Live = gql `
    query($id:Int!) {
    GetLinkExport(id:$id) {
    participantUrl
    auditorUrl
    integrationUrl
     }
    }
    `


    return ({
        Get_Lives,
        Delete_Items,
        Get_Live_Info,
        Export_Live
    })
}