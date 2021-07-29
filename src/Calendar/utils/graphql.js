import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const Get_Calendar_Data = gql`
        query($dates:[String!]!) {
            getCalendar(dates:$dates) {
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
    return({
        Get_Calendar_Data
    })
}