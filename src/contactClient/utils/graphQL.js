import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const CONTACT_CLIENT = gql`

        mutation($input:Mail!) {
          sendMail(input:$input) {
           Code
           DeliveryStatus
        }
   
      }
    `;


    return({
        CONTACT_CLIENT,
    })
}