import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = () => {
    const Get_Calendar_Data = gql`
        query($dates:[String!]!) {
            getCalendar(dates:$dates) {
                id
                type
                content
                date{
                    date
                    isAMomentObject
                }
                 thumbnail
                 status
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
    return ({
        Get_Calendar_Data,
        Delete_Items
    })
}