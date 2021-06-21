import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const Get_Lives = gql`
   query($input: NewLivesPagination) {
   getLives(input: $input) {
    data{
        Id
        Title
        Logo
        Status
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