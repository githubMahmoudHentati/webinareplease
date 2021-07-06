import React from 'react';
import gql from "graphql-tag";

export const graphQL_shema = ()=> {
    const tokenVerification = gql`
        query ($token:String!) {
            tokenverification(token:$token) {
                code
                message
            }
        }
    `;
    return({
        tokenVerification
    })
}