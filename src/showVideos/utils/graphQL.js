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
    return({
        Get_Lives
    })
}